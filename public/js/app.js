angular.module('MyApp',['ngRoute'])

.factory('AuthService',['$http', function($http){

//return "ya";

/*var login = function(contact, callback){

	return "llegue al service";

};*/
return {
		login: function(contact, callback){
			callback("tet");
		}
	};

}])

.config(function($routeProvider,$httpProvider){
	$routeProvider
		
		
		.when('/about',{templateUrl:'about.html'})
		.when('/',{templateUrl:'contactHome.html'})
		.when('/contactDetail/:contactID',{templateUrl:'contactDetail.html'})
		.when('/appointmentDetail/:contactID',{templateUrl:'appointmentDetail.html'})
		.when('/contactEdit/:contactID',{templateUrl:'contactEdit.html'})
		.when('/contactInsert',{templateUrl:'contactInsert.html'})
		.when('/login',{templateUrl:'contactLogin.html'})
		.otherwise({
			redirectTo: '/'
		});
	$httpProvider.interceptors
	.push(function($q, $location){

		return{
			response: function(response){
				return response;
			},
			responseError: function(response){
				if (response.status ===401)
					$location.url('#/login');
				return $1.reject(response);
			}
		};
	});
});

