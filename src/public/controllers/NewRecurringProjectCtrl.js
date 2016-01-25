angular.module('terminatorApp').controller('NewRecurringProjectCtrl', function($scope) {

$scope.newRecurringForm = {
  setup: {
    interval: {
      type: "",
      weeklyInterval: "",
      biWeeklyInterval: "",
      monthlyInterval: {
        // firstOfMonth: false,
        // lastOfMonth: false,
        // fromBeginning: 0,
        // fromEnd: 0
      },
      annualInterval: {
        // fromBeginning: 0,
        // fromEnd: 0,
        // selectMonth: "January",
        // selectQuarter: (1,2,3,4)
      },
      quarterlyInterval: {
          // selection:{type:String, enum: allowedQuarterlyIntervals},
          // fromBeginning: {},
          // fromEnd: {}
      },
      semiMonthlyInterval: {
        // selection: {type: String, enum: allowedSemiMonthlyIntervals},
        // fromBeginning: {},
        // fromEnd: {}
      }
    }
  }
};

$scope.test = "The Recurring project ctrl is working!";

$scope.allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Monthly', 'Quarterly', 'Annually'];
$scope.allowedDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
$scope.allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
$scope.allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
$scope.allowedSemiMonthlyIntervals = ["1st","2nd", "3rd", "4th", "5th","6th","7th","8th","9th","10th","11th","12th","13th","14th","15th"];
$scope.allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any" ];
$scope.allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before End"];

// $scope.newInterval = {};
//
// $scope.addIntervalProject = function (newInterval) {
//     ProjectsSvc.postIntervalProject(newInterval).then(function(results) {
//       console.log("New Scheduled Project added", results);
//       $scope.templateID = results.data._id;
//       console.log($scope.templateID);
//       // $state.go('templateTasks', {"id": templateID});
//     }).then(function(res) {
//       $scope.alerts.push({msg: "Project ID Created", type: "success"});
//     }).catch(function(res) {
//       $scope.alerts.push({msg: "Failed to Create Project", type: "danger"});
//     });
//     $scope.showTheRest = true;
// };

});
