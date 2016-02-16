var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    reactify = require('reactify'),
    through2 = require('through2'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream');

var VENDORS = ['react', 'react-dom'];
var OUTPUT_DIR = 'public/js';

gulp.task('bundle-app', function(taskCallback) {
    // Inspired by https://github.com/substack/node-browserify/issues/1044#issuecomment-88980045
    var b = browserify();
    b.transform(babelify, {presets: ['es2015', 'react']});
    b.external(VENDORS);

    gulp.src('jsx/*.jsx')
    .pipe(through2.obj(
        function write(file, encoding, callback) {
            b.add(file.path);
            callback();
        },
        function end(callback) {
            var APP_OUTPUT_FILENAME = 'app.js';
            console.log('Creating \'' + OUTPUT_DIR + '/' + APP_OUTPUT_FILENAME + '\'...');
            b.bundle()
            .pipe(vinylSource(APP_OUTPUT_FILENAME))
            .pipe(vinylBuffer())
            .pipe(uglify())
            .pipe(gulp.dest(OUTPUT_DIR).on('finish', taskCallback));
            callback();
        }));
});

gulp.task('bundle-vendor', function(taskCallback) {
    var VENDOR_OUTPUT_FILENAME = 'vendor.js';
    console.log('Creating \'' + OUTPUT_DIR + '/' + VENDOR_OUTPUT_FILENAME + '\'...');
    return browserify()
    .require(VENDORS)
    .bundle()
    .pipe(vinylSource(VENDOR_OUTPUT_FILENAME))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('default', ['bundle-app']);
