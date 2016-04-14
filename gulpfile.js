'use strict';

var fs = require('fs');
var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var browserify = require('browserify');
var babelify = require('babelify');

var config = {
    paths: {
        html: './src/index.html',
        js: './src/**/*.js',
        app: './src/app.js',
        main: './src/main.js',
    }
};

gulp.task('js', function() {
    return browserify(config.paths.main)
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(fs.createWriteStream('build/bundle.js'));
});

gulp.task('build_js', ['js'], function() {
    electron.start();
})

gulp.task('rebuild_js', ['js'], function() {
    electron.reload();
});

gulp.task('serve', ['build_js'], function () {
    gulp.watch(config.paths.app, electron.restart);
    gulp.watch(config.paths.js, ['rebuild_js']);
});
