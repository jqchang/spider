var myApp = angular.module('myApp', ['ngRoute','angular.vertilize']);
//  use the config method to set up routing:
myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html',
    })
    .when('/synopsys',{
        templateUrl: 'partials/synopsys.html',
    })
    .when('/symantec',{
      // templateUrl: 'partials/products.html',
    })
    .when('/apple',{
      templateUrl: 'partials/apple.html'
    })
    .when('/google',{
      templateUrl: 'partials/google.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
