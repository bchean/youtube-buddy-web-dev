var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream');

var INDEX_JSX_FILEPATH = './jsx/index.jsx',
    CMPS_JSX_FILEPATH = './jsx/components.jsx',
    SCSS_GLOB = './scss/*.scss';

var JS_OUTPUT_DIR = 'public/js',
    CSS_OUTPUT_DIR = 'public/css';

gulp.task('index', function() {
    var outputDir = JS_OUTPUT_DIR;
    console.log('Compiling index.jsx -> \'' + outputDir + '\'...');
    return browserify()
    .add(INDEX_JSX_FILEPATH)
    .transform(babelify, {presets: ['es2015', 'react']})
    .external(['react', 'react-dom', 'prod-components'])
    .bundle()
    .pipe(vinylSource('index.js'))
    .pipe(gulp.dest(outputDir));
});

gulp.task('cmps', function() {
    var outputDir = JS_OUTPUT_DIR;
    console.log('Compiling components.jsx -> \'' + outputDir + '\'...');
    return browserify()
    .external(['react', 'jquery'])
    .require(CMPS_JSX_FILEPATH, {expose: 'prod-components'})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(vinylSource('components.js'))
    .pipe(gulp.dest(outputDir));
});

gulp.task('css', function() {
    var outputDir = CSS_OUTPUT_DIR;
    console.log('Compiling scss -> \'' + outputDir + '\'...');
    return gulp.src(SCSS_GLOB)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(outputDir));
});

gulp.task('vendor', function() {
    var outputDir = JS_OUTPUT_DIR;
    console.log('Bundling vendor.js -> \'' + outputDir + '\'...');
    return browserify()
    .require(['react', 'react-dom', 'jquery'])
    .bundle()
    .pipe(vinylSource('vendor.js'))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest(outputDir));
});

gulp.task('watch', function() {
    gulp.watch(INDEX_JSX_FILEPATH, ['index']);
    gulp.watch(CMPS_JSX_FILEPATH, ['cmps']);
    gulp.watch(SCSS_GLOB, ['css']);
});

gulp.task('all', ['index', 'cmps', 'css', 'vendor']);
