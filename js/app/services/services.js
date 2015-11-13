'use strict';

var servicesName = 'redpacketApp.services';
var services = angular.module(servicesName, []);
module.exports = services;
require('./loginService');
require('./activityService');


