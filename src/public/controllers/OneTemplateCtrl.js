angular.module('terminatorApp').controller('OneTemplateCtrl', function($scope, $state, resolveTemplate, resolveCompany, TaskSvc, ProjectsSvc) {
  $scope.test = "The one template ctrl is working!";
  $scope.template = resolveTemplate.data;
  $scope.company = resolveCompany.data;
  $scope.tasks = $scope.template.tasks;
  var templateId = $scope.template._id;
  $scope.showForm = false;


  $scope.departments = $scope.company.departments;
  $scope.positions = $scope.company.positions;
  $scope.employees = $scope.company.employees;
  $scope.choices = ["Specific Department", "Specific Position", "Specific Person"];

  console.log("TESTING INFO", $scope.employees);

  $scope.friendlyInterval = "";
  $scope.friendlyFreq = "";

  var template = $scope.template;

  $scope.departmentsArr = [];
  $scope.positionsArr = [];
  $scope.employeesArr = [];

  (function departmentsArr() {
    for(var i = 0; i<$scope.departments.length; i++) {
      $scope.departmentsArr.push({
        name: $scope.departments[i].name,
        id: $scope.departments[i]._id
      });
    }
    return $scope.departmentsArr;
  })();
  console.log($scope.departmentsArr);

  (function positionsArr() {
    for(var i = 0; i<$scope.positions.length; i++) {
      $scope.positionsArr.push({
        name: $scope.positions[i].name,
        id: $scope.positions[i]._id
      });
    }
    return $scope.positionsArr;
  })();

  (function employeesArr() {
    for(var i = 0; i<$scope.employees.length; i++) {
      $scope.employeesArr.push({
        name: $scope.employees[i].identification.name.fullName,
        id: $scope.employees[i]._id
      });
    }
    return $scope.employeesArr;
  })();


  $scope.getIntervalName = function(template){
    var link = template.setup.interval.type;
    var pink = template.setup.interval;
    if(link === "Daily"){
      $scope.friendlyInterval = "Daily";
    } else if (link === "Daily Business Days"){
      $scope.friendlyInterval = "Every Business Day";
    } else if( link === "Weekly"){
      $scope.friendlyInterval = "Every Week";
      $scope.friendlyFreq = "Every " + pink.weeklyInterval;
    } else if(link === "Bi-Weekly") {
      $scope.friendlyInterval = "Every Other Week";
      $scope.friendlyFreq = "Every other " + pink.weeklyInterval;
    } else if(link === "Monthly") {
      $scope.friendlyInterval = "Every Month";
      console.log("SELECTION", pink.monthlyInterval.selection);
      if(pink.monthlyInterval.selection == "# of Days From Start"){
        $scope.friendlyFreq = pink.monthlyInterval.fromBeginning + " days after the beginning of the month";
        console.log("Stephens fault", pink.monthlyInterval.fromBeginning);
      } else if(pink.monthlyInterval.selection == "# of Days Before End"){
        $scope.friendlyFreq = pink.monthlyInterval.fromEnd + " days before the end of the month";
      } else if (pink.monthlyInterval.firstOfMonth){
        $scope.friendlyFreq = "First Day of the Month";
      } else if(pink.monthlyInterval.endOfMonth) {
        $scope.friendlyFreq = "Last Day of the Month";
      }
    } else if(link === "Annually") {
      $scope.friendlyInterval = "Every Year";
      if(pink.annualInterval.selection === "# of Days From Start"){
        $scope.friendlyFreq = pink.annualInterval.fromBeginning + " days after the beginning of the year. ";
      } else if(pink.annualInterval.selection === "# of Days Before end"){
        $scope.friendlyFreq = pink.annualInterval.fromEnd + " days before the end of the year";
      } else if(pink.annualInterval.selection === "First Day of the Year"){
        $scope.friendlyFreq = "First Day of the Year";
      } else if(pink.annualInterval.selection === "Last Day of the Year"){
        $scope.friendlyFreq = "Last Day of the Year";
      } else if(pink.annualInterval.selection === "Any Day of the Year"){
        $scope.friendlyFreq = "Any Day of the Year";
      } else if(pink.annualInterval.selection === "In a Particular Month"){
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectMonth;
      } else if(pink.annualInterval.selection === "In a Particular Quarter"){
          var ending;
        if(pink.annualInverval.selectQuarter === 1){
          ending = "st";
        } else if(pink.annualInverval.selectQuarter === 2){
          ending = "nd";
        } else if(pink.annualInverval.selectQuarter === 3){
          ending = "rd";
        } else if(pink.annualInverval.selectQuarter === 4){
          ending = "th";
        }
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectQuarter + ending;
      }
    } else if (link === "Quarterly"){
      $scope.friendlyInterval = "Every Quarter";
        if(pink.quarterlyInterval.selection === "First Day of the Quarter"){
          $scope.friendlyFreq = "The First Day of the Quarter";
        } else if(pink.quarterlyInterval.selection === "Last Day of the Quarter"){
          $scope.friendlyFreq = "The Last Day of the Quarter";
        } else if(pink.quarterlyInterval.selection === "# Days from Start"){
          $scope.friendlyFreq = pink.quarterlyInterval.fromBeginning + " days after the beginning of the quarter";
        } else if(pink.quarterlyInterval.selection === "# Days from End"){
          $scope.friendlyFreq = pink.quarterlyInterval.fromEnd + " days after the beginning of the quarter";
        } else if(pink.quarterlyInterval.selection === "Any"){
          $scope.friendlyFreq = "Any day of the quarter";
        }
    }
  };

  $scope.getIntervalName(template);
  console.log("friendlyInterval", $scope.friendlyInterval);
  console.log("friendlyFreq", $scope.friendlyFreq);

  $scope.saveTask = function(newTask){
    console.log("WHAT'S THIS", newTask);
    TaskSvc.addTask(newTask,templateId)
    .then((res)=>{
      $state.reload();
    });
  };

  $scope.newTask = {
    assignment: {
      departments: '',

    }
  };

  $scope.taskButton = false;

  $scope.startProject = function(){
    console.log("STARTING THIS TEMPLATE: ", templateId);
    ProjectsSvc.startProject(templateId).
    then((res)=> {
      $state.reload();
    });
  };

});
