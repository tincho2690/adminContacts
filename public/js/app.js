angular.module('MyApp',['ngRoute'])

.config(function($routeProvider){
	$routeProvider
		.when('/',{templateUrl:'redirectedPage.html'})
		.when('/about',{templateUrl:'about.html'})
		.when('/contactHome',{templateUrl:'contactHome.html'})
		.when('/contactHome/contactDetail/:contactID',{templateUrl:'contactDetail.html'})
		.when('/contactHome/contactDetail/appointmentDetail/:contactID',{templateUrl:'appointmentDetail.html'})
		.when('/contactHome/contactDetail/contactEdit/:contactID',{templateUrl:'contactEdit.html'})
		.when('/contactHome/contactInsert',{templateUrl:'contactInsert.html'})
		
		.otherwise({
			redirectTo: '/'
		});
});
