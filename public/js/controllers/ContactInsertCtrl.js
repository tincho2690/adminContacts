angular.module('MyApp')
.controller('ContactInsertCtrl',['$scope', '$http', function($scope,$http){
	    
   
        $scope.addContact = function(){
    	   	
    	   	console.log("entroooo");
    	   	console.log($scope.contact);
 	   	
	   		$http.get('/contactExists/'+ $scope.contact.dni ,$scope.contact).success(function(response){
	   				
	   			console.log(response);
	   			console.log(response.length == 0);
	   			if (response.length === 0){
	   				
	   				console.log("entro al if del que no existe")

	   					$http.post('/contactInsert', $scope.contact).success(function(response){
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
	   	}
    }	
]);
