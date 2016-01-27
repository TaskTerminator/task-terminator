angular.module('terminatorApp').service('TaskSvc', function($http, $q) {

this.addTask = function(newTask,templateid){
  var defer = $q.defer();
  $http({
    method: "POST",
    url: "/api/"+ templateid +"/tasks",
    data: newTask
  }).then(function(response) {
    defer.resolve(response);
  }, function (error) {
    console.log("error: ", error);
  });

  return defer.promise;
};

});
