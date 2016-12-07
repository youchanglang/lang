var dkApp = angular.module('dkApp', ['globalApp']);

dkApp.config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
    dkApp.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };
});

dkApp.controller('loginInformation', function ($scope, $http) {
    $scope.logout = function () {
        $http.post('Account/LogOut').success(function (response) {
            if (response.state) {
                window.location.href = 'login.html';
            }
        })
    }

    $http.get('Account/Index').success(function (response) {
        if (response.state && response.data) {
            $scope.username = response.data.username;
        }
    })
})

dkApp.controller('menuController', function ($scope, $http, $compile) {
    $scope.menuClick = function () {
        $http.get('page/users.html').success(function (response) {
            $compile($('.dk-container').html(response))($scope);
        })
    }
})