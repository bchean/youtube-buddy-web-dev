var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    vinylSource = require('vinyl-source-stream');

var INDEXJSX_FILEPATH = 'jsx/index.jsx',
    INDEXSCSS_FILEPATH = 'scss/index.scss';

gulp.task('page', function() {
    console.log('Creating \'public/js/index.js\'...');
    return browserify()
    .add(INDEXJSX_FILEPATH)
    .transform(babelify, {presets: ['es2015', 'react']})
    .external(['react', 'react-dom', 'prod-components'])
    .bundle()
    .pipe(vinylSource('index.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('css', function() {
    console.log('Creating \'public/css/index.css\'...');
    return gulp.src(INDEXSCSS_FILEPATH)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch(INDEXJSX_FILEPATH, ['page']);
    gulp.watch(INDEXSCSS_FILEPATH, ['css']);
});

gulp.task('all', ['page', 'css']);
