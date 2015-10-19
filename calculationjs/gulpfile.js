var gulp = require('gulp'),
    gutil = require('gulp-util'),
    eslint = require('eslint'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify');

var paths = {
    ALL: ['index.js', 'lib/*.js'],
    JS: ['index.js', 'lib/*.js'],
    OUT: 'calculationjs.js',
    DEST: './',
    ENTRY_POINT: './index.js'
};

gulp.task('default', ['build']);

// Build the app
gulp.task('build', function() {

    return browserify({
        extensions: ['js'],
        entries: paths.ENTRY_POINT,
        debug: true,
        paths: './bower_components'

    })
        .transform(babelify.configure({
            ignore: /(bower_components)|(node_modules)/
        }))
        .bundle()
        .on('error', gutil.log)
        .pipe(source(paths.OUT))
        .pipe(gulp.dest(paths.DEST_BUILD));
});

gulp.task('watch', function() {
    gulp.watch(paths.JS, ['build']);
});
