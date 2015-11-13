'use strict';

var servicesModule = require('./services.js');
var serviceName = 'ActivityService';
var activityService = function($http, AppConstants, $rootScope) {

    var promise = function(url, method) {
        var promise = $http({
            method: method,
            url: url,
            cache: 'false'
        });
        return promise;
    };

    var service = {
        getActivities: function() {
            var url = AppConstants.getApiPrefix() + '/party';
            return promise(url, 'GET').then(function(response){
                
                return response.data;
            });
        }
    };

    return service;
};



servicesModule.factory(serviceName, activityService);
