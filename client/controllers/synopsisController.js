myApp.controller('synopsisController', ['$scope', '$routeParams', '$location','$controller', 'jobFactory', function($scope, rParams, $location, $controller, jobFactory){
  $scope.jobs = [];

  var index = function () {

    jobFactory.index("Synopsis", function(data){
      $scope.jobs = data.data.result;
    })
  }

  index();


}])
