/**
 * Created by SIhuan.huang on 8/26/2016.
 */
var args = require('minimist')(process.argv.slice(2));
exports.IS_DEV = args.dev;
exports.AppRoot = 'src/100days/day1';