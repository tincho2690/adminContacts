angular.module('MyApp').controller('ContactLoginCtrl',['$scope','$http','$location','AuthService',function($scope,$http,$location, AuthService){

	//AuthService.login($scope.contact);
	$scope.login = function(contact){

		console.log($scope.contact.username);
		console.log($scope.contact.pass);
		//console.log(AuthService);

		//console.log(AuthService.login($scope.contact));

		AuthService.login($scope.contact, function(responseContact){
			console.log(responseContact);

		});

	};
	

}]);

	
		