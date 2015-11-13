'use strict';
var directiveModule = require('./directives');
var directiveName = 'rdWidgetHeader';

var rdWidgetHeaderDirective = function() {
    return {
        requires: '^rdWidget',
        scope: {
            title: '@',
            icon: '@'
        },
        transclude: true,
        template: '<div class="widget-header"><div class="row"><div class="pull-left"><h1>{{title}}</h1></div><div class="pull-right col-xs-6 col-sm-4" ng-transclude></div></div></div>',
        restrict: 'E',
        link: function(scope, elem, attrs) {
           
        }
    };
};
directiveModule.directive(directiveName, rdWidgetHeaderDirective);
