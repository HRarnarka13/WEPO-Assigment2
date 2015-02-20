ChatClient.controller('RoomsController', 
function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.currentUser = $routeParams.user;
	//ENTER has the same function as the button "Create"
	$(window).keypress(function(e){
		if(e.keyCode == 13){
			$scope.createNewRoom();
		}
	});
	
	$scope.errorMessage = '';
	// $scope.rooms = ['Room 1','Room 2','Room 3','Room 4','Room 5'];
	$scope.createNewRoom = function() {
		if ($scope.roomName === '') {
			return;
		}
		$scope.newRoom = {
			room : $scope.roomName,
			pass : undefined
		};
		socket.emit('joinroom', $scope.newRoom, function (success, reason) {
			if (!success) {
				$scope.errorMessage = reason;
			} else if ($scope.roomName !== "undefined") {
				$location.path('/room/' + $scope.currentUser + '/' + $scope.roomName);
			}

		});
	};
	socket.emit("rooms", function () {
		console.log("inni rooms socket");
	});

	socket.on("roomlist", function(roomList) {
			console.log("inni roomlist socket");
			console.log(Object.keys(roomList));
			$scope.rooms = Object.keys(roomList);
	});

	// console.log($scope.rooms);
	// //socket.on('rooms', function () {
	// $scope.getRooms = function () {
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
	// };
	// $scope.getRooms();
	// $scope.rooms = ['Room 1','Room 2','Room 3','Room 4','Room 5'];
});