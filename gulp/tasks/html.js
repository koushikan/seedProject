/**
 * Created by SIhuan.huang on 8/26/2016.
 */
exports.dependencies = ['build-module' ,'build-scss'];
var AppRoot = './'+require('../const').AppRoot;
var gulp = require('gulp'),
    connect = require('gulp-connect');

exports.task = function(){
    gulp.src([AppRoot+ '/*.html',
              AppRoot+ '/*.css',
              AppRoot+ '/*.js',])
        .pipe(connect.reload());
}