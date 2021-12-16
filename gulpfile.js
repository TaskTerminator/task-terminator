var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var stylus = require('gulp-stylus')
var jade = require('gulp-jade')
var babel = require('gulp-babel')
var nodemon = require('gulp-nodemon')

//////////////////
// Copy package.json to build folder
/////////////////
gulp.task('move', function (done) {
  gulp
    .src('src/public/scripts/**/*.*')
    .pipe(gulp.dest('./build/public/scripts'))
  done()
})

//////////////////
// Stylus Tasks
/////////////////
gulp.task('styles', function (done) {
  gulp
    .src('./src/public/*.styl')
    .pipe(stylus())
    .on('error', function (e) {
      console.log('STYLUS ERROR >>>> ', e.message)
    })
    .pipe(gulp.dest('./build/public'))
  done()
})

//////////////////
// Jade Tasks
/////////////////

gulp.task('index_page', function (done) {
  gulp
    .src('./src/public/index.jade')
    .pipe(jade())
    .on('error', function (e) {
      console.log('JADE ERROR >>>> ', e.message)
    })
    .pipe(gulp.dest('./build/public'))
  done()
})

gulp.task('templates', function (done) {
  gulp
    .src('./src/public/templates/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/public/templates'))
  done()
})

gulp.task('babel', function (done) {
  // add function to ignore the scripts after initial build
  gulp
    .src(['./src/**/*.js', '!src/public/scripts/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .on('error', function (e) {
      console.log('BABEL ERROR >>>> ', e.message)
      this.emit('end')
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'))
  done()
})
gulp.task(
  'watch',
  gulp.series('styles', 'index_page', 'templates', 'babel', 'move'),
  function () {
    gulp.watch('./src/**/*.styl', ['styles'])
    gulp.watch('./src/**/*.jade', ['index_page', 'templates'])
    gulp.watch(['./src/**/*.js', '!src/public/scripts/**/*.js'], ['babel'])
  }
)

gulp.task('develop', function (done) {
  nodemon({ script: './build/server.js', ext: 'html js', delay: 2000 }).on(
    'restart',
    function () {
      console.log('restarted!')
    }
  )
  done()
})

gulp.task(
  'default',
  gulp.series(
    'babel',
    'index_page',
    'templates',
    'styles',
    'move',
    'develop',
    'watch'
  )
)
