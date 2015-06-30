var gulp          = require('gulp');
var watch         = require('gulp-watch');
var concat        = require('gulp-concat');
var concatCss     = require('gulp-concat-css');
var uglify        = require('gulp-uglify');
var uglifycss     = require('gulp-uglifycss');
var autoprefixer  = require('gulp-autoprefixer');
var stylus        = require('gulp-stylus');
var size          = require('gulp-filesize');
var gutil         = require('gulp-util');
var es            = require('event-stream');
var del           = require('del');
var vinylPaths    = require('vinyl-paths');





gulp.task('styles', ['clean:styles'], function() {

	// this is to gracefully fail stylus
	var s = stylus();
	
	var sFail = function() {
		//gutil.log(arguments);
		
		console.log('yo!');
		s.end();
	}

	// add more gulp.src()'s as extra parameters to the es.merge() below to include ordinary css files
	var stream = es.merge(gulp.src('assets/css/style.styl').pipe(s).on('error', sFail))

	.pipe(concatCss('style.css'))

	.pipe(uglifycss())
	
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	
	.pipe(size())

	.pipe(gulp.dest('assets/dist'));
	
	return stream;
	
});





gulp.task('scripts', ['clean:scripts'], function() {
	
	var stream = gulp.src(['app/app.js', 'app/app.routes.js', 'app/**/*.js'])
	
	.pipe(concat('app.min.js'))
	
	.pipe(uglify({
		mangle: false
	}))
	
	.pipe(size())
	
	.pipe(gulp.dest('assets/dist'));
	
	return stream;
	
});





gulp.task('clean:styles', function(cb){
	
	del(['assets/dist/style.css'], cb);
	
});





gulp.task('clean:scripts', function(cb){
	
	del(['assets/dist/app.min.js'], cb);
	
});





// watch those tasks, and run them once to begin with
gulp.task('watch', function() {

	gulp.watch(['assets/css/*.styl', 'assets/css/**/*.styl'], ['styles']);
	
	gulp.watch(['app/**/*.js', 'app/*.js'], ['scripts']);

});





gulp.task('default', ['styles', 'scripts', 'watch'], function(){});

gulp.task('clean', ['clean:styles', 'clean:scripts'], function(){})