'use strict';

var controllersModule = require('./controllers');
var controllerName = 'HeaderController';
var HeaderCtrl = function($scope, $cookieStore) {
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        if($scope.toggle  === true){
            $('#page-wrapper').addClass('open');
        }else{
            $('#page-wrapper').removeClass('open');
        }
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
};

controllersModule.controller(controllerName, HeaderCtrl);
