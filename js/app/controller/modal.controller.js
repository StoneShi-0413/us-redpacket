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

    var timestamp = new Date().getTime();

    $scope.packet = {
        id: timestamp,
        discount: '',
        value: '',
        item: '',
        amount: '',
        total: '',
        type: modelName
    };

    var alertMsg = function() {
        //alert('请输入内容');
    };

    var isNum = function(s) {
        //var regu = "^([0-9]*)$";
        var patten = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;  
        if (patten.test(s))
            return true;
        else
            return false;
    };

    $scope.calculateTotal = function() {
        if ($scope.packet.item === '') {
            $scope.packet.total = 0;
        } else if ($scope.packet.item === '0') {
            $scope.packet
            if ($scope.packet.value === '' || $scope.packet.amount === '') {
                $scope.packet.total = 0;
            } else {
                $scope.packet.total = $scope.packet.value * $scope.packet.amount;
            }
        } else {
            if ($scope.packet.value === '' || $scope.packet.amount === '' || $scope.packet.discount === '') {
                $scope.packet.total = 0;
            } else {
                $scope.packet.total = $scope.packet.value * $scope.packet.amount * $scope.packet.discount * 0.01;
            }
        }

        if ($scope.packet.amount < 0) {

            $scope.packet.amount = 0;
        } else if (isNum($scope.packet.amount)) {
            alertMsg();
            return;
        }

        if ($scope.packet.discount < 0) {

            $scope.packet.discount = 0;
        } else if (isNum($scope.packet.discount)) {
            alertMsg();
            return;
        }

        if ($scope.packet.value < 0) {

            $scope.packet.value = 0;
        } else if (isNum($scope.packet.value)) {
            alertMsg();
            return;
        }
    };

    $scope.ok = function() {
        if ($scope.packet.item === '' || $scope.packet.item === null) {
            alertMsg();
            return;
        }

        if ($scope.packet.item !== '1') {
            if ($scope.packet.value === '') {
                alertMsg();
                return;
            }

            if ($scope.packet.amount === '') {
                alertMsg();
                return;
            }
        } else {

            if ($scope.packet.amount === '') {
                alertMsg();
                return;
            }


            if ($scope.packet.value === '') {
                alertMsg();
                return;
            }


            if ($scope.packet.discount === '') {
                alertMsg();
                return;
            }


        }
        $uibModalInstance.close($scope.packet);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.changeForm = function(item) {
        $scope.packet.total = '';
        $scope.packet.value = '';
        $scope.packet.amount = '';

        if (item !== '1') {
            delete $scope.packet.discount;
        } else {
            $scope.packet.discount = '';
        }


    };
};
controllersModule.controller(controllerName, ModalCtrl);
