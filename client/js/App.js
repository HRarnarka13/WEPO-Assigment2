angular.module('ChatClient', ['ngRoute']);

angular.module('ChatClient').config(['$routeProvider',
function ($routeProvider) {
	$routeProvider
		.when('/login', { templateUrl: 'client/Views/login.html', controller: 'LoginController' })
		.when('/rooms/:user/', { templateUrl: 'client/Views/rooms.html', controller: 'RoomsController' })
		.when('/room/:user/:room/', { templateUrl: 'client/Views/room.html', controller: 'RoomController' })
		.otherwise({
  			redirectTo: '/login'
		});
}]);