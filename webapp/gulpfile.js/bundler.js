'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var bundler;

module.exports = function (opts, withWatchify) {
    if (!bundler) {
        // Initialize the bundler for the first time
        bundler = createBundler(opts, withWatchify);
    }

    return bundler;
};

/*
 * Create a Browserify bundler for the application with the given configuration
 */
function createBundler(opts, withWatchify) {
    var bundle = browserify(opts).transform('babelify', {presets: ['es2015', 'react']});

    if (withWatchify) {
        bundle.plugin(watchify, {
            ignoreWatch: ['**/node_modules/**']
        });
    }

    return bundle;
}
