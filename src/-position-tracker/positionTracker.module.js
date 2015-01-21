(function () {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('positionTracker.config', [])
      .value('positionTracker.config', {
          debug: true
      });

  // Modules
  var PositionTrackerService = function($rootScope, $window, $location){

    var options = {
      storage: sessionStorage
    };
    var urlRegExps = [];
    var shouldRegisterPageChangeCallback = true;
    var isMatchToRegExpList = function(str){
      for(var regExp in urlRegExps){
        if(str.search(regExp) > -1) return true
      }
      return false;
    };

    var setPosition = function(params){
        if(angular.isUndefined(params.y) ||
           angular.isUndefined(params.url))
          throw "y and url should be defined as parameter of setPosition method";

        options.storage[params.url + "_scoll_position"] = JSON.stringify({xPosition: params.x, yPosition: params.y});
    };

    var registerUrlExp = function(regexp){
        urlRegExps.push(regexp);
        if(shouldRegisterPageChangeCallback){
          $rootScope.$on('$locationChangeSuccess',function(object, newLocation, oldLocation) {
              if(isMatchToRegExpList(oldLocation)){
                setPosition({
                    y: $window.scrollY,
                    url: oldLocation
                })
                shouldRegisterPageChangeCallback = false;
              }
          });
        }
    };

    var config = function(params){
        angular.extend(options, params);
    }

    return {
        registerUrlExp: function(params){registerUrlExp(params); return this;},
        setPosition: setPosition,
        config: config,
    }
  };

  angular.module('positionTracker.services', []).
      factory('positionTrackerService', ['$rootScope', '$window', '$location', PositionTrackerService]);

  angular.module('positionTracker',
      [
          'positionTracker.config',
          'positionTracker.services'
      ]);

})();
