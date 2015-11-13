'use strict';
var directiveModule = require('./directives');
var directiveName = 'activity';
var activityDirective = function() {
    return {
        restrict: 'E',
        scope: {
            'activityList': '=',
            'myActivity': '='
        },
        replace: true,
        templateUrl: '../views/redpacket/activityDirective.html',
        controller: function($scope) {
        },
        link: function(scope, elem, attrs) {
            angular.forEach(scope.activityList, function(item) {
                item.name = JSON.parse(item.name);
                item.date = JSON.parse(item.date);
                item.posters = JSON.parse(item.posters);
            });
            scope.myActivity = scope.activityList[0];
        }
    };
};
directiveModule.directive(directiveName, activityDirective);
