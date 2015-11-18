'use strict';
var directiveModule = require('./directives');
var directiveName = 'packets';
var packetsDirective = function() {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        /*template: '<h1>Stone</h1>',
        //*/templateUrl: './views/redpacket/packetsDirective.html',
        link: function(scope, elem, attrs) {
           
        }
    };
};
directiveModule.directive(directiveName, packetsDirective);
