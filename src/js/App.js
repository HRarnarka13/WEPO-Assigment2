var ChatClient = angular.module('ChatClient', ['ngRoute']);

ChatClient.config(
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'src/Views/login.html', controller: 'LoginController' })
			.when('/rooms/:user/', { templateUrl: 'src/Views/rooms.html', controller: 'RoomsController' })
			.when('/room/:user/:room/', { templateUrl: 'src/Views/room.html', controller: 'RoomController' })
			.otherwise({
	  			redirectTo: '/login'
			});
	}
);

ChatClient.controller('LoginController', function ($scope, $location, $rootScope, $routeParams, socket) {
	
	$scope.errorMessage = '';
	$scope.nickname = '';

	$scope.login = function() {			
		if ($scope.nickname === '') {
			$scope.errorMessage = 'Please choose a nick-name before continuing!';
		} else {
			socket.emit('adduser', $scope.nickname, function (available) {
				if (available) {
					$location.path('/rooms/' + $scope.nickname);

				} else {
					$scope.errorMessage = 'This nick-name is already taken!';
				}
			});			
		}
	};
});

ChatClient.controller('RoomsController', function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.errorMessage = '';
	$scope.rooms = ['Room 1','Room 2','Room 3','Room 4','Room 5'];
	$scope.createNewRoom = function() {
		$scope.newRoom = {
			room : 'GreenRoom',
			pass : undefined
		};
		socket.emit('joinroom', $scope.newRoom, function (success, reason) {
			if (!success) {
				$scope.errorMessage = reason;
			} else {
				console.log($scope.newRoom.room);
				$location.path('/room/' + $routeParams.user + '/' + $scope.newRoom.room);
			}

		});
	}

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

ChatClient.controller('RoomController', function ($scope, $location, $rootScope, $routeParams, socket) {
	$scope.currentRoom = $routeParams.room;
	$scope.currentUser = $routeParams.user;
	$scope.currentUsers = [];
	$scope.errorMessage = '';

	socket.on('updateusers', function (roomName, users, ops) {
		// TODO: Check if the roomName equals the current room !
		$scope.currentUsers = users;
	});		

	socket.emit('joinroom', $scope.currentRoom, function (success, reason) {
		if (!success) {
			$scope.errorMessage = reason;
		}
	});
});