ChatClient.controller('LoginController',
function ($scope, $location, $rootScope, $routeParams, socket) {
	
	$scope.errorMessage = '';
	$scope.nickname = '';

	//Enter has the same function as the button "Enter chat"
	$(window).keypress(function(e){
		if(e.keyCode == 13){
			$scope.login();
		}
	});

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