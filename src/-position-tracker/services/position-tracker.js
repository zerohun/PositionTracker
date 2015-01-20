(function() {
    "use strict";
    var PositionTrackerService = function($rootScope){
      //private
      var options = {
        storage: sessionStorage;
      };
      var urlRegExps = [];

      //public
      return {
          registerUrlExp: function(regexp){
            urlRegExps.push(regexp);
            return this;
          },
          setPosition: function(params){
            return this;
          },
          setPositionOnListedPages: function(app){
          },
          config: function(params){
            angular.extend(options, params);
            return this;
          }
      }
    }

    angular.
      module('position-tracker.services').
      factory('position-tracker-service', ['$rootScope', PositionTrackerService]);

})();
