var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    through2 = require('through2'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream');

var VENDOR_FILENAME = 'react.js';
var COMPONENTS_FILENAME = 'components.js';
var CSS_FILENAME = 'components.css';
var OUTPUT_DIR = 'public';

var SBOX_PAGES_GLOB = './jsx/*.jsx';
var PROD_CMPS_PATH = '../production/jsx/components.jsx';
var PROD_CSS_PATH = '../production/scss/components.scss';

gulp.task('pages', function() {
    // Inspired by https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
    // Generate sandbox page for each individual jsx file.
    return gulp.src(SBOX_PAGES_GLOB)
    .pipe(through2.obj(function(vinylFile, encoding, callback) {
        browserify()
        .add(vinylFile.path)
        .transform(babelify, {presets: ['es2015', 'react']})
        .external(['react', 'react-dom', 'prod-components'])
        .bundle(function(err, buf) {
            if (err) {
                callback(err);
            } else {
                // Wrap js in an html page.
                var browserifiedJs = buf.toString();
                var newPageMarkup = '<html><body>' +
                    '<link href="' + CSS_FILENAME + '" rel="stylesheet">' +
                    '<link href="https://fonts.googleapis.com/css?family=Jaldi:700|Yantramanav" rel="stylesheet" type="text/css">' +
                    '<div id="css"></div>' +
                    '<div id="cmp1"></div>' +
                    '<div id="cmp2"></div>' +
                    '<div id="cmp3"></div>' +
                    '<script src="' + VENDOR_FILENAME + '"></script>'+
                    '<script src="' + COMPONENTS_FILENAME + '"></script>'+
                    '<script>' + browserifiedJs + '</script>' +
                    '</body></html>';
                vinylFile.contents = new Buffer(newPageMarkup);
                callback(null, vinylFile);
            }
        });
    }))
    .pipe(rename(function(path) {
        path.extname = '.html';
        var filename = path.basename + path.extname;
        logFileCreation(filename);
    }))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('cmps', function() {
    logFileCreation(COMPONENTS_FILENAME);
    return browserify()
    .external('react', 'jquery')
    .require(PROD_CMPS_PATH, {expose: 'prod-components'})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(vinylSource(COMPONENTS_FILENAME))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('css', function() {
    logFileCreation(CSS_FILENAME);
    return gulp.src(PROD_CSS_PATH)
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('vendor', function() {
    logFileCreation(VENDOR_FILENAME);
    return browserify()
    .require(['react', 'react-dom', 'jquery'])
    .bundle()
    .pipe(vinylSource(VENDOR_FILENAME))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('watch', function() {
    gulp.watch(SBOX_PAGES_GLOB, ['pages']);
    gulp.watch(PROD_CMPS_PATH, ['cmps']);
    gulp.watch(PROD_CSS_PATH, ['css']);
});

gulp.task('pages-and-cmps', ['pages', 'cmps']);
gulp.task('cmps-and-css', ['cmps', 'css']);
gulp.task('all', ['pages', 'cmps', 'css', 'vendor']);
gulp.task('default', ['pages']);

function logFileCreation(filename) {
    console.log('Creating \'' + OUTPUT_DIR + '/' + filename + '\'...');
};
