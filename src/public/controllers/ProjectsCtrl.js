angular.module('terminatorApp').controller('ProjectsCtrl', function($scope, $uibModal) {

  $scope.cssClass = 'page-projects';
  $scope.yes = !$scope.yes;

  $scope.openModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "myModalContent.jade",
  	})
  };

  $scope.change = function() {
  	$scope.yes = !$scope.yes;
  };

});
