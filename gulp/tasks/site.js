var connect = require('gulp-connect');
//var LR_PORT = require('../const').LR_PORT;
var AppRoot = require('../const').AppRoot;

exports.task = function () {
  connect.server({
    root: AppRoot,
    livereload: true,
    port: 3030,

    // For any 404, respond with index.html. This enables html5Mode routing.
    // In a production environment, this would be done with much more
    // fine-grained URL rewriting rules.
  });


};
