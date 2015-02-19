ChatClient.controller('RoomsController', 
function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms

	//ENTER has the same function as the button "Create"
	$(window).keypress(function(e){
			if(e.keyCode == 13){
				$scope.createNewRoom();
			}
		});
	
	$scope.errorMessage = '';
	$scope.rooms = ['Room 1','Room 2','Room 3','Room 4','Room 5'];
	$scope.createNewRoom = function() {
		$scope.newRoom = {
			room : undefined,
			pass : undefined
		};
		socket.emit('joinroom', $scope.newRoom, function (success, reason) {
			$scope.newRoom.room = $scope.roomName;
			if (!success) {
				$scope.errorMessage = reason;
			} else {
				$location.path('/room/' + $routeParams.user + '/' + $scope.newRoom.room);
			}

		});
	};

	// socket.on('rooms', function () {
	// 	socket.emit('roomlist', $scope.rooms, function (availableRooms) {
	// 		console.log("inni rooms socket");

	// 		$scope.$apply(function(){
	// 			if (availableRooms) {
	// 				console.log(availableRooms);
	// 				$scope.rooms = availableRooms;
	// 			} else {
	// 				console.log("no rooms");
	// 				$scope.errorMessage = "There are no available rooms";
	// 			}
	// 		});
	// 	});
	// });
	// $scope.rooms = ['Room 1','Room 2','Room 3','Room 4','Room 5'];
});