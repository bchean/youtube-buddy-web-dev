var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    through2 = require('through2');

var OUTPUT_DIR = 'public';
var SBOX_PAGES_GLOB = './jsx/*.jsx';

function logFileCreation(filename) {
    console.log('Creating \'' + OUTPUT_DIR + '/' + filename + '\'...');
};

gulp.task('pages', ['pull-css', 'pull-js'], function() {
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
                    '<link href="css/components.css" rel="stylesheet">' +
                    '<link href="https://fonts.googleapis.com/css?family=Jaldi:700|Yantramanav" rel="stylesheet" type="text/css">' +
                    '<div id="css"></div>' +
                    '<div id="cmp1"></div>' +
                    '<div id="cmp2"></div>' +
                    '<div id="cmp3"></div>' +
                    '<script src="js/vendor.js"></script>'+
                    '<script src="js/components.js"></script>'+
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

gulp.task('pull-css', function() {
    return gulp.src('../production/public/css/components.css')
    .pipe(gulp.dest('public/css'));
});

gulp.task('pull-js', function() {
    return gulp.src('../production/public/js/{components,vendor}.js')
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
    gulp.watch(SBOX_PAGES_GLOB, ['pages']);
});
