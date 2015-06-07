angular
.module('uploadModule')
.controller('uploadController',
['$scope', '$http', 'toastr', function($scope, $http, toastr){
  $scope.dirty = false;

  

  $scope.check_name = function(){
    $http.post('/check_name',{
      name: $scope.uploadForm.name
    }).then(function onSuccess(msg){
      if(msg.data == true){
        console.log("Name Taken");
        $scope.dirty = true;
      } else{
        $scope.dirty = false;
      }
    }).catch(function onError(response){
    });
  }

}]);
