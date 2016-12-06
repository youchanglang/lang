var pageApp = angular.module('pageApp', ['globalApp']);
pageApp.controller('pageController', ['$scope', '$http', function ($scope, $http) {
    $scope.login = function () {
        //$.post(common.baseUrl + 'Account/login', { account: $scope.account, password: $scope.password }, function () {
        //})
        //return false;
        //$http({
        //    url: 'Account/login',
        //    method: 'post',
        //    data: { account: $scope.account, password: $scope.password }
        //}).success(function (response) {
        //    if (response && response.state) {
        //        window.location.href = 'index.html';
        //    } else if (response && !response.state && response.message) {
        //        $.alert(response.message);
        //    }
        //});

        $.get('http://route.showapi.com/255-1', {
            page: 1,
            type: 31,
            showapi_timestamp: formatterDateTime(),
            showapi_appid: 26916,
            showapi_sign: 'ed92626f70c245a1b268a950fc88d35b'
        }, function (resp) {
            console.log(resp);
        })
    }

    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear()
                + ""// "年"
                + (month >= 10 ? month : "0" + month)
                + ""// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                + ""
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                + ""
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                + ""
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
        return datetime;
    }

}])