angular.module("ChatClient").controller('RoomController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
	'$timeout',
function ($scope, $location, $rootScope, $routeParams, socket, $timeout) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.currentmessages = [];
	$scope.errorMessage = '';
	$scope.infoMessage = '';
	$scope.currentOps = [];

	$scope.isOp = function () {
		console.log("currentOp", $scope.currentOps);

		//return $scope.currentOps.some(item => item == user);
		for (var key in $scope.currentOps) {
			if ($scope.currentOps.hasOwnProperty(key) && key === $scope.currentUser) {
				return true;
			}
		}
		return false;
	};

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

	$scope.partRoom = function (roomName) {
		socket.emit('partroom', roomName);
		$scope.backToRooms();
	};

	$scope.kickUser = function (user) {
		socket.emit('kick', {user: user, room: $scope.currentRoom}, function (kicked) {
			if (kicked) {
				console.log("user was kicked");
				if (user === $scope.currentUser) {
					$scope.backToRooms();
				}
			} else {
				console.log("user was not kicked");
				$scope.errorMessage = "You have no right to kick someone out";
			}
		});
	};

	socket.on('kicked', function (roomName, kickedUser, ops) {
		if (roomName === $scope.currentRoom && kickedUser === $scope.currentUser) {
			$scope.backToRooms();
		} else {
			$scope.infoMessage = kickedUser + " has been kicked out by " + ops;
			$timeout(function () {
				$scope.infoMessage = "";
			}, 5000);  
		}
	});

	$scope.banUser = function (user) {
		socket.emit('ban', {user: user, room: $scope.currentRoom}, function (banned) {
			if (banned) {
				console.log("user was banned");
				if (user === $scope.currentUser) {
					$scope.backToRooms();
				}
			} else {
				console.log("user was not banned");
				$scope.errorMessage = "You have no right to ban someone";
			}
		});
	};

	socket.on('banned', function (roomName, bannedUser, ops) {
		if (roomName === $scope.currentRoom && bannedUser === $scope.currentUser) {
			$scope.backToRooms();
		} else {
			$scope.infoMessage = bannedUser + " has been banned by " + ops;
			$timeout(function () {
				$scope.infoMessage = "";
			}, 5000);  
		}
	});

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		console.log("ops: " + Object.keys(ops));
		console.log(ops);
		if (roomName === $scope.currentRoom) {
			$scope.currentUsers = users;
			$scope.currentOps = ops;
		}
	});

	socket.on('updatechat', function (roomName, messages) {
		if ($scope.currentRoom === roomName) {
			$scope.currentmessages = messages;
			console.log("scope.currentmessages");
			console.log($scope.currentmessages);
		}
		var element = document.getElementById("autoscroll");
	    element.scrollTop = element.scrollHeight;
	});

}]);