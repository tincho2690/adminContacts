angular.module('MyApp')
.controller('ContactEditCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
		
	console.log($routeParams.contactID);
	$http.get('/singleContact/'+ $routeParams.contactID).success(function(response){
			$scope.contact = response;
			//console.log($scope.detailedContact.name);
	});

	$scope.update = function(){

		console.log("Entre al update");
		$http.put('/singleContact/' + $scope.contact._id, $scope.contact).success(function(response){
			$scope.successMessage="El usuario fue modificado";
		});
	
	};
}]); 
