var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    reactify = require('reactify'),
    vinylSource = require('vinyl-source-stream');

var APP_FILES = ['app.jsx'];
var OUTPUT_FILENAME = 'bundle.js';
var OUTPUT_DIR = 'public/js';

gulp.task('bundle-app', function() {
    return browserify({
        entries: APP_FILES,
        extensions: ['.jsx'],
        transform: [babelify, reactify],
        debug: true
    })
    .bundle()
    .pipe(vinylSource(OUTPUT_FILENAME))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('default', ['bundle-app']);
