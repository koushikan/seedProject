angular.module('contacts.components.contact',[])
    .directive('contact' ,ContactDirective)
    .controller('contactCtrl' ,ContactCtrl);

ContactCtrl.$inject = ['$route' ,'$routeParams'];
function ContactCtrl($route,$routeParams){
    var ctrl = this;
    ctrl.test = "aaaa";
    ctrl.openContact = function(){
        $route.updateParams({
            gid: $routeParams.gid ,
            uid: ctrl.contact.uid()
        });
    };
}

function ContactDirective(){
    return {
        restrict: 'EA',
        scope : {} ,
        controller: 'contactCtrl' ,
        controllerAs: 'ctrl' ,
        bindToController: {
            contact: '=data'
        },
        templateUrl: OC.linkTo('templates/contact.html')
    }
}
