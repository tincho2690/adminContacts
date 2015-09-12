angular.module('MyApp')
.controller('AppointmentCtrl',['$scope', '$http','$routeParams', function($scope,$http,$routeParams){

	console.log($routeParams.contactID);
	$http.get('/singleContact/' + $routeParams.contactID).success(function(response){
		$scope.contactInfo = response;
		console.log($scope.contactInfo);

	});

	$scope.addAppointment = function(id){
		
		console.log("entro al addAppoint");
		
		$http.put('/addAppointment/' + id, $scope.contactInfo).success(function(response){
			$scope.successMessage = "Horario Agregado correctamente";
		});
		
	};

	$scope.deleteAppointment = function(appointmentId, contactId){

		console.log(appointmentId);
		console.log($scope.contactInfo._id);
		console.log($scope.contactInfo.appointments);
		$http.delete('/deleteAppointment/' + appointmentId + contactId, $scope.contactInfo).success(function(response){

		});
	};

}]);