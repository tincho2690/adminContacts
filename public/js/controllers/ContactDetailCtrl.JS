angular.module('MyApp')
.controller('ContactDetailCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
	
	console.log($routeParams.contactID);
	$http.get('/singleContact/'+ $routeParams.contactID).success(function(response){
			$scope.detailedContact = response;
	});
	$scope.remove = function(id){
    	console.log(id);
    	var deletedContact = $scope.detailedContact.name;
    	$http.delete('/contactDelete/' + $routeParams.contactID).success(function(response){
    		window.alert("El usuario" +""+ deletedContact+"" + "ha sido borrado");
    	});
    };
}]); 