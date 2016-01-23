'use strict';

var path = require('path');
var fs = require('fs');
var env = require('node-env-file');

//Load configuration from environment file
try {
    var envFile = __dirname + '/.env';
    var stats = fs.lstatSync(envFile);
    if(stats.isFile())
    {
        env(envFile);
    }
} catch(e){}

/**
 * Gulp
 */
var gulpPath = path.resolve('./gulp');
var gulp = require('gulp');
var config = require(path.join(gulpPath,'config'))(gulp);

/**
 * Webpack
 */
gulp.task('webpack', require(path.join(gulpPath,'tasks/webpack'))(gulp, config));
gulp.task('scripts', ['webpack'], require(path.join(gulpPath,'tasks/scripts'))(gulp, config));

/**
 * Sass
 */
gulp.task('sass', require(path.join(gulpPath,'tasks/sass'))(gulp, config));
gulp.task('styles', ['sass'], require(path.join(gulpPath,'tasks/styles'))(gulp, config));

/**
 * Images
 */
gulp.task('imagemin', require(path.join(gulpPath,'tasks/imagemin'))(gulp, config));

/**
 * Copy
 */
gulp.task('copy', require(path.join(gulpPath,'tasks/copy'))(gulp, config));

/**
 * Tasks
 */
gulp.task('build', ['copy', 'styles', 'scripts', 'imagemin']);
gulp.task('default', ['build']);
