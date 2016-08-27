/**
 * Created by SIhuan.huang on 8/26/2016.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    insert = require('gulp-insert'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    ngAnnotate = require('gulp-ng-annotate'),
    KarmaServer = require('karma').Server,
    sourcemaps = require('gulp-sourcemaps') ,
    through2 = require('through2'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


exports.task = function() {
    return  gulp.src([
            'src/components/**/*.js',
        ])
        // concat (+sourcemaps)
        .pipe(sourcemaps.init())
        .pipe(buildNgAppDefinition())
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(addJsWrapper())
        .pipe(addAppJsWrapper())
        .pipe(concat('script.js'))
        .pipe(insert.append('\n})(window, window.angular);window.ngTempApp={version:{full: "' + '0.1' +'"}};'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/public'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/public'));

    //.pipe(buildNgMaterialDefinition)
}

function buildNgAppDefinition() {
    var srcBuffer = [];
    var modulesSeen = [];
    var count = 0;
    return through2.obj(function(file, enc, next) {

        var module = buildScanner(ANY)(file.contents);

        if (module) modulesSeen.push(module.name);
        srcBuffer.push(file);
        next();
    }, function(done) {
        var self = this;
        var requiredLibs = ['ng','ngRoute' , 'ngAnimate','uuid4','ui.bootstrap'];
        var dependencies = JSON.stringify(requiredLibs.concat(modulesSeen));
        var ngMaterialModule =  "angular.module('ngTempApp', " + dependencies + ');';
        var angularFile = new gutil.File({
            base: process.cwd(),
            path: process.cwd() + '/temp.js',
            contents: new Buffer(ngMaterialModule)
        });
        self.push(angularFile);
        srcBuffer.forEach(function(file) {
            self.push(file);
        });
        srcBuffer = [];
        done();
    });
};


addJsWrapper = function() {
    return through2.obj(function(file, enc, next) {
        file.contents = new Buffer([
            '(function(){',
            '"use strict";\n',
            file.contents.toString(),
            '})();'
        ].join('\n'));
        this.push(file);
        next();
    });
};

addAppJsWrapper = function(enforce) {
    var srcBuffer = [];
    return through2.obj(function(file, enc, next) {
        srcBuffer.push(file);
        next();
    },function(done){
        var self = this;
        var contents = new Buffer([
            '(function( window, angular, undefined ){',
            '"use strict";\n',
        ].join('\n'));

        var angularFile = new gutil.File({
            base: process.cwd(),
            path: process.cwd() + '/temp.js',
            contents: contents
        });
        self.push(angularFile);
        srcBuffer.forEach(function(file) {
            self.push(file);
        });
        srcBuffer = [];
        done();
    });
};

var ANY = /\.module\(('[^']*'|"[^"]*")\s*,(?:\s*\[([^\]]+)\])?/;
function buildScanner(pattern) {

    return function findPatternIn(content) {
        var dependencies;
        var match = pattern.exec(content || '');

        var moduleName = match ? match[1].replace(/\'/gi,'') : null;
        var depsMatch = match && match[2] && match[2].trim();
        if (depsMatch) {
            dependencies = depsMatch.split(/\s*,\s*/).map(function(dep) {
                dep = dep.trim().slice(1, -1); //remove quotes
                return dep;
            });
        }
        return match ? {
            name         : moduleName || '',
            module       : moduleName || '',
            dependencies : dependencies || [ ]
        } : null;
    }
}
