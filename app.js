'use strict';

window.OC = {
    linkTo: function(url) {
        return  url;
    }
};
console.info("angular" ,angular);
angular.module('App', ['ngTempApp'])
    .config(function($routeProvider) {
/*        $routeProvider.when('/index' ,{
            template: '<contact></contact>' ,
        });
        $routeProvider.otherwise('/index');*/

    });