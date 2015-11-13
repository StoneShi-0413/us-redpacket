'use strict';
var directiveModule = require('./directives');
var directiveName = 'rdWidget';

var rdWidgetDirective = function() {
    return {
        transclude: true,
        template: '<div class="widget" ng-transclude></div>',
        restrict: 'EA',
        scope: {
            'myActivity': '=' 
        },
        link: function(scope, elem, attrs) {
        }
    };
};
directiveModule.directive(directiveName, rdWidgetDirective);
