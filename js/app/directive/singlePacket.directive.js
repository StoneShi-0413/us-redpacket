'use strict';
var directiveModule = require('./directives');
var directiveName = 'singlePacket';
var singlePacketDirective = function() {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        /*template: '<h1>Stone</h1>',
        //*/templateUrl: '../views/redpacket/singlePacketDirective.html',
        link: function(scope, elem, attrs) {
        }
    };
};
directiveModule.directive(directiveName, singlePacketDirective);
