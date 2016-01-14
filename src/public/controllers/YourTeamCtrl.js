angular.module('terminatorApp').controller('YourTeamCtrl', function($scope, $uibModal, YourTeamSvc) {

  $scope.getEmployees = function() {
    YourTeamSvc.getEmployees().then(function(res) {
      console.log(res)
      $scope.employees = res.data;
    });
  }();




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
