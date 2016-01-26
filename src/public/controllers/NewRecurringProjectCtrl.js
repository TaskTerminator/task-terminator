angular.module('terminatorApp').controller('NewRecurringProjectCtrl', function($scope, ProjectsSvc) {

$scope.newRecurringForm = {

};

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
    name: "First of Month",
    value: "firstOfMonth"
  },
  {
    name: "Last of Month",
    value: "lastOfMonth"
  },
  {
    name: "# of Days from Beginning",
    value: "fromBeginning"
  },
  {
    name: "# of Days from End",
    value: "fromEnd"
  }
];

$scope.addRecurringProject = function (newRecurringForm) {
    ProjectsSvc.postRecurringProject(newRecurringForm).then(function(results) {
      console.log("New Recurring Project added", results);
      $scope.templateID = results.data._id;
      console.log($scope.templateID);
      // $state.go('templateTasks', {"id": templateID});
    }).then(function(res) {
      // $scope.alerts.push({msg: "Project ID Created", type: "success"});
      console.log("Results",res);
    }).catch(function(err) {
      // $scope.alerts.push({msg: "Failed to Create Project", type: "danger"});
      console.log("Error", err);
    });
    $scope.showTheRest = true;
};

});
