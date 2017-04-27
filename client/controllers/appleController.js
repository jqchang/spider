myApp.controller('appleController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', 'newsFactory', function($scope, rParams, $location, $controller, jobFactory, newsFactory){
  $scope.news = [];

  var index = function () {

    newsFactory.index("Apple", function(data){
      console.log(data)
      $scope.news = data.data.result;
    })
  }

  index();


}])
