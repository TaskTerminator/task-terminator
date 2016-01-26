angular.module('terminatorApp').controller('NewRecurringProjectCtrl', function($scope, ProjectsSvc, $state) {

  $scope.newRecurringForm = {
    setup: {
      type: "Scheduled"
    }
  };

  $scope.showTheRest = false;

  $scope.selected= "";
  $scope.test = "The Recurring project ctrl is working!";

  $scope.allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually'];
  $scope.allowedDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  $scope.allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
  $scope.allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //$scope.allowedSemiMonthlyIntervals = ["1st","2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
  $scope.allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End"]; //Any was removed because it is implied if they don't care
  $scope.allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before End"];

  $scope.monthlyOptions = [
    {
      name: "First Day of Month",
      value: "First Day of Month"
    },
    {
      name: "Last Day of Month",
      value: "Last Day of Month"
    },
    {
      name: "# of Days from Beginning",
      value: "# of Days From Start"
    },
    {
      name: "# of Days from End",
      value: "# of Days Before End"
    }
  ];

  $scope.addRecurringProject = function (newRecurringForm) {
      ProjectsSvc.postRecurringProject(newRecurringForm)
      .then(function(results) {
        console.log("New Recurring Project added", results);
        $scope.templateID = results.data._id;
        console.log($scope.templateID);
        $state.go('templateView', {id: results.data._id});
      }).catch(function(err) {
        console.log("Error", err);
      });
  };



  $scope.newTasksArr = [];

  $scope.newTask = {
        name: '',
        description: '',
        assignment: {
          departments: '',
          positions: '',
          employees: ''
        }
      };

  $scope.saveTask = function(newTask) {
    newTask.associatedTemplate = $scope.templateID;
    console.log(newTask);
    if(newTask.assignment.departments) newTask.assignment.departments = newTask.assignment.departments._id;
    if(newTask.assignment.positions) newTask.assignment.positions = newTask.assignment.positions._id;
    if(newTask.assignment.employees) newTask.assignment.employee = newTask.assignment.employee._id;
    $scope.newTasksArr.push(newTask);
    console.log("newTasksArr", $scope.newTasksArr);
    $scope.newTask = {
      name: '',
      description: '',
      assignment: {
        departments: '',
        positions: '',
        employees: ''
      }
    };
    // $scope.selectedAssign = null; tryig to clear drop downs with this.
  };

  $scope.addTasks = function(newTasksArr) {
    ProjectsSvc.postTasks(newTasksArr, $scope.templateID).then(function(results) {
      console.log("Tasks added successfully", results);
      // $state.go('projects');
    });
    $scope.newTasksArr = [];
  };

});
