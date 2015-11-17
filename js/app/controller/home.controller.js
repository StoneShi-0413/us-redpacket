'use strict';

var controllersModule = require('./controllers');
var controllerName = 'HomeController';

var modelTmpls = ['singalPacket', 'packets'],
    getPacketType = function(model) {
        var modelTempName = '';
        angular.forEach(modelTmpls, function(item) {
            if (model === item) {
                modelTempName = item;
            }
        });
        return modelTempName;
    };

var HomeCtrl = function($scope, activities, $uibModal, RedPacketService) {

    //activities = JsonArrayFilter(activities,['GOING']);
    $scope.activities = activities;
    $scope.activityModel = {};
    $scope.singalPackets = [];
    $scope.packets = [];
    $scope.packetsGroup = [];
    $scope.packetsGroupNull = false;
    $scope.weChatObj = {};



    $scope.animationsEnabled = true;
    $scope.openModal = function(model) {
        var modelName = getPacketType(model),
            scope = $scope.$new(true),
            modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '../../../views/redpacket/modal.html',
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
            } else if (getPacketType(packetModel.type) === 'singalPacket') {
                $scope.singalPackets.push(packetModel);
            }
        }, function() {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.addPacketBucket = function() {
        $scope.packetsGroup.push($scope.packets);
        $scope.packets = [];
    };

    $scope.delItem = function(packetType, index) {
        if (packetType === 'packets') {
            $scope.packets.splice(index, 1);
        } else if (packetType === 'singalPacket') {
            $scope.singalPackets.splice(index, 1);
        }
    };

    $scope.addRedPacket = function(){
        var timestamp=new Date().getTime(),
            weChatInfo = {lot:timestamp,title:$scope.weChatObj.title,body:$scope.weChatObj.desc,party_id:$scope.activityModel.id,image_id:$scope.weChatObj.image};
        RedPacketService.createRedPacketWeChatInfo(weChatInfo);
        RedPacketService.createCoupon($scope.singalPackets,$scope.packetsGroup);


    };
};
controllersModule.controller(controllerName, HomeCtrl);
