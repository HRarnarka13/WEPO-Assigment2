ChatClient.controller('RoomController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.currentmessages = [];
	$scope.errorMessage = '';

	$scope.sendMsg = function(){
		socket.emit('sendmsg', {
			roomName: $scope.currentRoom, 
			msg: $scope.newMessage
		}, function (message) {});
		$scope.newMessage = '';
	};

	$scope.backToRooms = function(){
		$location.path('/rooms/' + $scope.currentUser);
	};

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		console.log("updateusers: ");
		console.log(users);
		if (roomName === $scope.currentRoom) {
			$scope.currentUsers = users;
		}
		console.log($scope.currentUsers);
	});

	socket.on('updatechat', function (roomName, messages) {
		$scope.currentmessages = messages;
		console.log("scope.currentmessages");
		console.log($scope.currentmessages)
	});

}]);