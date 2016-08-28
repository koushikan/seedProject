/**
 * Created by SIhuan.huang on 8/26/2016.
 */
//var config = require('../config');

    
//require
var gulp = require('gulp');
var sass = require('gulp-sass');

//node
var fs = require('fs');
var path = require('path');
var series = require('stream-series');
var gutil = require('gulp-util');  //提供log 等
// concat  combine
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var concat = require('gulp-concat');

var util = require('../utils');
var config = require('../config');
var args = util.args;
var IS_DEV = require('../const').IS_DEV;
var AppRoot = require('../const').AppRoot;
//
var cleanCSS = require('gulp-clean-css');


var gulpif = require('gulp-if');



exports.task = function() {
    var dest      = args['output-dir'] || config.outputDir,
        filename  = args['filename'] || '100days',
        paths     = util.getScssPaths();
    var streams = [];
    //var baseVars = fs.readFileSync('src/core/style/variables.scss', 'utf8').toString();
    gutil.log("Building css files..." ,paths);
    gutil.log("outdir" ,dest);
    gutil.log("filename" ,filename);
    // create SCSS file for distribution
    streams.push(
        gulp.src(paths)
            //.pipe(util.filterNonCodeFiles())
            .pipe(filter(['**', '!**/*-theme.scss']))
            .pipe(concat('contribute.scss'))
            .pipe(gulp.dest(dest))
    );

    streams.push(
        gulp.src(paths)
           // .pipe(util.filterNonCodeFiles())
            .pipe(filter(['**', '!**/*-theme.scss']))
            .pipe(filter(['**', '!**/attributes.scss']))
            .pipe(concat('alesson.scss'))
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(rename({ basename: filename }))
            .pipe(util.autoprefix())
            .pipe(gulp.dest(dest))
            .pipe(gulp.dest(AppRoot+'/'))
            .pipe(gulpif(!IS_DEV, cleanCSS({compatibility: 'ie8',debug: true},function(details) {
                console.log(details.name + ': ' + details.stats.originalSize);
                console.log(details.name + ': ' + details.stats.minifiedSize);
            })))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest(dest))
    );

    return series(streams);



};

