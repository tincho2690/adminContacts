/*angular.module('MyApp',['http']).factory('testService', ['$http', function($http) {

	return{

	$http.get('/singleContact/'+'55bd222f18195c441cf788a2').success(function(response){
			console.log(response.name);
			//return reponse;
			//return response;
			x = response.name;
			return x
	
	})
	console.log(x);
	return x
	
						
}])*/

angular.module('MyApp').factory('AuthService',['$http', function($http){

var login = function(contact){

	console.log("llegue al service")
	console.log(contact);

};

}]);