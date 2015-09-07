angular.module('MyApp')
.controller('ContactInsertCtrl',['$scope', '$http', function($scope,$http){

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
