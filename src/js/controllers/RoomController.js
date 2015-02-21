ChatClient.controller('RoomController',
function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.messageHistory = [];
	$scope.errorMessage = '';

	$scope.sendMessage = {
		roomName: $scope.currentRoom,
		msg: $scope.message
	};

	$scope.newRoom = {
			room : $scope.currentRoom,
			pass : undefined
	};

	console.log("$scope.sendMessage: " + $scope.sendMessage);

	$scope.sendMsg = function(){
		$scope.sendMessage.msg = $scope.message;
		console.log("Message: " + $scope.sendMessage.msg);
		socket.emit('sendmsg', $scope.sendMessage, function (message){

		});
		$scope.getMessages();
		// socket.emit('addMessage', $scope.message, function (Message){
		// });
	};

	$scope.backToRooms = function(){
		$location.path('/rooms/' + $scope.nickname);
	};

	socket.emit('joinroom', $scope.newRoom, function (success, reason) {
		if (!success) {
			$scope.errorMessage = reason;
		}
	});

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		console.log("updateusers: " + users);
		$scope.currentUsers = users;
	});

	socket.on('updatechat', function (roomName, messages) {
		console.log("updatechat, messages");
		console.log(messages);
		$scope.$apply = function () {
			for (var i = messages.length - 1; i >= 0; i--) {
				$scope.messageHistory.push(messages[i].message);
			};
		}
		console.log("scope.messageHistory");
		console.log($scope.messageHistory);
	});

	// $scope.getMessages = function () {
	// 	socket.emit("rooms", function() {
	// 		console.log("inni rooms socket");
	// 	});
	// };

	// socket.on("roomlist", function(roomList) {
	// 	console.log(roomList);
	// 	$scope.messageHistory = roomList.lobby.messageHistory;
	// 	console.log('Message History: ');
	// 	console.log($scope.messageHistory);
	// });

	/*socket.emit('joinroom', $scope.currentRoom, function (success, reason) {
		if (!success) {
			$scope.errorMessage = reason;
		}
	});*/
});