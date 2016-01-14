angular.module('terminatorApp').controller('YourTeamCtrl', function($scope, $uibModal) {

  $scope.cssClass = 'page-yourTeam';

  $scope.openAddEmployeeModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewEmployee.html",
      controller: 'YourTeamCtrl',
      size: 'lg'
  	})
  }

});
