'use strict';

angular.module('terminatorApp').service('TemplatesSvc', function ($http, $q) {

  ////////////////////////
  //  Template Calls
  ////////////////////////
  this.getTemplates = function () {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: "/api/template"
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneTemplate = function (id) {
    var defer = $q.defer();
    $http({
      method: "GET",
      url: "/api/template/" + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error:(HERE) ", error);
    });
    return defer.promise;
  };

  // this.postTemplate = function (newTemplate) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template",
  //     data: newTemplate
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.editTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "PUT",
  //     url: "/api/template/" + id,
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.deleteTemplate = function (id) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "DELETE",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // ////////////////////////
  // // Task Template Calls
  // ////////////////////////

  // this.postTasks = function (newTasksArr, id) {
  //   console.log("TemplatesSvc");
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template/tasks",
  //     data: newTasksArr
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // ////////////////////////
  // // Project Template Calls
  // ////////////////////////

  // this.getProjectTemplates = function () {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/template"
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // this.getOneProjectTemplate = function (id) {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }

  // this.postProjectTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "POST",
  //     url: "/api/template",
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.editProjectTemplate = function () {
  //   var defer = $q.defer();

  //   $http({
  //     method: "PUT",
  //     url: "/api/template/" + id,
  //     data: {}
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // };

  // this.deleteProjectTemplate = function (id) {
  //   var defer = $q.defer();

  //   $http({
  //     method: "DELETE",
  //     url: "/api/template/" + id
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;;
  // };

  // this.getCompanies = function () {

  //   var defer = $q.defer();

  //   $http({
  //     method: "GET",
  //     url: "/api/company"
  //   }).then(function(response) {
  //     defer.resolve(response);
  //   }, function (error) {
  //     console.log("error: ", error);
  //   });

  //   return defer.promise;
  // }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9UZW1wbGF0ZXNTdmMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBUyxLQUFLLEVBQUUsRUFBRSxFQUFFOzs7OztBQUsxRSxNQUFJLENBQUMsWUFBWSxHQUFHLFlBQVk7O0FBRTlCLFFBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFdkIsU0FBSyxDQUFDO0FBQ0osWUFBTSxFQUFFLEtBQUs7QUFDYixTQUFHLEVBQUUsZUFBZTtLQUNyQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsUUFBUSxFQUFFO0FBQ3pCLFdBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekIsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNsQixhQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvQixDQUFDLENBQUM7O0FBRUgsV0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0dBQ3RCLENBQUM7O0FBRUYsTUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLEVBQUUsRUFBRTtBQUNsQyxRQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDdkIsU0FBSyxDQUFDO0FBQ0osWUFBTSxFQUFFLEtBQUs7QUFDYixTQUFHLEVBQUUsZ0JBQWdCLEdBQUcsRUFBRTtLQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsUUFBUSxFQUFFO0FBQ3pCLFdBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekIsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNsQixhQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNyQyxDQUFDLENBQUM7QUFDSCxXQUFPLEtBQUssQ0FBQyxPQUFPLENBQUM7R0FDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXlLRixDQUFDLENBQUM7QUF6S0MiLCJmaWxlIjoicHVibGljL3NlcnZpY2VzL1RlbXBsYXRlc1N2Yy5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCd0ZXJtaW5hdG9yQXBwJykuc2VydmljZSgnVGVtcGxhdGVzU3ZjJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gIFRlbXBsYXRlIENhbGxzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgdGhpcy5nZXRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgJGh0dHAoe1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGVcIlxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICB9O1xuXG4gIHRoaXMuZ2V0T25lVGVtcGxhdGUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICRodHRwKHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL1wiICsgaWRcbiAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6KEhFUkUpIFwiLCBlcnJvcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gIH07XG5cbiAgLy8gdGhpcy5wb3N0VGVtcGxhdGUgPSBmdW5jdGlvbiAobmV3VGVtcGxhdGUpIHtcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gIC8vICAgJGh0dHAoe1xuICAvLyAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCIsXG4gIC8vICAgICBkYXRhOiBuZXdUZW1wbGF0ZVxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAvLyB9O1xuXG4gIC8vIHRoaXMuZWRpdFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgLy8gICAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gIC8vICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZS9cIiArIGlkLFxuICAvLyAgICAgZGF0YToge31cbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gIC8vICAgfSk7XG5cbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgLy8gfTtcblxuICAvLyB0aGlzLmRlbGV0ZVRlbXBsYXRlID0gZnVuY3Rpb24gKGlkKSB7XG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAvLyAgICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL1wiICsgaWRcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gIC8vICAgfSk7XG5cbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgLy8gfTtcblxuICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gLy8gVGFzayBUZW1wbGF0ZSBDYWxsc1xuICAvLyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAvLyB0aGlzLnBvc3RUYXNrcyA9IGZ1bmN0aW9uIChuZXdUYXNrc0FyciwgaWQpIHtcbiAgLy8gICBjb25zb2xlLmxvZyhcIlRlbXBsYXRlc1N2Y1wiKTtcbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gIC8vICAgJGh0dHAoe1xuICAvLyAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlL3Rhc2tzXCIsXG4gIC8vICAgICBkYXRhOiBuZXdUYXNrc0FyclxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAvLyB9XG5cbiAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIC8vIFByb2plY3QgVGVtcGxhdGUgQ2FsbHNcbiAgLy8gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgLy8gdGhpcy5nZXRQcm9qZWN0VGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xuXG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAvLyAgICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJHRVRcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL3RlbXBsYXRlXCJcbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gIC8vICAgfSk7XG5cbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgLy8gfVxuXG4gIC8vIHRoaXMuZ2V0T25lUHJvamVjdFRlbXBsYXRlID0gZnVuY3Rpb24gKGlkKSB7XG5cbiAgLy8gICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gIC8vICAgJGh0dHAoe1xuICAvLyAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAvLyAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGUvXCIgKyBpZFxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAvLyB9XG5cbiAgLy8gdGhpcy5wb3N0UHJvamVjdFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgLy8gICAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAvLyAgICAgdXJsOiBcIi9hcGkvdGVtcGxhdGVcIixcbiAgLy8gICAgIGRhdGE6IHt9XG4gIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xuICAvLyAgIH0pO1xuXG4gIC8vICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gIC8vIH07XG5cbiAgLy8gdGhpcy5lZGl0UHJvamVjdFRlbXBsYXRlID0gZnVuY3Rpb24gKCkge1xuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgLy8gICAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gIC8vICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZS9cIiArIGlkLFxuICAvLyAgICAgZGF0YToge31cbiAgLy8gICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gIC8vICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgLy8gICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgLy8gICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gIC8vICAgfSk7XG5cbiAgLy8gICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgLy8gfTtcblxuICAvLyB0aGlzLmRlbGV0ZVByb2plY3RUZW1wbGF0ZSA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgLy8gICAkaHR0cCh7XG4gIC8vICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gIC8vICAgICB1cmw6IFwiL2FwaS90ZW1wbGF0ZS9cIiArIGlkXG4gIC8vICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAvLyAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gIC8vICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xuICAvLyAgIH0pO1xuXG4gIC8vICAgcmV0dXJuIGRlZmVyLnByb21pc2U7O1xuICAvLyB9O1xuXG4gIC8vIHRoaXMuZ2V0Q29tcGFuaWVzID0gZnVuY3Rpb24gKCkge1xuXG4gIC8vICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAvLyAgICRodHRwKHtcbiAgLy8gICAgIG1ldGhvZDogXCJHRVRcIixcbiAgLy8gICAgIHVybDogXCIvYXBpL2NvbXBhbnlcIlxuICAvLyAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgLy8gICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAvLyAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgLy8gICB9KTtcblxuICAvLyAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAvLyB9XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
