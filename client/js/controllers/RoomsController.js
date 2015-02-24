angular.module("ChatClient").controller('RoomsController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {

	$scope.currentUser = $routeParams.user;
	$scope.errorMessage = '';

	socket.emit("rooms");

	// Get list of active rooms
	socket.on("roomlist", function(roomList) {
		$scope.rooms = Object.keys(roomList);
	});

	// Join a given room, if the roomName is undefined the user is creating a new room
	$scope.joinRoom = function(roomName) {

		if (roomName === undefined) {
			if ($scope.roomName === '' || $scope.roomName === undefined) {
				$scope.errorMessage = 'room name is empty!';
				return;
			} else {
				// set currentRoom the new given room in input field
				$scope.currentRoom = $scope.roomName;
			}
		} else {
			// set currentRoom from the given parameter
			$scope.currentRoom = roomName;
		}
		socket.emit('joinroom', {room: $scope.currentRoom, pass: ''}, function (success, reason) {
			if (!success) {
				$scope.errorMessage = reason;
			} else {
				socket.emit("rooms");
				$location.path('/room/' + $scope.currentUser + '/' + $scope.currentRoom);
			}
		});
	};
}]);