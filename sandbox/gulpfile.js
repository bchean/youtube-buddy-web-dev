var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    through2 = require('through2'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream');

var REACT_FILENAME = 'react.js';
var COMPONENTS_FILENAME = 'components.js';
var OUTPUT_DIR = 'public';

gulp.task('generate-pages', function() {
    // Inspired by https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
    // Generate sandbox page for each individual jsx file.
    return gulp.src('jsx/*.jsx')
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
                    '<div id="cmp-goes-here"></div>' +
                    '<script src="' + REACT_FILENAME + '"></script>'+
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

gulp.task('compile-cmps', function() {
    logFileCreation(COMPONENTS_FILENAME);
    return browserify()
    .external('react')
    .require('../production/jsx/components.jsx', {expose: 'prod-components'})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(vinylSource(COMPONENTS_FILENAME))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('bundle-react', function() {
    logFileCreation(REACT_FILENAME);
    return browserify()
    .require(['react', 'react-dom'])
    .bundle()
    .pipe(vinylSource(REACT_FILENAME))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('pages-and-cmps', ['generate-pages', 'compile-cmps']);
gulp.task('all', ['generate-pages', 'compile-cmps', 'bundle-react']);
gulp.task('default', ['generate-pages']);

function logFileCreation(filename) {
    console.log('Creating \'' + OUTPUT_DIR + '/' + filename + '\'...');
};