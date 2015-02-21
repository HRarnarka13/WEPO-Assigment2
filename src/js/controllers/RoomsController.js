ChatClient.controller('RoomsController', 
function ($scope, $location, $rootScope, $routeParams, socket) {
	// TODO: Query chat server for active rooms
	$scope.currentUser = $routeParams.user;
	//ENTER has the same function as the button "Create"
	$(window).keypress(function(e){
		if(e.keyCode == 13){
			$scope.createNewRoom();
		}
	});
	$scope.errorMessage = '';

	$scope.createNewRoom = function() {
		if ($scope.roomName === '') {
			return;
		}
		$location.path('/room/' + $scope.currentUser + '/' + $scope.roomName);
	};

	socket.emit("rooms", function () {
		console.log("inni rooms socket");
	});

	socket.on("roomlist", function(roomList) {
		console.log("inni roomlist socket");
		console.log(Object.keys(roomList));
		$scope.rooms = Object.keys(roomList);
	});
});