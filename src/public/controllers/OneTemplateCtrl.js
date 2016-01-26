angular.module('terminatorApp').controller('OneTemplateCtrl', function($scope, resolveTemplate) {
  $scope.test = "The one template ctrl is working!";
  $scope.template = resolveTemplate.data;
  $scope.friendlyInterval = "";
  $scope.friendlyFreq = "";

  var template = $scope.template;




  $scope.getIntervalName = function(template){
    var link = template.setup.interval.type;
    var pink = template.setup.interval;
    if(link === "Daily"){
      $scope.friendlyInterval = "Daily";
    } else if (link === "Daily Business Days"){
      $scope.friendlyInterval = "Every Business Day";
    } else if( link === "Weekly"){
      $scope.friendlyInterval = "Every Week";
      $scope.friendlyFreq = pink.weeklyInterval;
    } else if(link === "Bi-Weekly") {
      $scope.friendlyInterval = "Every Other Week";
      $scope.friendlyFreq = pink.weeklyInterval;
    } else if(link === "Monthly") {
      $scope.friendlyInterval = "Every Month";
      if(pink.monthlyInterval.fromBeginning){
        $scope.friendlyFreq = pink.monthlyInterval.fromBeginning;
      }
    }
  };



});
