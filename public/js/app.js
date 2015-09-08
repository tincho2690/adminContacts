angular.module('MyApp',['ngRoute'])

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
