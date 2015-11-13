'use strict';

var filtersModule = require('./filters.js');
var filterName = 'JsonArrayFilter';
var jsonArrayFilter = function() {
    var filtered = {
        getJsonArray: function(items, conditions) {
            var arr = [];

            angular.forEach(items, function(item) {

                angular.forEach(conditions, function(condition) {
                    if (condition === item.status) {
                        arr.push(item);
                    }
                });

            });
            return arr;
        }
    };

    return filtered;
};



filtersModule.filter(filterName, jsonArrayFilter);
