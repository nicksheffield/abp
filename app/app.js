angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
angular.module('app.models', []);
angular.module('app.services', []);
angular.module('app.routes', []);

angular.module('app', [
	'ngResource',
	'ngSanitize',
	'ui.router',

	'app.controllers',
	'app.directives',
	'app.filters',
	'app.models',
	'app.services',
	'app.routes'
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ['app']);
});

