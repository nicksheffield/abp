angular.module('app.routes')

.config(function($routeProvider) {

	$routeProvider
	
		.when('/', {
			controller: 'mainCtrl',
			templateUrl: 'views/example.html'
		})
		
		.otherwise({
			redirectTo: '/'
		})
});