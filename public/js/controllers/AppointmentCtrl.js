angular.module('MyApp')
.controller('AppointmentCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){

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

	$scope.deleteAppointment = function(appointmentId, contactId){

		console.log(appointmentId);
		console.log($scope.contactInfo._id);
		console.log($scope.contactInfo.appointments);
		$http.delete('/contactlist/deleteAppointment/' + appointmentId + contactId, $scope.contactInfo).success(function(response){

		});
	};

}]);