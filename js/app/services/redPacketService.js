'use strict';

var servicesModule = require('./services.js');
var serviceName = 'RedPacketService';
var redPacketService = function($http, AppConstants, $rootScope, _) {

    var promise = function(url, method, data) {
        var promise = $http({
            method: method,
            url: url,
            data: data,
            cache: 'false'
        });
        return promise;
    };

    var unique = function(data) {
        var birthDates = {};
        var param = "birthDate"
        $.each(data.people, function() {
            if (!birthDates[this[param]])
                birthDates[this[param]] = [];
            birthDates[this[param]].push(this);
        });

        for (var d in birthDates) {
            // add d to array here
            // or do something with d
            // birthDates[d] is the array of people
        }
    };

    var service = {
        createRedPacket: function() {
            var url = AppConstants.getApiPrefix() + '/party';
            return promise(url, 'GET').then(function(response) {

                return response.data;
            });
        },

        createRedPacketWeChatInfo: function(weChatInfo) {
            var url = AppConstants.getApiPrefix() + 'coupon/info';
            /*return promise(url, 'POST').then(function(response){
                console.log(data);
                return response.data;
            });*/
        },

        createCoupon: function(singlePackets, packets) {
            var url = AppConstants.getApiPrefix() + 'coupon?discount=:discount&percent=:percent';
            var existingCoupons = [];
            var packets = [
                [{
                    "id": "",
                    "discount": "",
                    "value": 20,
                    "item": "0",
                    "amount": 5,
                    "total": 100,
                    "type": "packets"
                }, {
                    "id": "",
                    "discount": "",
                    "value": 20,
                    "item": "0",
                    "amount": 7,
                    "total": 140,
                    "type": "packets"
                }, {
                    "id": "",
                    "discount": 100,
                    "value": 80,
                    "item": "1",
                    "amount": 2,
                    "total": 160,
                    "type": "packets"
                }, {
                    "id": "",
                    "discount": "",
                    "value": 10,
                    "item": "0",
                    "amount": 5,
                    "total": 50,
                    "type": "packets"
                }, {
                    "id": "",
                    "discount": "",
                    "value": 32,
                    "item": "0",
                    "amount": 2,
                    "total": 64,
                    "type": "packets"
                }, {
                    "id": "",
                    "discount": 241,
                    "value": 90,
                    "item": "1",
                    "amount": 4,
                    "total": 867.6,
                    "type": "packets"
                }]
            ];
            var singlePackets = [{
                "id": "",
                "discount": "",
                "value": 23,
                "item": "0",
                "amount": 1,
                "total": 23,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": "",
                "value": 5,
                "item": "0",
                "amount": 5,
                "total": 25,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": "",
                "value": 23,
                "item": "0",
                "amount": 1,
                "total": 23,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": "",
                "value": 5,
                "item": "0",
                "amount": 5,
                "total": 25,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": 200,
                "value": 85,
                "item": "1",
                "amount": 3,
                "total": 510,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": 125,
                "value": 75,
                "item": "1",
                "amount": 4,
                "total": 375,
                "type": "singalPacket"
            }, {
                "id": "",
                "discount": 125,
                "value": 75,
                "item": "1",
                "amount": 4,
                "total": 375,
                "type": "singalPacket"
            }];
            /*
                        console.log(singlePackets);
                        console.log(_.pluck(singlePackets, 'value'));
                        console.log(_.pluck(singlePackets, 'discount'));*/
            //console.log(_.chain(singlePackets).flatten().pluck("discount").unique().value())

            var tuts = {
                NetTuts: 'Web Development'
            };
            var defaults = {
                NetTuts: 'Web Development',
                niche: 'Education'
            };

            _.defaults(tuts, defaults);

            console.log(tuts);
        }
    };



    return service;
};



servicesModule.factory(serviceName, redPacketService);
