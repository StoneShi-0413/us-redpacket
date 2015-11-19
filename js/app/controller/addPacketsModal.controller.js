'use strict';

var controllersModule = require('./controllers');
var controllerName = 'AddPacketsModalController';
var AddPacketsModalCtrl = function($scope, $uibModalInstance, modelName) {
    $scope.modal = {
        name: '红包单包面值'
    };

    if (modelName === 'packets') {
        $scope.modal.name = '红包套包面值';
    }

    $scope.packetSelectItems = [{
        id: null,
        name: '请选择项目'
    }, {
        id: '0',
        name: '面值'
    }, {
        id: '1',
        name: '折扣'
    }];

    $scope.packet = {
        id: null,
        discount: null,
        value: null,
        item: null,
        amount: null,
        total: null,
        type: modelName
    };

    var alertMsg = function(msg) {
        if (!msg) {
            alert('请输入内容');
        } else {
            alert(msg);
        }
    };

    var isNum = function(val) {
        var patten = /^-?\d*$/,
            result = patten.test(val);
        return result;
    };

    var flag = true,
        msg = '';

    var checkInput = function(item) {

        var num = $scope.packet[item];

        if (isNaN(num)) {
            flag = false;
        } else if (!num) {
            flag = false;
        } else if (!isNum(num)) {
            msg = '不能输入小数';
            $scope.packet[item] = null;
            flag = false;
        } else if (num < 0) {
            $scope.packet[item] = null;
            msg = '该项内容不能为负数';
            flag = false;
        } else {
            flag = true;
            msg = '';
        }
        console.log(flag === false && msg !== '');
        if (flag === false && msg !== '') {
            alertMsg(msg);
        }
        return flag;

    };

    $scope.calculateTotal = function(item) {
        checkInput(item);
        if ($scope.packet.value === null || $scope.packet.amount === null || $scope.packet.discount === null) {
            $scope.packet.total = 0;
        } else if (flag) {
            $scope.packet.total = $scope.packet.item === '0' ? ($scope.packet.value * $scope.packet.amount) : ($scope.packet.amount * $scope.packet.discount);
        }
    };

    $scope.ok = function() {
        if ($scope.packet.item === null) {
            alertMsg('请选择项目类型');
            return;
        }

        if (!flag) {
            return;
        }

        $uibModalInstance.close($scope.packet);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.changeForm = function(item) {
        $scope.packet.total = null;
        $scope.packet.value = null;
        $scope.packet.amount = null;

        if (item !== '1') {
            delete $scope.packet.discount;
        } else {
            $scope.packet.discount = null;
        }


    };
};
controllersModule.controller(controllerName, AddPacketsModalCtrl);
