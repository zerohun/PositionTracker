'use strict';

describe('', function() {
  var rootScope;
  beforeEach(module("positionTracker"));

  it('should be able to load the service', inject(function(positionTrackerService){
    expect(positionTrackerService).toBeDefined();
  }));

  it("should be able to setPosition",inject(function(positionTrackerService){
    positionTrackerService.setPosition({
      x:0,
      y:100,
      url:"first"
    });
    var savedPosition = (sessionStorage["first_scoll_position"]);
    expect(savedPosition).toEqual('{"xPosition":0,"yPosition":100}');
  }))


  /*
  it("should automatically set position", inject(function(positionTrackerService, $rootScope){
  }));
 */


});
