angular.module('contacts.components.group', [])
    .directive('group' ,GroupDirective)
    .directive('grouplist' ,GroupListDirective)
    .controller('groupListCtrl' ,GroupListCtrl)
    .controller('groupController' ,GroupController);

function GroupController(){
   var ctrl = this;
   console.info("ctrl" ,ctrl);
}

function GroupDirective(){
    return {
        restrict: 'EA' ,
        scope: {} ,
        controller: 'groupController' ,
        controllerAs: 'ctrl' ,
        bindToController : {
            group: '=data'
        } ,
        templateUrl: 'templates/group.html' ,
    }
}

//<li> </li>
function GroupListDirective(){
    return {
        restrict: 'EA',
        scope: {} ,
        controller: 'groupListCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'templates/groupList.html'
    }
}

GroupListCtrl.$inject = ['$scope' ,'$routeParams'];
function GroupListCtrl($scope,$routeParams){
    var ctrl = this;
    ctrl.groups = ['test1' ,'test2'];
}