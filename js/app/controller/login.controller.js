'use strict';

var controllersModule = require('./controllers');
var controllerName = 'LoginController';
var LoginCtrl = function($scope, $state, principal, LoginService) {
    
    $scope.user = {username: 'admin@iamus.cn' , password: '18610555911'};

    $scope.login = function(event) {
        event.preventDefault();
        var userLogin = $scope.user;

        // here, we fake authenticating and give a fake user
        LoginService.login(userLogin).then(function(loginSuccess) {
            if (loginSuccess) {
            	var user ={username:userLogin.username,roles:['Admin']}
                principal.authenticate(user);
                if ($scope.returnToState) {
                    $state.go($scope.returnToState.name, $scope.returnToStateParams);
                } else {
                    $state.go('dashboard');
                }
            }else{
            	$state.go('signin');
                $scope.user='';
            }

        });

    };
};
controllersModule.controller(controllerName, LoginCtrl);
