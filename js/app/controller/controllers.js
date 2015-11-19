'use strict';
var controllersName = 'redpacketApp.controllers';
var controllers = angular.module(controllersName, []);
module.exports = controllers;
require('./header.controller');
require('./notFound.controller');
require('./home.controller');
require('./login.controller');
require('./addPacketsModal.controller');
require('./showPacketsModal.controller');

