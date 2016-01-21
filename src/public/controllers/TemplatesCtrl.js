angular.module('terminatorApp').controller('TemplatesCtrl', function($scope, TemplatesSvc, $state, $stateParams, CompanySvc) {

	$scope.templateID = $stateParams.id;

	$scope.newTask = {
		assignment: {
			departments: '',
			positions: '',
			employees: ''
		}
	};

	$scope.newTasksArr = [];

	$scope.getCompany = function() {
	    CompanySvc.getCompanies().then(function(res) {
	      console.log(res)
	      $scope.companies = res.data;
	    });
  	}();

	$scope.saveTask = function(newTask) {
		console.log(newTask);
		$scope.newTasksArr.push(newTask);
		console.log($scope.newTasksArr);
		$scope.newTask = {
			assignment: {
				departments: '',
				positions: '',
				employees: ''
			}
		};
		// $scope.selectedAssign = null; tryig to clear drop downs with this.
	}

	$scope.addTasks = function(newTasksArr) {
		TemplatesSvc.postTasks(newTasksArr, $scope.templateID).then(function(results) {
			console.log("Tasks added successfully", results);
			// $state.go('projects');
		})
	}
});
