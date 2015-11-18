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
/*
    var discountArray = function(discountArray) {
        discountArray = _.groupBy(discountArray, function(doc) {
            return doc.discount;
        });

        _.each(discountArray, function(item, index) {
            if (item.length > 1) {
                discountArray[index] = _.map(_.groupBy(item, function(doc) {
                    return doc.value;
                }), function(grouped) {
                    return grouped[0];
                });
            }
        });

        discountArray = _.flatten(discountArray);

        return discountArray;
    };

    var noDiscountArray = function(noDiscountArray) {
        noDiscountArray = _.map(_.groupBy(noDiscountArray, function(doc) {
            return doc.value;
        }), function(grouped) {
            return grouped[0];
        });

        return noDiscountArray;
    };

    var devideArray = function(array) {

        var discountArray = [];
        var withoutDisocutnArray = [];
        _.each(array, function(arrayData, singlePacketIndex) {
            if (!arrayData.hasOwnProperty('discount')) {
                withoutDisocutnArray.push(arrayData);
            } else {
                discountArray.push(arrayData);
            }
        });

        return {
            'discountArray': discountArray,
            'withoutDisocutnArray': withoutDisocutnArray
        };
    };

    var createSingleCoupon = function(singlePackets) {
        singlePackets = _.union(discountArray(devideArray(singlePackets).discountArray), noDiscountArray(devideArray(singlePackets).withoutDisocutnArray));
    };

    var createPacketsCoupon = function(packets) {
        
        //packets = _.union(discountArray(devideArray(packets).discountArray), noDiscountArray(devideArray(packets).withoutDisocutnArray));
    };*/

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
