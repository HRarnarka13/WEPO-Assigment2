ChatClient.controller('PrivateMessageController', [
	'$scope',
	'$location',
	'$rootScope',
	'$routeParams',
	'socket',
function ($scope, $location, $rootScope, $routeParams, socket) {
	console.log("private");
	$scope.nick = "HAHAH";
	$scope.users = [];

	

	$scope.getUsers = function () {
		socket.emit('users');
		console.log("get users");
		socket.on('userlist', function (userlist) {
			$scope.users = userlist;
		});
	}
}]);