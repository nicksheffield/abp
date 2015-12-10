// jshint asi: true
var gulp          = require('gulp')                         // the main guy
var clone         = require('gulp-clone')                   // used to fork a stream
var order         = require('gulp-order')                   // reorder files in stream
var watch         = require('gulp-watch')                   // run tasks on file change
var uglify        = require('gulp-uglify')                  // minify js
var rename        = require('gulp-rename')                  // rename file
var concat        = require('gulp-concat')                  // merge files together
var stylus        = require('gulp-stylus')                  // turn stylus code into css
var notify        = require('gulp-notify')                  // OS-level notifications
var addsrc        = require('gulp-add-src')                 // mid-stream gulp.src()
var plumber       = require('gulp-plumber')                 // handle errors without crashing
var sourcemap     = require('gulp-sourcemaps')              // write sourcemaps
var minifycss     = require('gulp-minify-css')              // minify css code
var annotate      = require('gulp-ng-annotate')             // safely minify angular
var beautify      = require('gulp-cssbeautify')             // make files human readable
var autoprefix    = require('gulp-autoprefixer')            // prefix any css with low support
var combinemq     = require('gulp-combine-media-queries')   // move all media queries to the end
var templateCache = require('gulp-angular-templatecache')   // cache angular template files

var paths = {
	stylus: {
		watch: ['assets/styl/*.styl', 'assets/styl/**/*.styl'],
		main: 'assets/styl/style.styl'
	},
	angular: {
		files: ['app/*.js', 'app/**/*.js'],
		watch: ['app/*.js', 'app/**/*.js', 'app/**/*.html'],
		views: 'app/**/*.html'
	},
	libs: [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/angular/angular.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-sanitize/angular-sanitize.min.js',
		'bower_components/lodash/lodash.min.js'
	],
	output: 'assets/dist/'
}

var settings = {
	plumber: {
		errorHandler: notify.onError("Error: <%= error.message %>")
	},
	tpl: {
		module: 'app.views'
	}
}

gulp.task('angular', function() {
	var stream = gulp.src(paths.angular.views)              // grab all the html views
		.pipe(plumber(settings.plumber))                    // stop any errors from breaking a watch
		.pipe(templateCache('views.js', settings.tpl))      // make a template cache from them
		.pipe(addsrc(paths.angular.files))                  // add the rest of the angular app
		.pipe(order(['app.js']))                            // make sure app.js is first
		.pipe(annotate())                                   // make angular callbacks minifyable
		.pipe(uglify())                                     // minify the code
		.pipe(concat('app.min.js'))                         // merge them all into the same file
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
		
	return stream
})

gulp.task('libs', function() {
	var stream = gulp.src(paths.libs)                       // grab all the libs
		.pipe(concat('libs.min.js'))                        // merge them all into the same file
		.pipe(uglify())                                     // minify the code
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('stylus', function(){
	// prepare css code
	var stream = gulp.src(paths.stylus.main)                // grab our stylus file
		.pipe(plumber(settings.plumber))                    // notify us if any errors appear
		.pipe(sourcemap.init())                             // get ready to write a sourcemap
		.pipe(stylus())                                     // turn the stylus into css
		.pipe(combinemq())                                  // put all the media queries at the bottom
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(autoprefix('last 2 versions'))                // autoprefix the css code
	
	// make style.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(beautify())                                   // make css really readable
		.pipe(rename('style.css'))                          // make the filename style.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	// make style.min.css
	stream.pipe(clone())                                    // make a copy of the stream up to autoprefix
		.pipe(minifycss())                                  // minify it (removes the sourcemap)
		.pipe(sourcemap.write())                            // write the sourcemap
		.pipe(rename('style.min.css'))                      // make the filename style.min.css
		.pipe(gulp.dest(paths.output))                      // save it into the dist folder
	
	return stream
})

gulp.task('watch', ['angular', 'stylus'], function() {
	watch(paths.angular.watch, function() {
		gulp.start('angular')
	})
	
	watch(paths.stylus.watch, function() {
		gulp.start('stylus')
	})
})

gulp.task('default', ['libs', 'angular', 'stylus'])