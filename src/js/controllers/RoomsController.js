ChatClient.controller('RoomsController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.currentUser = $routeParams.user;
	//ENTER has the same function as the button "Create"
	$(window).keypress(function(e){
		if(e.keyCode == 13){
			$scope.joinRoom();
		}
	});
	$scope.errorMessage = '';

	socket.emit("rooms", function () {
		console.log("inni rooms socket");
	});

	socket.on("roomlist", function(roomList) {
		console.log("inni roomlist socket");
		console.log(Object.keys(roomList));
		$scope.rooms = Object.keys(roomList);
	});

	$scope.joinRoom = function(roomName) {
		console.log('joinRoom');
		if (roomName === undefined) {
			if ($scope.roomName === '' || $scope.roomName === undefined) {
				$scope.errorMessage = 'room name is empty!';
				return;
			} else {
				$scope.currentRoom = $scope.roomName;
			}
		} else {
			$scope.currentRoom = roomName;
		}
		socket.emit('joinroom', {room: $scope.currentRoom, pass: ''}, function (success, reason) {
			if (!success) {
				$scope.errorMessage = reason;
			} else {
				$location.path('/room/' + $scope.currentUser + '/' + $scope.currentRoom);
			}
		});
	};
}]);