var app = angular.module('PositionTrackerExample', ['ngRoute', 'positionTracker']);

var items = [];
for(var i=0;i<2000;i++){
  items.push(i);
}

app.value('items', items);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/first',{
        templateUrl: 'first.html',
        controller: 'firstCtrl'
      })
      .when('/second', {
        templateUrl: 'second.html',
        controller: 'secondCtrl'
      })
      .when('/third', {
        templateUrl: 'third.html',
        controller: 'thirdCtrl'
      })
  }
]);
app.run(['$rootScope', 'positionTrackerService', function($rootScope, positionTrackerService){
  positionTrackerService.registerUrlExp(/.+/);
}]);

app.controller('firstCtrl', [ 
  '$scope',"items",
  function($scope, items){
    $scope.items = items;
  }
]);

app.controller('secondCtrl', [
  '$scope', 'items',
  function($scope, items){
    $scope.items = items;
  }
]);

app.controller('thirdCtrl', [
  '$scope', 'items',
  function($scope, items){
  }
]); 
