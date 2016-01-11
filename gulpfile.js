var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require ('gulp-jade');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

var path

//////////////////
// Copy package.json to build folder
/////////////////
gulp.task ('move', function() {
  gulp.src ('package.json')
    .pipe(gulp.dest('./build'));
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
    .pipe(gulp.dest('./build/public'));
});

gulp.task ('templates', function() {
  gulp.src ('./src/public/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/public/templates'));
});

gulp.task('babel', function() {
	gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('watch', ['styles', 'index_page', 'templates', 'babel'], function(){
  gulp.watch('./src/**/*.styl', ['styles']);
  gulp.watch('./src/**/*.jade', ['index_page', 'templates']);
  gulp.watch('./src/**/*.js', ['babel']);
});

gulp.task('develop', function () {
  nodemon({ script: './build/server.js'
          , ext: 'html js'
          , delay: 3500
         })
    .on('restart', function () {
      console.log('restarted!')
    })
})


gulp.task('default', ['develop', 'watch']);
