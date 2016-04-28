'use strict';

angular.module('terminatorApp').controller('OneTemplateCtrl', function ($scope, $state, resolveTemplate, resolveCompany, TaskSvc, ProjectsSvc) {
  $scope.test = "The one template ctrl is working!";
  $scope.template = resolveTemplate.data;

  console.log('TEMPLATE', $scope.template);

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
    for (var i = 0; i < $scope.departments.length; i++) {
      $scope.departmentsArr.push({
        name: $scope.departments[i].name,
        _id: $scope.departments[i]._id
      });
    }
    return $scope.departmentsArr;
  })();
  console.log($scope.departmentsArr);

  (function positionsArr() {
    for (var i = 0; i < $scope.positions.length; i++) {
      $scope.positionsArr.push({
        name: $scope.positions[i].name,
        _id: $scope.positions[i]._id
      });
    }
    return $scope.positionsArr;
  })();

  (function employeesArr() {
    for (var i = 0; i < $scope.employees.length; i++) {
      $scope.employeesArr.push({
        name: $scope.employees[i].identification.name.fullName,
        _id: $scope.employees[i]._id
      });
    }
    return $scope.employeesArr;
  })();

  $scope.getIntervalName = function (template) {
    var link = template.setup.interval.type;
    var pink = template.setup.interval;
    if (link === "Daily") {
      $scope.friendlyInterval = "Daily";
    } else if (link === "Daily Business Days") {
      $scope.friendlyInterval = "Every Business Day";
    } else if (link === "Weekly") {
      $scope.friendlyInterval = "Every Week";
      $scope.friendlyFreq = "Every " + pink.weeklyInterval;
    } else if (link === "Bi-Weekly") {
      $scope.friendlyInterval = "Every Other Week";
      $scope.friendlyFreq = "Every other " + pink.weeklyInterval;
    } else if (link === "Monthly") {
      $scope.friendlyInterval = "Every Month";
      console.log("SELECTION", pink.monthlyInterval.selection);
      if (pink.monthlyInterval.selection == "# of Days From Start") {
        $scope.friendlyFreq = pink.monthlyInterval.fromBeginning + " days after the beginning of the month";
        console.log("Stephens fault", pink.monthlyInterval.fromBeginning);
      } else if (pink.monthlyInterval.selection == "# of Days Before End") {
        $scope.friendlyFreq = pink.monthlyInterval.fromEnd + " days before the end of the month";
      } else if (pink.monthlyInterval.firstOfMonth) {
        $scope.friendlyFreq = "First Day of the Month";
      } else if (pink.monthlyInterval.endOfMonth) {
        $scope.friendlyFreq = "Last Day of the Month";
      }
    } else if (link === "Annually") {
      $scope.friendlyInterval = "Every Year";
      if (pink.annualInterval.selection === "# of Days From Start") {
        $scope.friendlyFreq = pink.annualInterval.fromBeginning + " days after the beginning of the year. ";
      } else if (pink.annualInterval.selection === "# of Days Before end") {
        $scope.friendlyFreq = pink.annualInterval.fromEnd + " days before the end of the year";
      } else if (pink.annualInterval.selection === "First Day of the Year") {
        $scope.friendlyFreq = "First Day of the Year";
      } else if (pink.annualInterval.selection === "Last Day of the Year") {
        $scope.friendlyFreq = "Last Day of the Year";
      } else if (pink.annualInterval.selection === "Any Day of the Year") {
        $scope.friendlyFreq = "Any Day of the Year";
      } else if (pink.annualInterval.selection === "In a Particular Month") {
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectMonth;
      } else if (pink.annualInterval.selection === "In a Particular Quarter") {
        var ending;
        if (pink.annualInverval.selectQuarter === 1) {
          ending = "st";
        } else if (pink.annualInverval.selectQuarter === 2) {
          ending = "nd";
        } else if (pink.annualInverval.selectQuarter === 3) {
          ending = "rd";
        } else if (pink.annualInverval.selectQuarter === 4) {
          ending = "th";
        }
        $scope.friendlyFreq = "Every " + pink.annualInterval.selectQuarter + ending;
      }
    } else if (link === "Quarterly") {
      $scope.friendlyInterval = "Every Quarter";
      if (pink.quarterlyInterval.selection === "First Day of the Quarter") {
        $scope.friendlyFreq = "The First Day of the Quarter";
      } else if (pink.quarterlyInterval.selection === "Last Day of the Quarter") {
        $scope.friendlyFreq = "The Last Day of the Quarter";
      } else if (pink.quarterlyInterval.selection === "# Days from Start") {
        $scope.friendlyFreq = pink.quarterlyInterval.fromBeginning + " days after the beginning of the quarter";
      } else if (pink.quarterlyInterval.selection === "# Days from End") {
        $scope.friendlyFreq = pink.quarterlyInterval.fromEnd + " days after the beginning of the quarter";
      } else if (pink.quarterlyInterval.selection === "Any") {
        $scope.friendlyFreq = "Any day of the quarter";
      }
    }
  };

  if ($scope.template.setup.type === "Scheduled") {
    $scope.getIntervalName(template);
  }
  console.log("friendlyInterval", $scope.friendlyInterval);
  console.log("friendlyFreq", $scope.friendlyFreq);

  $scope.saveTask = function (newTask) {
    console.log("WHAT'S THIS", newTask);
    TaskSvc.addTask(newTask, templateId).then(function (res) {
      $state.reload();
    });
  };

  $scope.newTask = {
    assignment: {
      departments: ''

    }
  };

  $scope.taskButton = false;

  $scope.startProject = function () {
    console.log("STARTING THIS TEMPLATE: ", templateId);
    ProjectsSvc.startProject(templateId).then(function (res) {
      $state.reload();
    });
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9jb250cm9sbGVycy9PbmVUZW1wbGF0ZUN0cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFTLE1BQU0sRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFO0FBQzVJLFFBQU0sQ0FBQyxJQUFJLEdBQUcsbUNBQW1DLENBQUM7QUFDbEQsUUFBTSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDOztBQUV2QyxTQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7O0FBRXhDLFFBQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUNyQyxRQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQ3JDLE1BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ3JDLFFBQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztBQUd4QixRQUFNLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO0FBQ2hELFFBQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDNUMsUUFBTSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUM1QyxRQUFNLENBQUMsT0FBTyxHQUFHLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUFFakYsU0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUU5QyxRQUFNLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzdC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QUN6RCxTQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpELFFBQU0sQ0FBQyxRQUFRLEdBQUcsVUFBUyxPQUFPLEVBQUM7QUFDakMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEMsV0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsVUFBVSxDQUFDLENBQ2xDLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRztBQUNYLFlBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQixDQUFDLENBQUM7R0FDSixDQUFDOztBQUVGLFFBQU0sQ0FBQyxPQUFPLEdBQUc7QUFDZixjQUFVLEVBQUU7QUFDVixpQkFBVyxFQUFFLEVBQUU7O0tBRWhCO0dBQ0YsQ0FBQzs7QUFFRixRQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs7QUFFMUIsUUFBTSxDQUFDLFlBQVksR0FBRyxZQUFVO0FBQzlCLFdBQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEQsZUFBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FDcEMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFJO0FBQ1gsWUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2pCLENBQUMsQ0FBQztHQUNKLENBQUM7Q0FFSCxDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL2NvbnRyb2xsZXJzL09uZVRlbXBsYXRlQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuY29udHJvbGxlcignT25lVGVtcGxhdGVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIHJlc29sdmVUZW1wbGF0ZSwgcmVzb2x2ZUNvbXBhbnksIFRhc2tTdmMsIFByb2plY3RzU3ZjKSB7XG4gICRzY29wZS50ZXN0ID0gXCJUaGUgb25lIHRlbXBsYXRlIGN0cmwgaXMgd29ya2luZyFcIjtcbiAgJHNjb3BlLnRlbXBsYXRlID0gcmVzb2x2ZVRlbXBsYXRlLmRhdGE7XG5cbiAgY29uc29sZS5sb2coJ1RFTVBMQVRFJywgJHNjb3BlLnRlbXBsYXRlKVxuXG4gICRzY29wZS5jb21wYW55ID0gcmVzb2x2ZUNvbXBhbnkuZGF0YTtcbiAgJHNjb3BlLnRhc2tzID0gJHNjb3BlLnRlbXBsYXRlLnRhc2tzO1xuICB2YXIgdGVtcGxhdGVJZCA9ICRzY29wZS50ZW1wbGF0ZS5faWQ7XG4gICRzY29wZS5zaG93Rm9ybSA9IGZhbHNlO1xuXG5cbiAgJHNjb3BlLmRlcGFydG1lbnRzID0gJHNjb3BlLmNvbXBhbnkuZGVwYXJ0bWVudHM7XG4gICRzY29wZS5wb3NpdGlvbnMgPSAkc2NvcGUuY29tcGFueS5wb3NpdGlvbnM7XG4gICRzY29wZS5lbXBsb3llZXMgPSAkc2NvcGUuY29tcGFueS5lbXBsb3llZXM7XG4gICRzY29wZS5jaG9pY2VzID0gW1wiU3BlY2lmaWMgRGVwYXJ0bWVudFwiLCBcIlNwZWNpZmljIFBvc2l0aW9uXCIsIFwiU3BlY2lmaWMgUGVyc29uXCJdO1xuXG4gIGNvbnNvbGUubG9nKFwiVEVTVElORyBJTkZPXCIsICRzY29wZS5lbXBsb3llZXMpO1xuXG4gICRzY29wZS5mcmllbmRseUludGVydmFsID0gXCJcIjtcbiAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiXCI7XG5cbiAgdmFyIHRlbXBsYXRlID0gJHNjb3BlLnRlbXBsYXRlO1xuXG4gICRzY29wZS5kZXBhcnRtZW50c0FyciA9IFtdO1xuICAkc2NvcGUucG9zaXRpb25zQXJyID0gW107XG4gICRzY29wZS5lbXBsb3llZXNBcnIgPSBbXTtcblxuICAoZnVuY3Rpb24gZGVwYXJ0bWVudHNBcnIoKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaTwkc2NvcGUuZGVwYXJ0bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICRzY29wZS5kZXBhcnRtZW50c0Fyci5wdXNoKHtcbiAgICAgICAgbmFtZTogJHNjb3BlLmRlcGFydG1lbnRzW2ldLm5hbWUsXG4gICAgICAgIF9pZDogJHNjb3BlLmRlcGFydG1lbnRzW2ldLl9pZFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAkc2NvcGUuZGVwYXJ0bWVudHNBcnI7XG4gIH0pKCk7XG4gIGNvbnNvbGUubG9nKCRzY29wZS5kZXBhcnRtZW50c0Fycik7XG5cbiAgKGZ1bmN0aW9uIHBvc2l0aW9uc0FycigpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpPCRzY29wZS5wb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICRzY29wZS5wb3NpdGlvbnNBcnIucHVzaCh7XG4gICAgICAgIG5hbWU6ICRzY29wZS5wb3NpdGlvbnNbaV0ubmFtZSxcbiAgICAgICAgX2lkOiAkc2NvcGUucG9zaXRpb25zW2ldLl9pZFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAkc2NvcGUucG9zaXRpb25zQXJyO1xuICB9KSgpO1xuXG4gIChmdW5jdGlvbiBlbXBsb3llZXNBcnIoKSB7XG4gICAgZm9yKHZhciBpID0gMDsgaTwkc2NvcGUuZW1wbG95ZWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAkc2NvcGUuZW1wbG95ZWVzQXJyLnB1c2goe1xuICAgICAgICBuYW1lOiAkc2NvcGUuZW1wbG95ZWVzW2ldLmlkZW50aWZpY2F0aW9uLm5hbWUuZnVsbE5hbWUsXG4gICAgICAgIF9pZDogJHNjb3BlLmVtcGxveWVlc1tpXS5faWRcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gJHNjb3BlLmVtcGxveWVlc0FycjtcbiAgfSkoKTtcblxuXG4gICRzY29wZS5nZXRJbnRlcnZhbE5hbWUgPSBmdW5jdGlvbih0ZW1wbGF0ZSl7XG4gICAgdmFyIGxpbmsgPSB0ZW1wbGF0ZS5zZXR1cC5pbnRlcnZhbC50eXBlO1xuICAgIHZhciBwaW5rID0gdGVtcGxhdGUuc2V0dXAuaW50ZXJ2YWw7XG4gICAgaWYobGluayA9PT0gXCJEYWlseVwiKXtcbiAgICAgICRzY29wZS5mcmllbmRseUludGVydmFsID0gXCJEYWlseVwiO1xuICAgIH0gZWxzZSBpZiAobGluayA9PT0gXCJEYWlseSBCdXNpbmVzcyBEYXlzXCIpe1xuICAgICAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIkV2ZXJ5IEJ1c2luZXNzIERheVwiO1xuICAgIH0gZWxzZSBpZiggbGluayA9PT0gXCJXZWVrbHlcIil7XG4gICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgV2Vla1wiO1xuICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiRXZlcnkgXCIgKyBwaW5rLndlZWtseUludGVydmFsO1xuICAgIH0gZWxzZSBpZihsaW5rID09PSBcIkJpLVdlZWtseVwiKSB7XG4gICAgICAkc2NvcGUuZnJpZW5kbHlJbnRlcnZhbCA9IFwiRXZlcnkgT3RoZXIgV2Vla1wiO1xuICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiRXZlcnkgb3RoZXIgXCIgKyBwaW5rLndlZWtseUludGVydmFsO1xuICAgIH0gZWxzZSBpZihsaW5rID09PSBcIk1vbnRobHlcIikge1xuICAgICAgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwgPSBcIkV2ZXJ5IE1vbnRoXCI7XG4gICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVElPTlwiLCBwaW5rLm1vbnRobHlJbnRlcnZhbC5zZWxlY3Rpb24pO1xuICAgICAgaWYocGluay5tb250aGx5SW50ZXJ2YWwuc2VsZWN0aW9uID09IFwiIyBvZiBEYXlzIEZyb20gU3RhcnRcIil7XG4gICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBwaW5rLm1vbnRobHlJbnRlcnZhbC5mcm9tQmVnaW5uaW5nICsgXCIgZGF5cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtb250aFwiO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlN0ZXBoZW5zIGZhdWx0XCIsIHBpbmsubW9udGhseUludGVydmFsLmZyb21CZWdpbm5pbmcpO1xuICAgICAgfSBlbHNlIGlmKHBpbmsubW9udGhseUludGVydmFsLnNlbGVjdGlvbiA9PSBcIiMgb2YgRGF5cyBCZWZvcmUgRW5kXCIpe1xuICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5tb250aGx5SW50ZXJ2YWwuZnJvbUVuZCArIFwiIGRheXMgYmVmb3JlIHRoZSBlbmQgb2YgdGhlIG1vbnRoXCI7XG4gICAgICB9IGVsc2UgaWYgKHBpbmsubW9udGhseUludGVydmFsLmZpcnN0T2ZNb250aCl7XG4gICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkZpcnN0IERheSBvZiB0aGUgTW9udGhcIjtcbiAgICAgIH0gZWxzZSBpZihwaW5rLm1vbnRobHlJbnRlcnZhbC5lbmRPZk1vbnRoKSB7XG4gICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBcIkxhc3QgRGF5IG9mIHRoZSBNb250aFwiO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZihsaW5rID09PSBcIkFubnVhbGx5XCIpIHtcbiAgICAgICRzY29wZS5mcmllbmRseUludGVydmFsID0gXCJFdmVyeSBZZWFyXCI7XG4gICAgICBpZihwaW5rLmFubnVhbEludGVydmFsLnNlbGVjdGlvbiA9PT0gXCIjIG9mIERheXMgRnJvbSBTdGFydFwiKXtcbiAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IHBpbmsuYW5udWFsSW50ZXJ2YWwuZnJvbUJlZ2lubmluZyArIFwiIGRheXMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgeWVhci4gXCI7XG4gICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiIyBvZiBEYXlzIEJlZm9yZSBlbmRcIil7XG4gICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBwaW5rLmFubnVhbEludGVydmFsLmZyb21FbmQgKyBcIiBkYXlzIGJlZm9yZSB0aGUgZW5kIG9mIHRoZSB5ZWFyXCI7XG4gICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiRmlyc3QgRGF5IG9mIHRoZSBZZWFyXCIpe1xuICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJGaXJzdCBEYXkgb2YgdGhlIFllYXJcIjtcbiAgICAgIH0gZWxzZSBpZihwaW5rLmFubnVhbEludGVydmFsLnNlbGVjdGlvbiA9PT0gXCJMYXN0IERheSBvZiB0aGUgWWVhclwiKXtcbiAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiTGFzdCBEYXkgb2YgdGhlIFllYXJcIjtcbiAgICAgIH0gZWxzZSBpZihwaW5rLmFubnVhbEludGVydmFsLnNlbGVjdGlvbiA9PT0gXCJBbnkgRGF5IG9mIHRoZSBZZWFyXCIpe1xuICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJBbnkgRGF5IG9mIHRoZSBZZWFyXCI7XG4gICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiSW4gYSBQYXJ0aWN1bGFyIE1vbnRoXCIpe1xuICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJFdmVyeSBcIiArIHBpbmsuYW5udWFsSW50ZXJ2YWwuc2VsZWN0TW9udGg7XG4gICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnRlcnZhbC5zZWxlY3Rpb24gPT09IFwiSW4gYSBQYXJ0aWN1bGFyIFF1YXJ0ZXJcIil7XG4gICAgICAgICAgdmFyIGVuZGluZztcbiAgICAgICAgaWYocGluay5hbm51YWxJbnZlcnZhbC5zZWxlY3RRdWFydGVyID09PSAxKXtcbiAgICAgICAgICBlbmRpbmcgPSBcInN0XCI7XG4gICAgICAgIH0gZWxzZSBpZihwaW5rLmFubnVhbEludmVydmFsLnNlbGVjdFF1YXJ0ZXIgPT09IDIpe1xuICAgICAgICAgIGVuZGluZyA9IFwibmRcIjtcbiAgICAgICAgfSBlbHNlIGlmKHBpbmsuYW5udWFsSW52ZXJ2YWwuc2VsZWN0UXVhcnRlciA9PT0gMyl7XG4gICAgICAgICAgZW5kaW5nID0gXCJyZFwiO1xuICAgICAgICB9IGVsc2UgaWYocGluay5hbm51YWxJbnZlcnZhbC5zZWxlY3RRdWFydGVyID09PSA0KXtcbiAgICAgICAgICBlbmRpbmcgPSBcInRoXCI7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiRXZlcnkgXCIgKyBwaW5rLmFubnVhbEludGVydmFsLnNlbGVjdFF1YXJ0ZXIgKyBlbmRpbmc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaW5rID09PSBcIlF1YXJ0ZXJseVwiKXtcbiAgICAgICRzY29wZS5mcmllbmRseUludGVydmFsID0gXCJFdmVyeSBRdWFydGVyXCI7XG4gICAgICAgIGlmKHBpbmsucXVhcnRlcmx5SW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIkZpcnN0IERheSBvZiB0aGUgUXVhcnRlclwiKXtcbiAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJUaGUgRmlyc3QgRGF5IG9mIHRoZSBRdWFydGVyXCI7XG4gICAgICAgIH0gZWxzZSBpZihwaW5rLnF1YXJ0ZXJseUludGVydmFsLnNlbGVjdGlvbiA9PT0gXCJMYXN0IERheSBvZiB0aGUgUXVhcnRlclwiKXtcbiAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gXCJUaGUgTGFzdCBEYXkgb2YgdGhlIFF1YXJ0ZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmKHBpbmsucXVhcnRlcmx5SW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIiMgRGF5cyBmcm9tIFN0YXJ0XCIpe1xuICAgICAgICAgICRzY29wZS5mcmllbmRseUZyZXEgPSBwaW5rLnF1YXJ0ZXJseUludGVydmFsLmZyb21CZWdpbm5pbmcgKyBcIiBkYXlzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHF1YXJ0ZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmKHBpbmsucXVhcnRlcmx5SW50ZXJ2YWwuc2VsZWN0aW9uID09PSBcIiMgRGF5cyBmcm9tIEVuZFwiKXtcbiAgICAgICAgICAkc2NvcGUuZnJpZW5kbHlGcmVxID0gcGluay5xdWFydGVybHlJbnRlcnZhbC5mcm9tRW5kICsgXCIgZGF5cyBhZnRlciB0aGUgYmVnaW5uaW5nIG9mIHRoZSBxdWFydGVyXCI7XG4gICAgICAgIH0gZWxzZSBpZihwaW5rLnF1YXJ0ZXJseUludGVydmFsLnNlbGVjdGlvbiA9PT0gXCJBbnlcIil7XG4gICAgICAgICAgJHNjb3BlLmZyaWVuZGx5RnJlcSA9IFwiQW55IGRheSBvZiB0aGUgcXVhcnRlclwiO1xuICAgICAgICB9XG4gICAgfVxuICB9O1xuXG4gICAgaWYgKCRzY29wZS50ZW1wbGF0ZS5zZXR1cC50eXBlID09PSBcIlNjaGVkdWxlZFwiKSB7XG4gICAgICAkc2NvcGUuZ2V0SW50ZXJ2YWxOYW1lKHRlbXBsYXRlKTsgICAgXG4gICAgfVxuICBjb25zb2xlLmxvZyhcImZyaWVuZGx5SW50ZXJ2YWxcIiwgJHNjb3BlLmZyaWVuZGx5SW50ZXJ2YWwpO1xuICBjb25zb2xlLmxvZyhcImZyaWVuZGx5RnJlcVwiLCAkc2NvcGUuZnJpZW5kbHlGcmVxKTtcblxuICAkc2NvcGUuc2F2ZVRhc2sgPSBmdW5jdGlvbihuZXdUYXNrKXtcbiAgICBjb25zb2xlLmxvZyhcIldIQVQnUyBUSElTXCIsIG5ld1Rhc2spO1xuICAgIFRhc2tTdmMuYWRkVGFzayhuZXdUYXNrLHRlbXBsYXRlSWQpXG4gICAgLnRoZW4oKHJlcyk9PntcbiAgICAgICRzdGF0ZS5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfTtcblxuICAkc2NvcGUubmV3VGFzayA9IHtcbiAgICBhc3NpZ25tZW50OiB7XG4gICAgICBkZXBhcnRtZW50czogJycsXG5cbiAgICB9XG4gIH07XG5cbiAgJHNjb3BlLnRhc2tCdXR0b24gPSBmYWxzZTtcblxuICAkc2NvcGUuc3RhcnRQcm9qZWN0ID0gZnVuY3Rpb24oKXtcbiAgICBjb25zb2xlLmxvZyhcIlNUQVJUSU5HIFRISVMgVEVNUExBVEU6IFwiLCB0ZW1wbGF0ZUlkKTtcbiAgICBQcm9qZWN0c1N2Yy5zdGFydFByb2plY3QodGVtcGxhdGVJZCkuXG4gICAgdGhlbigocmVzKT0+IHtcbiAgICAgICRzdGF0ZS5yZWxvYWQoKTtcbiAgICB9KTtcbiAgfTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=