ChatClient.controller('RoomController',
function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.errorMessage = '';

	$scope.sendMessage = {
		roomName: $scope.currentRoom,
		msg: $scope.message
	}
	console.log($scope.sendMessage);

	$scope.sendMsg = function(){
		$scope.sendMessage.msg = $scope.message;
		console.log($scope.sendMessage);
		socket.emit('sendmsg', $scope.sendMessage, function (message){

		});

		// socket.emit('addMessage', $scope.message, function (Message){
		// });
	};

	$scope.backToRooms = function(){
		$location.path('/rooms/' + $scope.nickname);
	};

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		$scope.currentUsers = users;
	});		

	socket.emit("rooms", function() {
		console.log("inni rooms socket");
	});

	socket.on("roomlist", function(roomList) {
		$scope.messageHistory = roomList.lobby.messageHistory;
		console.log($scope.messageHistory);
	});

	/*socket.emit('joinroom', $scope.currentRoom, function (success, reason) {
		if (!success) {
			$scope.errorMessage = reason;
		}
	});*/
});