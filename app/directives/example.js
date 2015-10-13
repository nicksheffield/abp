angular.module('app.directives')

.directive('example', function(){
	function link(scope, el, attrs){
		
	}

	return {
		restrict: 'EA',
		scope: {
			'example': '='
		},
		link: link
	}
})