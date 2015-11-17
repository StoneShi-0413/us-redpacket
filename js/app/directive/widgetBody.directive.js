'use strict';
var directiveModule = require('./directives');
var directiveName = 'rdWidgetBody';

var rdWidgetBodyDirective = function() {
    return {
        requires: '^rdWidget',
        scope: {
            loading: '@?',
            classes: '@?',
            activityModel:'@?'
        },
        transclude: true,
        template: '<div class="widget-body" ng-class="classes"><div class="widget-content" ng-transclude></div></div>',
        restrict: 'E',
        link: function(scope, elem, attrs) {

        }
    };
};
directiveModule.directive(directiveName, rdWidgetBodyDirective);
