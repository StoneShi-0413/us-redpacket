'use strict';

var servicesModule = require('./services.js');
var serviceName = 'LoginService';
var loginService = function($http, AppConstants, $rootScope) {

    var promise = function(url, method) {
        var promise = $http({
            method: method,
            url: url,
            cache: 'false'
        });
        return promise;
    };
    var service = {
        login: function(user) {
            var url = AppConstants.getApiPrefix() + '/user/token?username=:username&password=:password';
            url = url.replace(':username',user.username).replace(':password',user.password);
            console.log(url);
            return promise(url, 'POST').then(function(response){
                
                return response.data.valid;
            });
        }
    };

    return service;
};



servicesModule.factory(serviceName, loginService);
