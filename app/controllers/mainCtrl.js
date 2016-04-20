angular.module('app.controllers')

.controller('mainCtrl', function($scope, $game) {
	$scope.siteTitle = 'Horse Clicker'
	
	$scope.game = $game
})