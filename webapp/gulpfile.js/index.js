'use strict';

var gulp = require('gulp');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var notify = require('gulp-notify');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var config = require('./config');
var bundlerFactory = require('./bundler');

var browserifyOptions = {
    entries: [config.paths.main],
    extensions: [".js", ".jsx"],
    debug: true,
    fullPaths: true,
    cache: {},
    packageCache: {}
};

gulp.task('dev:js', function() {
    var bundler = bundlerFactory(browserifyOptions);

    return processBundler(bundler);
});

gulp.task('images', function() {
    gulp.src('css/images/**')
        .pipe(gulp.dest('./build/images'))
});

gulp.task('styles', function() {
    // move over fonts
    // gulp.src('css/fonts/**.*')
    //     .pipe(gulp.dest('build/css/fonts'));

    // Compiles CSS
    gulp.src('css/style.styl')
        .pipe(stylus())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/'))
        .pipe(reload({ stream: true }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {},
        middleware: [historyApiFallback()],
        ghostMode: false,
        // ui: false,
        open: false
    });
});

gulp.task('watch', ['images', 'styles', 'browser-sync'], function() {
    // gulp.watch('css/**/*', ['styles']);

    var bundler = bundlerFactory(browserifyOptions, true);

    bundler.on('update', rebundle);

    return rebundle(bundler);

    function rebundle() {
        return processBundler(bundler);
    }
});

gulp.task('default', ['watch']);

// gulp.task('build', ['images', 'styles', 'dev:js']);
gulp.task('build', ['dev:js']);

/*
 * Utils
 */

function processBundler(bundler) {
    var startDate = new Date();

    return bundler.bundle()
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist))
        .pipe(reload({ stream: true }))
        .on('end', function() {
            console.log('updated in ' + (new Date().getTime() - startDate.getTime()) + ' ms');
        });
}

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    this.emit('end');
}
