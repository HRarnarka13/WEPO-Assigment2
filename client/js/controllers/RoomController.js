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

	// Check if user is the op of a room
	$scope.isOp = function () {
		for (var key in $scope.currentOps) {
			if ($scope.currentOps.hasOwnProperty(key) && key === $scope.currentUser) {
				return true;
			}
		}
		return false;
	};

	// Send message in a room 
	$scope.sendMsg = function(){
		socket.emit('sendmsg', {
			roomName: $scope.currentRoom, 
			msg: $scope.newMessage
		}, function (message) {});
		$scope.newMessage = '';
	};

	// Redirect user to rooms 
	$scope.backToRooms = function(){
		$location.path('/rooms/' + $scope.currentUser);
	};

	// User leaves a room
	$scope.partRoom = function (roomName) {
		socket.emit('partroom', roomName);
		$scope.backToRooms();
	};

	// Kick user functions 

	$scope.kickUser = function (user) {
		socket.emit('kick', {user: user, room: $scope.currentRoom}, function (kicked) {
			if (kicked && user === $scope.currentUser) {
				$scope.backToRooms();
			}
		});
	};

	socket.on('kicked', function (roomName, kickedUser, ops) {
		if (roomName === $scope.currentRoom && kickedUser === $scope.currentUser) {
			$scope.backToRooms();
		} else {
			$scope.infoMessage = kickedUser + " has been kicked out by " + ops;
			removeErrorMessage(); 
		}
	});

	// Ban user functions

	$scope.banUser = function (user) {
		socket.emit('ban', {user: user, room: $scope.currentRoom}, function (banned) {
			if (banned && user === $scope.currentUser) {
				$scope.backToRooms();
			}
		});
	};

	socket.on('banned', function (roomName, bannedUser, ops) {
		if (roomName === $scope.currentRoom && bannedUser === $scope.currentUser) {
			$scope.backToRooms();
		} else {
			$scope.infoMessage = bannedUser + " has been banned by " + ops;
			removeErrorMessage();
		}
	});

	// On update functions

	socket.on('updateusers', function (roomName, users, ops) {
		if (roomName === $scope.currentRoom) {
			$scope.currentUsers = users;
			$scope.currentOps = ops;
		}
	});

	socket.on('updatechat', function (roomName, messages) {
		if ($scope.currentRoom === roomName) {
			$scope.currentmessages = messages;
		}
		// Autoscroll
		$('#autoscroll').animate({
  			scrollTop: $('#autoscroll').get(0).scrollHeight
		}, 150);
	});


	// Removes error message after 5 sec
	function removeErrorMessage () {
		$timeout(function () {
			$scope.infoMessage = "";
		}, 5000); 
	}

}]);