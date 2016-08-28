/**
 * Created by huangsihuan on 16-8-27.
 */
var cli = require('cli-color');
var Q = require('q');

var thenTask = cli.red;
var core = cli.yellow;
var timer = cli.blue;


var a = (function experience1(){

    var a = 1;
    console.log(core('a'+a));

    setTimeout(function(){
       console.log(timer('timer'));
    },0);



    var promisc = function(){
        var b = 'b'
        console.log(core(b));
    };

    Q.fcall(promisc)
        .then(function (value4) {
            console.log(thenTask('thenTask1'));

            setTimeout(function(){
                console.log(timer('thentimer'));
            },2000);

        })
        .then(function (value4) {

            a = 9;
            console.log(thenTask('thenTas2'));
        })
        .catch(function (error) {
            // Handle any error from all above steps
        })
        .done();

    console.log(core('ab'+a));

    return a ;

})();

console.log(core('aq'+a));
