angular.module('MyApp')
.controller('ContactHomeCtrl',['$scope', '$http', function($scope,$http){

	/*var refresh = function(){
		console.log("i call the function");
		$http.get('/contactlist').success(function(response){
		    console.log("i got the requested data");
			$scope.contactList = response;
			$scope.contact="";
	    });
	};

	refresh();
	*/
	console.log("i call the function");
		$http.get('/allContacts').success(function(response){
		    console.log("i got the requested data");
			$scope.contactList = response;
	});
   			
}]);
