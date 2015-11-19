'use strict';

var servicesModule = require('./services.js');
var serviceName = 'RedPacketService';
var redPacketService = function($http, AppConstants, $rootScope, _, $q) {

    var promise = function(url, method, data) {
        var promise = $http({
            method: method,
            url: url,
            data: data,
            cache: 'false'
        });
        return promise;
    };
    
    var service = {
        createRedPacket: function(redPacketObj) {
            var url = AppConstants.getApiPrefix() + 'coupon/pool';

            return promise(url, 'POST', redPacketObj).then(function(response) {
                return response.data;
            });
        },

        createRedPacketWeChatInfo: function(weChatInfo) {
            var url = AppConstants.getApiPrefix() + 'coupon/info';
            return promise(url, 'POST', weChatInfo).then(function(response){
                return response.data;
            });
        },

        createPacketCoupon: function(packets) {

            var promises = [];

            angular.forEach(packets, function(packet) {

                var url = AppConstants.getApiPrefix() + 'coupon?';
                if (packet.hasOwnProperty('discount')) {
                    url += 'discount=' + packet.discount + '&percent=' + packet.value;
                } else {
                    url += 'discount=' + packet.value
                }
                
                promises.push(promise(url,'POST'));

            });
            return $q.all(promises);
        },

    };

    return service;
};



servicesModule.factory(serviceName, redPacketService);
