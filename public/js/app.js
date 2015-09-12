angular.module('MyApp',['ngRoute'])

.factory('testService', ['$http', function($http) {

	var x;

	$http.get('/singleContact/'+'55bd222f18195c441cf788a2').success(function(response){
			console.log(response.name);
			//return reponse;
			//return response;
			x = response.name;
			return x
	
	})
	console.log(x);
	return x
	
						
}])

.config(function($routeProvider){
	$routeProvider
		
		
		.when('/about',{templateUrl:'about.html'})
		.when('/',{templateUrl:'contactHome.html'})
		.when('/contactDetail/:contactID',{templateUrl:'contactDetail.html'})
		.when('/appointmentDetail/:contactID',{templateUrl:'appointmentDetail.html'})
		.when('/contactEdit/:contactID',{templateUrl:'contactEdit.html'})
		.when('/contactInsert',{templateUrl:'contactInsert.html'})
		
		.otherwise({
			redirectTo: '/'
		});
});
/*.factory('contactInsertService', function(){

	return{
		validateFields: function(){

		};
	};


});*/