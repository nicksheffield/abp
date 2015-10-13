angular.module('app.routes')

.config(function($routeProvider) {

	$routeProvider
	
		.when('/', {
			controller: 'mainCtrl',
			templateUrl: 'example.html'
		})
		
		.otherwise({
			redirectTo: '/'
		})
});