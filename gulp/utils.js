/**
 * Created by SIhuan.huang on 8/26/2016.
 */

var filter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var args = require('minimist')(process.argv.slice(2));
exports.args = args;

exports.autoprefix = autoprefix;
exports.filterNonCodeFiles = filterNonCodeFiles;
exports.getScssPaths = getScssPaths;



function autoprefix () {
    return autoprefixer({browsers: [
        'last 2 versions', 'last 4 Android versions'
    ]});
}


function filterNonCodeFiles() {
    return filter(function(file) {
        return !/demo|module\.json|script\.js|\.spec.js|README/.test(file.path);
    });
}


function getScssPaths(){
    return ['src/100days/*/*.scss', 'src/core/style/core.scss'];
}