angular.module('MyApp').controller('ContactLoginCtrl',['$scope','$http','$location','AuthService',function($scope,$http,$location, AuthService){

	//AuthService.login($scope.contact);
	$scope.login = function(contact){
		console.log($scope.contact);
		console.log($scope.contact.username);
		console.log($scope.contact.password);
		//console.log(AuthService);

		//console.log(AuthService.login($scope.contact));

		$http.post('/login', $scope.contact).success(function(user){
			console.log('volvio por el success');
			console.log(user);
			$location.path('/contactDetail/'+user._id);
			//var loggedUser = response;
			//console.log(loggedUser);
		}).error(function(response){
			console.log('volvio por el error');
			console.log(response);
		});
		
		/*AuthService.login($scope.contact, function(responseContact){
			console.log(responseContact);

		});*/

	};
	

}]);

	
		