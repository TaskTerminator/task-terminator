angular.module('terminatorApp').controller('ProjectsCtrl', function($scope, $uibModal) {

  $scope.cssClass = 'page-projects';

  $scope.openModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/projectForms.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
  	})
  }

  $scope.openModal2 = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/singleProject.html",
      controller: 'ProjectsCtrl',
      size: 'lg'
  	})
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
