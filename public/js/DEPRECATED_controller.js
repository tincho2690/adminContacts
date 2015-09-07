
var myApp = angular.module('MyApp');


// myApp.config(function($routeProvider){
// 	$routeProvider
// 		.when('/',{templateUrl:'redirectedPage.html'})
// 		.when('/about',{templateUrl:'about.html'})
// 		.when('/contactHome',{templateUrl:'contactHome.html'})
// 		.when('/contactHome/contactDetail/:contactID',{templateUrl:'contactDetail.html'})
// 		.when('/contactHome/contactDetail/appointmentDetail/:contactID',{templateUrl:'appointmentDetail.html'})
// 		.when('/contactHome/contactDetail/contactEdit/:contactID',{templateUrl:'contactEdit.html'})
// 		.when('/contactHome/contactInsert',{templateUrl:'contactInsert.html'})
		
// 		.otherwise({
// 			redirectTo: '/'
// 		});
// });

myApp.controller('ContactInsertCtrl',['$scope', '$http', function($scope,$http){

	    $scope.addContact = function(){
    	   	

    	   	console.log("entroooo")
    	   	console.log($scope.contact);
    	   	
    	   	if(($scope.contact.name == null)||($scope.contact.email ==null)||($scope.contact.number ==null)){

    	   		$scope.errorMessage="Por favor complete todos los datos";
    	   	}
    	   	else{

    	   		console.log("entro al else del que tiene los campos completos");
    	   		$http.get('/contactlist/contactinsert/'+$scope.contact.dni ,$scope.contact).success(function(response){
    	   				
    	   			console.log(response);
    	   			console.log(response.length == 0);
    	   			if (response.length === 0){
    	   				
    	   				console.log("entro al if del que no existe")

    	   				//horarios = {"lunes": [],"martes":[],"miercoles":[],"jueves":[],"viernes":[],"sabado":[],"domingo":[]};
    	   				//$scope.contact.horarios = horarios;
    	   				
    	   				$http.post('/contactlist', $scope.contact).success(function(response){
		    				//console.log(response);
		    				$scope.successMessage="Usuario agregado correctamente";
		    				$scope.errorMessage="";
		    				$scope.contact="";
		    			});	   	   				
    	   			}
    	   			else{
    	   				$scope.errorMessage="El contacto ya existe";  				
    	   				window.alert($scope.errorMessage);
    	   				$scope.successMessage="";
    	   			}

    	   		});
    	   			/*error(function(data, status, headers, config) {
  						$http.post('/contactlist', $scope.contact).success(function(response){
		    				console.log(response);
		    				$scope.successMessage="Usuario agregado correctamente";
		    			})		
    				*/  					
	    	}
	    }	
}]);

myApp.controller('ContactHomeCtrl',['$scope', '$http', function($scope,$http){

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
		$http.get('/contactlist').success(function(response){
		    console.log("i got the requested data");
			$scope.contactList = response;
	});


    /*$scope.addContact = function(){
    	
    	console.log($scope.contact);
    	$http.post('/contactlist', $scope.contact).success(function(response){
    		console.log(response);
    		refresh();
    	});   
    };
*/
    			
}]);

myApp.controller('ContactDetailCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
	
	console.log($routeParams.contactID);
	$http.get('/contactlist/contactdetail/'+ $routeParams.contactID).success(function(response){
			

			$scope.detailedContact = response;

			//console.log($scope.detailedContact.name);

	});
	$scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contactlist/' + id).success(function(response){
    		//$window.alert("El usuario" + $scope.detailedContact + "ha sido borrado");
    		console.log("Se borro el usuario");
    	});
    };
}]); 

myApp.controller('ContactEditCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){
		
	console.log($routeParams.contactID);
	$http.get('/contactlist/contactedit/'+ $routeParams.contactID).success(function(response){
			$scope.contact = response;
			//console.log($scope.detailedContact.name);
	});

	$scope.update = function(){

		console.log("Entre al update");
		$http.put('/contactlist/contactedit/' + $scope.contact._id, $scope.contact).success(function(response){
			$scope.successMessage="El usuario fue modificado";
		});
	
	};
}]); 

myApp.controller('AppointmentCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){

	

	console.log($routeParams.contactID);
	$http.get('/contactlist/' + $routeParams.contactID).success(function(response){
		$scope.contactInfo = response;
		console.log($scope.contactInfo);

	});

	$scope.addAppointment = function(id){
		console.log(id);
		console.log("entro al addAppoint");
		console.log($scope.contactInfo.newAppointment);
		$http.put('/contactlist/addAppointment/' + id, $scope.contactInfo).success(function(response){
			$scope.successMessage = "Horario Agregado correctamente";
		});
		
/*		$http.get('/contactlist/' + id).success(function(response){
			$scope.contactInfo = response;	
		});	*/
	};

	$scope.deleteAppointment = function(id){

		console.log(id);
		$http.delete('/contactlist/deleteAppointment/' + id, $scope.contactInfo).success(function(response){

		});
	};

}]);

   
    
