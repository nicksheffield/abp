var request = require('request')
var program = require('commander')
var _ = require('lodash')
var fs = require('fs')

program
	.version('0.0.1')
	.usage('[options] <type> <name>')
	.parse(process.argv)

_.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;	
var baseurl = 'https://raw.githubusercontent.com/nicksheffield/generator/master/templates/'

var dirs = {
	controller: 'app/controllers/',
	directive:  'app/directives/',
	resource:   'app/resources/',
	service:    'app/services/',
	filter:     'app/filters/'
}

var tpl = {
	controller: 'acontroller.js',
	directive:  'directive.js',
	resource:   'resource.js',
	service:    'service.js',
	filter:     'filter.js'
}

var f = []; // an array of the files to create

if(program.args.length >= 2) {
	var type = program.args[0]
	var files = program.args.slice(1)
	
	_.each(files, function(fileName) {
		if(type == 'controller')  f.push({ name: fileName, template: tpl[type] });
		if(type == 'resource')    f.push({ name: caps(fileName),    template: tpl[type] });
		if(type == 'directive')   f.push({ name: fileName,          template: tpl[type] });
		if(type == 'service')     f.push({ name: '$' + fileName,    template: tpl[type] });
		if(type == 'filter')      f.push({ name: fileName,          template: tpl[type] });
	})
	
	_.each(f, function(file) {
		var data = {
			name: file.name,
			lowerName: file.name.toLowerCase(),
			capitalizedName: caps(file.name)
		}
		
		request(baseurl + file.template, function(err, res, body) {
			fs.writeFile(
				dirs[type] + data.name + (type == 'controller' ? 'Ctrl' : '') + '.js',
				_.template(body)(data)
			)
		})
	})
}



function caps(str) {
	var split = str.split('')
	split[0] = split[0].toUpperCase()
	return split.join('')
}