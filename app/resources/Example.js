angular.module('app.resources')

.factory('Example', function($resource) {
	var url = '/api/example/:id'

	var defaults = {
		'id': '@id'
	}

	var methods = {
		update: {
			method: 'PUT'
		}
	}

	return $resource(url, defaults, methods)
})