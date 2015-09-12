angular.module('MyApp')
.controller('ContactHomeCtrl',['$scope', '$http','testService', function($scope,$http,testService){

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
	console.log(testService);
	console.log("i call the function");
		$http.get('/allContacts').success(function(response){
		    console.log("i got the requested data");
			$scope.contactList = response;
	});
   			
}]);
