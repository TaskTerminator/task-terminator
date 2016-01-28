angular.module('terminatorApp').controller('YourTeamCtrl', function($scope, $uibModal, YourTeamSvc, $state, CompanySvc, companyInfo) {

  var getEmployees = function(companyId, scope) {
    console.log('companyId', companyId)
    YourTeamSvc.getEmployees(companyId).then(function(res) {
      console.log('res from getEmployees', res)
      scope.employees = res.data;
    });
  }

  var getCompany = function(scope) {
    CompanySvc.getOneCompany(companyInfo.id).then(function(res) {
      var company = res.data
      scope.company = company
      getEmployees(company._id, scope)
    });
  }
  var parentScope = $scope
  getCompany($scope)

  

  $scope.cssClass = 'page-yourTeam';

  $scope.successAlert = {
    type: 'success',
    msg: 'Well done! You successfully read this important alert message.'
  }

  ///////////////////////////////////////////////////////////////
  // Employee Modals                                           //
  ///////////////////////////////////////////////////////////////

  $scope.openAddEmployeeModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewEmployee.html",
      size: 'lg',
      controller: function ($scope, $uibModalInstance, CompanySvc) {
        $scope.newEmployee = {
          departments: [],
          positions: []
        };
        getCompany($scope)
        $scope.filterPositions = function(department){
          console.log(department);
          for(var i = 0; i < company.positions.length; i++){
            console.log(company.positions[i]);
            if(company.positions[i])
          }
        }
        $scope.addEmployee = function(newEmployee) {
          newEmployee.departments.push($scope.department)
          newEmployee.positions.push($scope.position)
          YourTeamSvc.postEmployee(newEmployee, $scope.company._id).then(function(results) {
            console.log('results from employee add', results)
            getCompany(parentScope)
            $scope.newEmployee = {};
            $scope.cancel();
          })
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      }
  	})
  }

  $scope.openEditEmployeeModal = function(employee) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editEmployee.html",
      size: 'lg',
      controller: function ($scope, $uibModalInstance, CompanySvc) {
        $scope.employee = employee;
        console.log("EMPLOYEE: ", $scope.employee);
        getCompany($scope)
        $scope.editEmployee = function(employee) {
          YourTeamSvc.editEmployee(employee).then(function(res) {
            console.log("Employee Edited");
            $scope.cancel();
          })
        };

        $scope.deleteEmployee = function(employee) {
          YourTeamSvc.deleteEmployee(employee).then(function(res) {
            console.log("Employee Deleted");
            $scope.cancel();
          })
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  };

  ///////////////////////////////////////////////////////////////
  // Department Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddDepartmentModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewDepartment.html",
      size: 'lg',
      controller: function ($scope, YourTeamSvc, $uibModalInstance) {
        $scope.addDepartment = function(newDepartment) {
          YourTeamSvc.postDepartment(newDepartment).then(function(results) {
            console.log("Department added");
          });
          $scope.cancel();
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

  	 }
    })
  }

  $scope.openEditDepartmentModal = function(department) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editDepartment.html",
      size: 'lg',
      controller: function ($scope, YourTeamSvc, $uibModalInstance) {
        $scope.department = department;
        console.log($scope.department);

        $scope.editDepartment = function(department) {
          YourTeamSvc.putDepartment(department).then(function(response) {
            console.log("Department Edited");
            $scope.cancel();
          })
        };

        $scope.deleteDepartment = function(department) {
          YourTeamSvc.deleteDepartment(department).then(function(response) {
            console.log("Department Deleted");
            $scope.cancel();
          })
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }

  ///////////////////////////////////////////////////////////////
  // Position Modals
  ///////////////////////////////////////////////////////////////

  $scope.openAddPositionModal = function() {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/addNewPosition.html",
      size: 'lg',
      controller: function($scope, YourTeamSvc, $uibModalInstance) {
        getCompany($scope)
        $scope.addPosition = function(newPosition) {
          YourTeamSvc.postPosition(newPosition).then(function(results) {
            $scope.cancel();
          })
        }

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

      }
  	})
  }

  $scope.openEditPositionModal = function(position) {
  	var modalInstance = $uibModal.open({
  		animation: true,
  		templateUrl: "./templates/editPosition.html",
      size: 'lg',
      controller: function ($scope, $uibModalInstance, CompanySvc) {
        $scope.position = position;
        console.log("Position: ", $scope.position);
        getCompany($scope)

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };

        $scope.editPosition = function(position) {
          YourTeamSvc.editPosition(position).then(function(res) {
            console.log("Position Edited");
            $scope.cancel();
          })
        };

        $scope.deletePosition = function(position) {
          YourTeamSvc.deletePosition(position).then(function(res) {
            console.log("Position Deleted");
            $scope.cancel();
          })
        }
      }
  	})
  }


});
