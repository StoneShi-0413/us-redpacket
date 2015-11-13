'use strict';

require('../components/angular/angular.min');
require('../components/angular-ui-router/release/angular-ui-router.min');
require('../components/angular-touch/angular-touch.min');
require('../components/angular-animate/angular-animate.min');
require('../components/angular-bootstrap/ui-bootstrap-tpls');
require('../components/angular-cookies/angular-cookies');
require('../components/loading-bar');
require('../components/jquery/jquery.min');
require('../components/ie-emulation-modes-warning');
require('../components/ie10-viewport-bug-workaround');
require('./app/filter/filters');
require('./app/services/services');
require('./app/directive/directives');
require('./app/controller/controllers');



var AppConstants = require('./constants'),
    requires = [
        'ui.router',
        'ngAnimate',
        'ngTouch',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngCookies',
        'redpacketApp.services',
        'redpacketApp.filters',
        'redpacketApp.directives',
        'redpacketApp.controllers'
    ];


var redpacketApp = angular.module('redpacketApp', requires);

redpacketApp.constant('AppConstants', AppConstants);
redpacketApp.config(require('./routes'));

redpacketApp.factory('principal',
    function($q, $http, $timeout) {
        var _credential = undefined,
            _authenticated = false;

        return {
            isIdentityResolved: function() {
                return angular.isDefined(_credential);
            },
            isAuthenticated: function() {
                return _authenticated;
            },
            isInRole: function(role) {
                if (!_authenticated || !_credential.roles) return false;

                return _credential.roles.indexOf(role) != -1;
            },
            isInAnyRole: function(roles) {
                if (!_authenticated || !_credential.roles) return false;
                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i])) return true;
                }

                return false;
            },
            authenticate: function(credential) {
                _credential = credential;
                _authenticated = credential != null;
                if (credential) {
                    sessionStorage.setItem("credential", angular.toJson(credential));
                } else {
                    sessionStorage.removeItem("credential");
                }
            },
            credential: function(force) {
                var deferred = $q.defer();

                if (force === true) _credential = undefined;

                if (angular.isDefined(_credential)) {
                    deferred.resolve(_credential);

                    return deferred.promise;
                }

                var self = this;
                $timeout(function() {
                    _credential = angular.fromJson(sessionStorage.getItem("credential"));
                    self.authenticate(_credential);
                    deferred.resolve(_credential);
                }, 1000);



                return deferred.promise;
            }
        };
    }
)

.factory('authorization',
    function($rootScope, $state, principal) {
        return {
            authorize: function() {
                return principal.credential()
                    .then(function() {
                        var isAuthenticated = principal.isAuthenticated();
                        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {

                            if (isAuthenticated) {
                                $state.go('notFound');
                            } else {
                                $rootScope.returnToState = $rootScope.toState;
                                $rootScope.returnToStateParams = $rootScope.toStateParams;
                                $state.go('signin');
                            }
                        }
                    });
            }
        };
    }
);
redpacketApp.run(function($rootScope, $state, $stateParams, authorization, principal) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        if (principal.isIdentityResolved()) {
            authorization.authorize();
        }
    });

});
