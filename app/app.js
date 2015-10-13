angular.module('app.controllers', [])
angular.module('app.directives', [])
angular.module('app.resources', [])
angular.module('app.services', [])
angular.module('app.filters', [])
angular.module('app.routes', [])
angular.module('app.views', [])

angular.module('app', [
	'ngRoute',
	'ngResource',
	'ngSanitize',

	'app.controllers',
	'app.directives',
	'app.resources',
	'app.services',
	'app.filters',
	'app.routes',
	'app.views'
])

angular.element(document).ready(function() {
	angular.bootstrap(document, ['app'])
})

