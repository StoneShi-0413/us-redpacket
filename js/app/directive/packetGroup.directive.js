'use strict';
var directiveModule = require('./directives');
var directiveName = 'packetGroup';
var packetGroupDirective = function() {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        /*template: '<h1>Stone</h1>',
        //*/templateUrl: '../views/redpacket/packetGroupDirective.html',
        link: function(scope, elem, attrs) {
           
        }
    };
};
directiveModule.directive(directiveName, packetGroupDirective);
packetGroupDirective