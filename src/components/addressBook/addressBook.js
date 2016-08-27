angular.module('contacts.service.addressBook' , [])
 .directive('addressbooklist' ,AddressBookListDirective)
 .directive('addresssbook' ,AddressBookDirective)
 .controller('addressBookListCtrl' ,AddressBookListCtrl)
 .controller('addressBookCtrl' ,AddressBookCtrl);

function AddressBookListDirective(){
    return {
        restrict: 'EA' ,
        scope: {} ,
        controller: 'addressBookListCtrl' ,
        controllerAs: 'ctrl' ,
        bindToController: {},
        templateUrl: 'templates/addressBookList.html'
    }

}

function AddressBookDirective(){
    return {
        restrict: 'EA' ,
        scope: {} ,
        controller: 'addressBookCtrl' ,
        controllerAs: 'ctrl' ,
        bindToController: {},
        templateUrl: 'templates/addressBook.html'
    }
}

AddressBookListCtrl.$inject = ['$scope' , AddressBookService];
function AddressBookListCtrl($scope ,AddressBookService){
    var ctrl = this;
    ctrl.createAddressBook = function() {
        if(ctrl.newAddressBookName) {
            AddressBookService.create(ctrl.newAddressBookName).then(function() {
                AddressBookService.getAddressBook(ctrl.newAddressBookName).then(function(addressBook) {
                    ctrl.addressBooks.push(addressBook);
                    $scope.$apply();
                });
            });
        }
    };
}

function AddressBookCtrl(){
    var ctrl = this;
}