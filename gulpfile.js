var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus');
var jade = require ('gulp-jade');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

var path

//////////////////
// Copy package.json to build folder
/////////////////
gulp.task ('move', function() {
  gulp.src('src/public/scripts/**/*.*')
    .pipe(gulp.dest('./build/public/scripts'))
});

//////////////////
// Stylus Tasks
/////////////////
gulp.task('styles', function() {
  gulp.src('./src/public/*.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./build/public'))
});

//////////////////
// Jade Tasks
/////////////////

gulp.task ('index_page', function() {
  gulp.src ('./src/public/index.jade')
    .pipe(jade())
    .on('error', function(e){
      console.log('JADE ERROR >>>> ', e.message)
      this.emit('end')
    })
    .pipe(gulp.dest('./build/public'));
});

gulp.task ('templates', function() {
  gulp.src ('./src/public/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/public/templates'));
});

gulp.task('babel', function() {
  // add function to ignore the scripts after initial build
	gulp.src(['src/**/*.js', '!src/public/scripts/**/*.js'])
    .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
    .on('error', function(e){
      console.log("BABEL ERROR >>>> ", e.message)
      this.emit('end')
    })
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('./build'));
});
gulp.task('watch', ['styles', 'index_page', 'templates', 'babel', 'move'], function(){
  gulp.watch('./src/**/*.styl', ['styles']);
  gulp.watch('./src/**/*.jade', ['index_page', 'templates']);
  gulp.watch(['./src/**/*.js', '!src/public/scripts/**/*.js'], ['babel']);
});

gulp.task('develop', function () {
  nodemon({ script: './build/server.js'
          , ext: 'html js'
          , delay: 2000
         })
    .on('restart', function () {
      console.log('restarted!')
    })
})


gulp.task('default', ['develop', 'watch']);
