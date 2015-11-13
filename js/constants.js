'use strict';

var AppConstants = {
    protocol: 'http://',
    //protocol : 'https://',

    /*local test */
    applicationIp: 'm.us-app.com',

    applicationPrefix: 'usmvn/',

    applicationPort: '8080',

    appUser: null,

    getApiPrefix: function() {
        var apiPrefix = AppConstants.protocol + AppConstants.applicationIp + '/' + AppConstants.applicationPrefix;

        return apiPrefix;
    },

    queryString: function() {
        var queryString = {};
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            // If first entry with this name
            if (typeof queryString[pair[0]] === 'undefined') {
                queryString[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof queryString[pair[0]] === 'string') {
                var arr = [queryString[pair[0]], decodeURIComponent(pair[1])];
                queryString[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                queryString[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return queryString;
    }


};

module.exports = AppConstants;
