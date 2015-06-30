angular.module('app.models')

.factory('Example', ['$resource',
	function($resource) {
		var url = '/api/example/:id';

		var defaults = {
			'id': '@id'
		};

		var methods = {
			update: {
				method: 'PUT'
			},
			getMany: {
				method: 'GET',
				isArray: true
			}
		};

		return $resource(url, defaults, methods);
	}
]);