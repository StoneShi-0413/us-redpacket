'use strict';

var controllersModule = require('./controllers');
var controllerName = 'ModalController';
var ModalCtrl = function($scope, $uibModalInstance, modelName) {
    $scope.packetSelectItems = [{
        id: '0',
        name: '面值'
    }, {
        id: '1',
        name: '折扣'
    }];

    console.log(modelName);
    $scope.packet = {
        id: '',
        discount: '',
        value: '',
        item: '',
        amount: '',
        total: '',
        type: modelName
    };

    $scope.calculateTotal = function() {
        if ($scope.packet.item === '') {
            packet.total = 0;
        } else if ($scope.packet.item === '0') {
            if ($scope.packet.value === '' || $scope.packet.amount === '') {
                $scope.packet.total = 0;
            }else{
            	$scope.packet.total = $scope.packet.value * $scope.packet.amount;
            }
        } else{
        	if ($scope.packet.value === '' || $scope.packet.amount === '' ||  $scope.packet.discount === '') {
                $scope.packet.total = 0;
            }else{
            	$scope.packet.total = $scope.packet.value * $scope.packet.amount * $scope.packet.discount * 0.01;
            }
        }
    };

    $scope.ok = function() {
        console.log($scope.packet);
        $uibModalInstance.close($scope.packet);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.changeForm = function(item) {
        $scope.packet.id = '';
        $scope.packet.total = '';
        $scope.packet.discount = '';
        $scope.packet.value = '';
        $scope.packet.amount = '';

    };
};
controllersModule.controller(controllerName, ModalCtrl);
