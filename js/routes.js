'use strict';

var router = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    // States
    $stateProvider
        .state('site', {
            'abstract': true,
            resolve: {
                authorize: ['authorization',
                    function(authorization) {
                        var rslt = authorization.authorize();
                        return rslt;
                    }
                ]
            }
        })
        .state('signin', {
            parent: 'site',
            url: '/signin',
            views: {
                'contentview@': {
                    templateUrl: './views/user/login.html',
                    controller: 'LoginController',
                }
            },
            data: {
                roles: []
            }
        })
        .state('dashboard', {
            parent: 'site',
            url: '/dashboard',
            views: {
                'contentview@': {
                    templateUrl: './views/redpacket/home.html',
                    controller: 'HomeController'
                },
                'headerview@': {
                    templateUrl: './views/header.html',
                    controller: 'HeaderController'
                }
            },
            data: {
                roles: ['Admin']
            },
            resolve: {
                activities: ['ActivityService', function(ActivityService) {
                    return ActivityService.getActivities().then(function(data) {
                        return data;
                    });
                }]
            }
        })
        .state('notFound', {
            parent: 'site',
            url: '/notFound',
            views: {
                'contentview@': {
                    templateUrl: './views/notFound.html',
                    controller: 'NotFoundController'
                },
                'headerview@': {
                    templateUrl: './views/header.html',
                    controller: 'HeaderController'
                }
            },
            data: {
                roles: []
            }
        });

};

module.exports = router;
