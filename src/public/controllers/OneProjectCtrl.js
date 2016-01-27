angular.module('terminatorApp').controller('OneProjectCtrl', function($scope, resolveProject) {

  $scope.test = "The one project ctrl is working!";

  $scope.project = resolveProject.data;

});
