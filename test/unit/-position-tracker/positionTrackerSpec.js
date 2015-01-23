'use strict';

describe('', function() {
  var testStorage = {};
  beforeEach(module("positionTracker"));
  beforeEach(module(function($provide){
    var callbacks = [];
    $provide.value('$rootScope', {
      $watch: function(){
      },
      $on: function(event, callbackFunc){
        callbacks.push({event: event, func: callbackFunc});
      },
      $emit: function(event, args1, args2, args3, args4){
        angular.forEach(callbacks, function(callback){
          if(callback.event == event) callback.func(args1, args2, args3, args4);
        });
      }
    });
  }));


  it('should be able to load the service', inject(function(positionTrackerService){
    expect(positionTrackerService).toBeDefined();
  }));

  it("should be able to setPosition",inject(function(positionTrackerService){
    positionTrackerService.config({storage: testStorage});
    positionTrackerService.setPosition({
      x:0,
      y:100,
      url:"first"
    });
    var savedPosition = (testStorage["first_scoll_position"]);
    expect(savedPosition).toEqual('{"xPosition":0,"yPosition":100}');
  }))


  it("should automatically set position", inject(function(positionTrackerService, $rootScope){
    positionTrackerService.config({storage: testStorage});
    positionTrackerService.
      registerUrlExp(/save_.+/)

    $rootScope.$emit("$locationChangeSuccess", {}, 'save_first', 'save_second');
    $rootScope.$emit("$locationChangeSuccess", {}, 'save_second', 'dont_third');
    $rootScope.$emit("$locationChangeSuccess", {}, 'dont_third', 'save_first');
    var firstPosition = testStorage['save_first_scoll_position'];
    var secondPosition = testStorage['save_second_scoll_position'];
    var thirdPosition = testStorage['dont_third_scoll_position'];

    expect(firstPosition).toEqual('{"yPosition":0}');
    expect(secondPosition).toEqual('{"yPosition":0}');
    expect(thirdPosition).toBeUndefined();
  }));


});
