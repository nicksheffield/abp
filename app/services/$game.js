angular.module('app.services')

.factory('$game', function($interval) {
	var service = {
		money: 0,
		types: {
			foot: {
				baseGain: 1
			},
			horse: {
				count: 0,
				baseCost: 10,
				baseGain: 1
			},
			unicorn: {
				count: 0,
				baseCost: 100,
				baseGain: 5
			},
			cheetah: {
				count: 0,
				baseCost: 1000,
				baseGain: 20
			},
		},
		cost: function(type) {
			return service.types[type].baseCost +
				service.types[type].count * 3 * 
					service.types[type].count
		},
		run: function(type) {
			var thing = service.types[type]
			
			if(type == 'foot') {
				service.addMoney(thing.baseGain)
			} else {
				service.addMoney(thing.count * thing.baseGain / 100)
			}
		},
		buy: function(type) {
			if(service.money >= service.cost(type)) {
				service.money -= service.cost(type)
				service.types[type].count += 1
			}
		},
		addMoney: function(amount) {
			service.money += amount
		}
	}
	
	$interval(function() {
		service.run('horse')
		service.run('unicorn')
		service.run('cheetah')
	}, 10)

	return service
})