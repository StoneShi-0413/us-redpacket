'use strict';

var controllersModule = require('./controllers');
var controllerName = 'HomeController';

var modelTmpls = ['singlePacket', 'packets'],
    getPacketType = function(model) {
        var modelTempName = '';
        angular.forEach(modelTmpls, function(item) {
            if (model === item) {
                modelTempName = item;
            }
        });
        return modelTempName;
    },

    initialData = function() {
        var sing = [{
            "id": 117,
            "value": 30,
            "item": "0",
            "amount": 5,
            "total": 150,
            "type": "singlePacket",
            "$$hashKey": "object:111"
        }, {
            "id": 118,
            "discount": 25,
            "value": 85,
            "item": "1",
            "amount": 1,
            "total": 21.25,
            "type": "singlePacket",
            "$$hashKey": "object:151"
        }, {
            "id": 119,
            "value": 500,
            "item": "0",
            "amount": 1,
            "total": 500,
            "type": "singlePacket",
            "$$hashKey": "object:177"
        }];

        var dou = [
            [{
                "id": 120,
                "value": 2000,
                "item": "0",
                "amount": 3,
                "total": 2000,
                "type": "packets",
                "$$hashKey": "object:206"
            }, {
                "id": 121,
                "value": 300,
                "item": "0",
                "amount": 2,
                "total": 300,
                "type": "packets",
                "$$hashKey": "object:244"
            }, {
                "id": 123,
                "value": 80,
                "item": "1",
                "amount": 1,
                "total": 200,
                "type": "packets",
                "discount": 250,
                "$$hashKey": "object:276"
            }],
            [{
                "id": 122,
                "discount": 25,
                "value": 95,
                "item": "1",
                "amount": 1,
                "total": 23.75,
                "type": "packets",
                "$$hashKey": "object:318"
            }, {
                "id": 124,
                "discount": 500,
                "value": 50,
                "item": "1",
                "amount": 2,
                "total": 250,
                "type": "packets",
                "$$hashKey": "object:348"
            }, {
                "id": 125,
                "value": 150,
                "item": "0",
                "amount": 1,
                "total": 150,
                "type": "packets",
                "$$hashKey": "object:377"
            }],
            [{
                "id": 126,
                "discount": 50,
                "value": 80,
                "item": "1",
                "amount": 1,
                "total": 40,
                "type": "packets",
                "$$hashKey": "object:410"
            }]
        ];

        return {
            'sing': sing,
            'dou': dou
        };
    };

var HomeCtrl = function($scope, activities, $uibModal, RedPacketService, _) {

    //activities = JsonArrayFilter(activities,['GOING']);
    $scope.activities = activities;
    $scope.activityModel = {};
    $scope.singlePackets = [];
    $scope.packets = [];
    $scope.packetsGroup = [];
    $scope.packetsGroupNull = true;
    $scope.weChatObj = {};



    $scope.animationsEnabled = true;
    $scope.openModal = function(model) {
        var modelName = getPacketType(model),
            scope = $scope.$new(true),
            modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: './views/redpacket/modal.html',
                controller: 'ModalController',
                scope: $scope,
                size: 'md',
                resolve: {
                    modelName: function() {
                        return modelName;
                    }
                }
            });

        modalInstance.result.then(function(packetModel) {
            if (getPacketType(packetModel.type) === 'packets') {

                $scope.packets.push(packetModel);
                $scope.packetsGroupNull = false;
            } else if (getPacketType(packetModel.type) === 'singlePacket') {
                $scope.singlePackets.push(packetModel);
            }
        }, function() {
        });
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.addPacketBucket = function() {
        if($scope.packets.length===0){
            alert('请添加套包内容');
            return;
        }
        $scope.packetsGroup.push($scope.packets);
        $scope.packets = [];
    };

    $scope.delItem = function(packetType, index) {
        if (packetType === 'packets') {
            $scope.packets.splice(index, 1);
            if($scope.packets.length <=0 ){
                $scope.packetsGroupNull = true;
            }
        } else if (packetType === 'singlePacket') {
            $scope.singlePackets.splice(index, 1);
        }else if( packetType === 'packetGroup'){
            $scope.packetsGroup.splice(index, 1);
            if($scope.packetsGroup.length===0 && $scope.packets.length <=0 ){
                $scope.packetsGroupNull = true;
            }
        }
    };


    $scope.addRedPacket = function() {
        var timestamp = new Date().getTime(),
            weChatInfo = {
                lot: timestamp,
                title: $scope.weChatObj.title,
                body: $scope.weChatObj.desc,
                party_id: $scope.activityModel.id,
                image_id: $scope.weChatObj.image
            };
        RedPacketService.createRedPacketWeChatInfo(weChatInfo).then(function(data) {
            
            RedPacketService.createPacketCoupon($scope.singlePackets).then(function(datas) {
                angular.forEach(datas, function(item, index) {
                    $scope.singlePackets[index].id = item.data.id;
                });

                var packetsIndexArray = [],
                    beginIndex = 0,
                    lastLength = 0,
                    currentLength = 0,
                    lastInputIndex = 0,
                    packets = _.flatten($scope.packetsGroup);
                angular.forEach($scope.packetsGroup, function(item, index) {
                    beginIndex += lastLength;
                    lastLength = item.length;
                    packetsIndexArray.push(beginIndex + item.length - 1);
                });

                RedPacketService.createPacketCoupon(packets).then(function(datas) {
                    angular.forEach(datas, function(item, index) {
                        packets[index].id = item.data.id;
                    });
                    angular.forEach(packetsIndexArray, function(indexItem, indexIndex) {
                        if (indexItem === 0) {
                            currentLength = 1;
                        } else {
                            currentLength = packetsIndexArray[indexIndex] - packetsIndexArray[indexIndex - 1];
                        }
                        for (var i = lastInputIndex; i < currentLength.length + lastInputIndex; i++) {
                            $scope.packetsGroup[indexIndex][lastInputIndex] = packets[lastInputIndex];
                        }
                    });


                    var allCoupons = [];
                    angular.forEach($scope.singlePackets, function(item, index) {
                        allCoupons.push({
                            coupons: '[' + item.id + ']',
                            count: item.amount
                        });
                    });

                    angular.forEach($scope.packetsGroup, function(item, index) {

                        var results = _.map(item,
                            function(ele) {

                                var couponsArray = [];
                                for (var i = 0; i < ele.amount; i++) {
                                    couponsArray.push(ele.id);
                                }
                                return {
                                    coupons: couponsArray
                                };
                            }
                        );
                        results = _.flatten(_.pluck(results, 'coupons'));

                        allCoupons.push({
                            coupons: '[' + results + ']',
                            count: 1
                        });

                    });
                    var redpacketObj = {
                        lot: weChatInfo.lot.toString(),
                        party_id: $scope.activityModel.id,
                        all_coupons: allCoupons
                    };
                    RedPacketService.createRedPacket(redpacketObj).then(function(data){
                        if(data.result === "OK"){
                            $scope.lot = weChatInfo.lot;
                        }
                    });
                });
            });
        });

    };
};
controllersModule.controller(controllerName, HomeCtrl);
