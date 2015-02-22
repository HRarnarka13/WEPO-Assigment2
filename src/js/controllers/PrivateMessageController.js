ChatClient.controller('PrivateMessageController', [
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

	$scope.getUsers = function () {
		socket.emit('users');
		console.log("get users");
		socket.on('userlist', function (userlist) {
			$scope.users = userlist;
		});
	};

	$scope.startChat = function (user) {
		$scope.friend = user;
	};

	$scope.sendPrivateMessage = function (user, message) {
		$scope.privateMessage = '';
		$scope.privateMessages.push(message);
		console.log("To: " + user + " Message: " + message);
		socket.emit('privatemsg', {nick: user, message: message}, function(sent) {
			if (sent) {
				console.log("private message sent");
			}
		});
	};

	 socket.on('recv_privatemsg', function(friend, message) {
	 	$scope.recvMessage = message;
	 });

}]);