'use strict';
var directiveModule = require('./directives');
var directiveName = 'wechatInput';
var wechatInputDirective = function() {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        /*template: '<h1>Stone</h1>',
        //*/templateUrl: '../views/redpacket/wechatInputDirective.html',
        link: function(scope, elem, attrs) {
        }
    };
};
directiveModule.directive(directiveName, wechatInputDirective);
