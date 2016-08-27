var gulp = require('gulp');
exports.dependencies = ['html'];
var AppRoot = './'+require('../const').AppRoot;
exports.task = function() {
  gulp.watch([AppRoot+'/*.scss',AppRoot+'/*.html'] ,['html']);
};
