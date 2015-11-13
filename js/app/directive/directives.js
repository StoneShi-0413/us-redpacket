'use strict';

var directivesName = 'redpacketApp.directives';
var directives = angular.module(directivesName, []);
module.exports = directives;
require('./singlePacket.directive');
require('./activity.directive');
require('./wechatInput.directive');
require('./packetGroup.directive');
require('./packets.directive');
/*require('./widgetHeader.directive');
require('./widgetFooter.directive');
require('./widgetBody.directive');
require('./widget.directive');*/
