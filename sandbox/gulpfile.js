var babelify = require('babelify'),
    browserify = require('browserify'),
    gulp = require('gulp'),
    reactify = require('reactify'),
    rename = require('gulp-rename'),
    through2 = require('through2'),
    uglify = require('gulp-uglify'),
    vinylBuffer = require('vinyl-buffer'),
    vinylSource = require('vinyl-source-stream');

var VENDORS = ['react', 'react-dom', {file: '../production/jsx/components.jsx', expose: 'components'}];
var REQUIRABLES = VENDORS.map(function(x) {
    if (typeof x === 'object') {
        return x.expose;
    } else {
        return x;
    }
});

var VENDOR_OUTPUT_FILENAME = 'vendor.js';
var OUTPUT_DIR = 'public';

gulp.task('generate-pages', function() {
    // Inspired by https://github.com/substack/node-browserify/issues/1044#issuecomment-72384131
    // Generate sandbox page for each individual jsx file.
    return gulp.src('jsx/*.jsx')
    .pipe(through2.obj(function(vinylFile, encoding, callback) {
        browserify()
        .add(vinylFile.path)
        .transform(babelify, {presets: ['es2015', 'react']})
        .external(REQUIRABLES)
        .bundle(function(err, buf) {
            if (err) {
                callback(err);
            } else {
                // Wrap js in an html page.
                var browserifiedJs = buf.toString();
                var newPageMarkup = '<html><body>' +
                    '<div id="cmp-goes-here"></div>' +
                    '<script src="' + VENDOR_OUTPUT_FILENAME + '"></script>'+
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
        console.log('Creating \'' + OUTPUT_DIR + '/' + filename + '\'...');
    }))
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('bundle-vendors', function() {
    console.log('Creating \'' + OUTPUT_DIR + '/' + VENDOR_OUTPUT_FILENAME + '\'...');
    return browserify()
    .require(VENDORS)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(vinylSource(VENDOR_OUTPUT_FILENAME))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest(OUTPUT_DIR));
});

gulp.task('default', ['generate-pages']);
