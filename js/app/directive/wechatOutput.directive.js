'use strict';
var directiveModule = require('./directives');
var directiveName = 'wechatOutput';
var wechatOutputDirective = function() {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        scope: {
            'wechatObj': '='
        },
        /*template: '<h1>Stone</h1>',
        //*/templateUrl: './views/redpacket/wechatOutputDirective.html',
        link: function(scope, elem, attrs) {
            
        }
    };
};
directiveModule.directive(directiveName, wechatOutputDirective);
