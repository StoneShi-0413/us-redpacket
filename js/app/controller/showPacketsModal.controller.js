'use strict';

var controllersModule = require('./controllers');
var controllerName = 'ShowPacketsModalController';
var ShowPacketsModalCtrl = function($scope, $uibModalInstance, packets) {
    
    $scope.packets = packets;
    $scope.ok = function() {
        $uibModalInstance.close();
    };

};
controllersModule.controller(controllerName, ShowPacketsModalCtrl);
