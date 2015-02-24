angular.module("ChatClient").controller('PrivateMessageController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {

	$scope.users = [];
	$scope.currentUser = '';
	$scope.privateMessage = '';
	$scope.privateMessages = [];
	$scope.friends = [];

	// Get all a list of all online user
	socket.on('userlist', function (userlist) {
		$scope.users = userlist;			
	});

	// 
	$scope.getUsers = function () {
		$scope.currentUser = $routeParams.user;
		socket.emit('users');
	};

	$scope.startChat = function (user) {
		findFriend(user);
	};

	// Returns the given friend message history in the list of friends
	// if the friend is not found we create a new friend object and add
	// it to the list
	function findFriend(friend) {
		for (var i = $scope.friends.length - 1; i >= 0; i--) {
			if ($scope.friends[i].name === friend) {
				return $scope.friends[i];
			}
		}
		var newFriend = {
			name: friend, msgHistory: []
		};
		$scope.friends.push(newFriend);
		return newFriend;
	}

	$scope.sendPrivateMessage = function (user, message) {
		var currFriend = findFriend(user);
		currFriend.msgHistory.push({"msg" :message, "friend" :"Me"});

		socket.emit('privatemsg', {nick: user, message: message}, function(sent) {
			if (sent) {
				console.log("private message sent");
			}
		});
		$scope.privateMessage = '';

	};

	socket.on('recv_privatemsg', function(friend, message) {
	 	$scope.privateMessage = '';
	 	var currFriend = findFriend(friend);
		currFriend.msgHistory.push({"msg" :message, "friend" :currFriend.name});
	});
}]);