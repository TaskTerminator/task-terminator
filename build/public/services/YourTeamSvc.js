'use strict';

angular.module('terminatorApp').service('YourTeamSvc', function ($http, $q) {

  ////////////////////////
  // Employee Calls
  ////////////////////////

  this.getEmployees = function (companyId) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: 'api/' + companyId + '/employee'
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.getOneEmployee = function (companyId, id) {

    var defer = $q.defer();

    $http({
      method: "GET",
      url: 'api/' + companyId + '/employee/' + id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.postEmployee = function (newEmployee, companyId) {
    console.log('newEmployee', newEmployee);
    var defer = $q.defer();
    $http({
      method: "POST",
      url: 'api/' + companyId + '/' + newEmployee.departments[0] + '/' + newEmployee.positions[0] + '/employee',
      data: newEmployee
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  this.editEmployee = function (employee) {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "api/employee/" + employee._id,
      data: employee
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.deleteEmployee = function (employee) {
    var defer = $q.defer();

    $http({
      method: "DELETE",
      url: "api/employee/" + employee._id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  ////////////////////////
  // Department Calls
  ////////////////////////
  this.postDepartment = function (newDepartment) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "api/department/569533191bfb3ca903f17803",
      data: newDepartment
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.putDepartment = function (department) {
    var defer = $q.defer();

    $http({
      method: "PUT",
      url: "api/department/" + department._id,
      data: department
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  this.deleteDepartment = function (department) {
    var defer = $q.defer();
    $http({
      method: "DELETE",
      url: "api/department/" + department._id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  ////////////////////////
  // Position Calls
  ////////////////////////
  this.postPosition = function (newPosition) {
    var defer = $q.defer();

    $http({
      method: "POST",
      url: "api/position/569533191bfb3ca903f17803/" + newPosition.department,
      data: newPosition
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });

    return defer.promise;
  };

  this.editPosition = function (position) {
    var defer = $q.defer();
    $http({
      method: "PUT",
      url: "api/position/" + position._id,
      data: position
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };

  this.deletePosition = function (position) {
    var defer = $q.defer();
    $http({
      method: "DELETE",
      url: 'api/position/' + position._id
    }).then(function (response) {
      defer.resolve(response);
    }, function (error) {
      console.log("error: ", error);
    });
    return defer.promise;
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9zZXJ2aWNlcy9Zb3VyVGVhbVN2Yy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFTLEtBQUssRUFBRSxFQUFFLEVBQUU7Ozs7OztBQU12RSxNQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsU0FBUyxFQUFFOztBQUV2QyxRQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRXZCLFNBQUssQ0FBQztBQUNKLFlBQU0sRUFBRSxLQUFLO0FBQ2IsU0FBRyxXQUFTLFNBQVMsY0FBVztLQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVMsUUFBUSxFQUFFO0FBQ3pCLFdBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDekIsRUFBRSxVQUFVLEtBQUssRUFBRTtBQUNsQixhQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvQixDQUFDLENBQUM7O0FBRUgsV0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0dBQ3RCLENBQUM7O0FBRUYsTUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLFNBQVMsRUFBRSxFQUFFLEVBQUU7O0FBRTdDLFFBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFdkIsU0FBSyxDQUFDO0FBQ0osWUFBTSxFQUFFLEtBQUs7QUFDYixTQUFHLFdBQVMsU0FBUyxrQkFBYSxFQUFFLEFBQUU7S0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLFFBQVEsRUFBRTtBQUN6QixXQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3pCLEVBQUUsVUFBVSxLQUFLLEVBQUU7QUFDbEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0IsQ0FBQyxDQUFDOztBQUVILFdBQU8sS0FB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Q0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0IsQ0FBQyxDQUFDO0FBQ0gsV0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO0dBQ3RCLENBQUE7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoicHVibGljL3NlcnZpY2VzL1lvdXJUZWFtU3ZjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ3Rlcm1pbmF0b3JBcHAnKS5zZXJ2aWNlKCdZb3VyVGVhbVN2YycsIGZ1bmN0aW9uKCRodHRwLCAkcSkge1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBFbXBsb3llZSBDYWxsc1xuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIHRoaXMuZ2V0RW1wbG95ZWVzID0gZnVuY3Rpb24gKGNvbXBhbnlJZCkge1xuXG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgdXJsOiBgYXBpLyR7Y29tcGFueUlkfS9lbXBsb3llZWBcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRPbmVFbXBsb3llZSA9IGZ1bmN0aW9uIChjb21wYW55SWQsIGlkKSB7XG5cbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICB1cmw6IGBhcGkvJHtjb21wYW55SWR9L2VtcGxveWVlLyR7aWR9YFxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGlzLnBvc3RFbXBsb3llZSA9IGZ1bmN0aW9uIChuZXdFbXBsb3llZSwgY29tcGFueUlkKSB7XG4gICAgICBjb25zb2xlLmxvZygnbmV3RW1wbG95ZWUnLCBuZXdFbXBsb3llZSlcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIHVybDogYGFwaS8ke2NvbXBhbnlJZH0vJHtuZXdFbXBsb3llZS5kZXBhcnRtZW50c1swXX0vJHtuZXdFbXBsb3llZS5wb3NpdGlvbnNbMF19L2VtcGxveWVlYCxcbiAgICAgICAgZGF0YTogbmV3RW1wbG95ZWVcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXMuZWRpdEVtcGxveWVlID0gZnVuY3Rpb24gKGVtcGxveWVlKSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgdXJsOiBcImFwaS9lbXBsb3llZS9cIiArIGVtcGxveWVlLl9pZCxcbiAgICAgICAgZGF0YTogZW1wbG95ZWVcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZWxldGVFbXBsb3llZSA9IGZ1bmN0aW9uIChlbXBsb3llZSkge1xuICAgICAgdmFyIGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICAgIHVybDogXCJhcGkvZW1wbG95ZWUvXCIgKyBlbXBsb3llZS5faWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9O1xuXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAvLyBEZXBhcnRtZW50IENhbGxzXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIHRoaXMucG9zdERlcGFydG1lbnQgPSBmdW5jdGlvbihuZXdEZXBhcnRtZW50KSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIHVybDogXCJhcGkvZGVwYXJ0bWVudC81Njk1MzMxOTFiZmIzY2E5MDNmMTc4MDNcIixcbiAgICAgICAgZGF0YTogbmV3RGVwYXJ0bWVudFxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGlzLnB1dERlcGFydG1lbnQgPSBmdW5jdGlvbihkZXBhcnRtZW50KSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgdXJsOiBcImFwaS9kZXBhcnRtZW50L1wiICsgZGVwYXJ0bWVudC5faWQsXG4gICAgICAgIGRhdGE6IGRlcGFydG1lbnRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfTtcblxuICAgIHRoaXMuZGVsZXRlRGVwYXJ0bWVudCA9IGZ1bmN0aW9uKGRlcGFydG1lbnQpIHtcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgdXJsOiBcImFwaS9kZXBhcnRtZW50L1wiICsgZGVwYXJ0bWVudC5faWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICB9XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFBvc2l0aW9uIENhbGxzXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIHRoaXMucG9zdFBvc2l0aW9uID0gZnVuY3Rpb24obmV3UG9zaXRpb24pIHtcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICRodHRwKHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgdXJsOiBcImFwaS9wb3NpdGlvbi81Njk1MzMxOTFiZmIzY2E5MDNmMTc4MDMvXCIgKyBuZXdQb3NpdGlvbi5kZXBhcnRtZW50LFxuICAgICAgICBkYXRhOiBuZXdQb3NpdGlvblxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBkZWZlci5yZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRQb3NpdGlvbiA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgIHVybDogXCJhcGkvcG9zaXRpb24vXCIgKyBwb3NpdGlvbi5faWQsXG4gICAgICAgIGRhdGE6IHBvc2l0aW9uXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGRlZmVyLnJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgIH07XG5cbiAgICB0aGlzLmRlbGV0ZVBvc2l0aW9uID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgIHZhciBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAkaHR0cCh7XG4gICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgICAgdXJsOiAnYXBpL3Bvc2l0aW9uLycgKyBwb3NpdGlvbi5faWRcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgZGVmZXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvcjogXCIsIGVycm9yKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=