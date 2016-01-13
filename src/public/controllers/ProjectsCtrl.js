angular.module('terminatorApp').controller('ProjectsCtrl', function($scope, $uibModal) {

  $scope.cssClass = 'page-projects';

  $scope.openModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "myModalContent.jade",
  	})
  }

});
