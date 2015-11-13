'use strict';
var directiveModule = require('./directives');
var directiveName = 'rdWidgetFooter';

var rdWidgetFooterDirective = function() {
    return {
        requires: '^rdWidget',
        template: '<div class="widget-footer" ></div>',
        restrict: 'E',
        transclude: true,
        link: function(scope, elem, attrs) {
           
        }
    };
};
directiveModule.directive(directiveName, rdWidgetFooterDirective);
