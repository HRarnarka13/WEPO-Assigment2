angular.module("ChatClient").controller('PrivateMessageController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {
	console.log("private");
	$scope.users = [];
	$scope.privateMessage = '';
	$scope.privateMessages = [];
	$scope.friends = [];
	socket.on('userlist', function (userlist) {
		$scope.users = userlist;			
		console.log($scope.users);
	});

	$scope.getUsers = function () {
		$scope.currentUser = $routeParams.user
		console.log("currentUser ", $scope.currentUser);
		socket.emit('users');
		console.log("get users");
	};

	$scope.startChat = function (user) {
		findFriend(user);
		console.log("startChat " + user);
	};

	function findFriend(friend) {
		for (var i = $scope.friends.length - 1; i >= 0; i--) {
			if ($scope.friends[i].name === friend) {
				console.log("findFriend " + $scope.friends[i]);
				return $scope.friends[i];
			}
		}
		var newFriend = {
			name: friend, msgHistory: []
		};
		$scope.friends.push(newFriend);
		console.log("newFriend " + newFriend);
		return newFriend;
	}

	$scope.sendPrivateMessage = function (user, message) {
		console.log("pri" + $scope.privateMessage);
		console.log($rootScope);
		var currFriend = findFriend(user);
		console.log(currFriend);
		currFriend.msgHistory.push({"msg" :message, "friend" :"Me"});
		console.log("To: " + user + " Message: " + message);
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
	 	console.log("currFriend " + currFriend);
		currFriend.msgHistory.push({"msg" :message, "friend" :currFriend.name});
	 });
}]);