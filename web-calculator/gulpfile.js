var gulp = require('gulp'),
    gutil = require('gulp-util'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    browserSync = require('browser-sync').create();

var paths = {
    HTML: 'src/index.html',
    ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
    JS: ['src/js/*.js', 'src/js/**/*.js'],
    OUT: 'build.js',
    DEST_BUILD: 'dist/build',
    DEST: 'dist',
    ENTRY_POINT: __dirname + '/src/js/app.js'
};

gulp.task('default', ['copy-static', 'watch']);

// Copies the static file to build folder
gulp.task('copy-static', function() {
    gulp.src(paths.HTML)
        .pipe(gulp.dest(paths.DEST));
});

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

// Watch for files and do the build
gulp.task('watch', ['copy-static'], function() {
    gulp.watch(paths.ALL, ['copy-static']);

    var watcher = watchify(browserify({
        entries: paths.ENTRY_POINT,
        transform: [babelify],
        debug: true,
        paths: './bower_components',
        cache: {},
        packageCache: {}
    }));

    watcher.on('update', function(){
            watcher.bundle()
            .on('error', gutil.log)
            .pipe(source(paths.OUT))
            .pipe(gulp.dest(paths.DEST_BUILD))
            .pipe(browserSync.reload({stream: true}));

        console.log('Updated');
    })
        .bundle()
        .pipe(source(paths.OUT))
        .pipe(gulp.dest(paths.DEST_BUILD));

    browserSync.init({
        server: {
            baseDir: paths.DEST
        }
    });
});
