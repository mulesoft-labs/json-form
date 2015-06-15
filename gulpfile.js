// plugins
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');

// build
gulp.task('default', function(){

	// copy html
  gulp.src('./src/json-form.html')
    .pipe(gulp.dest('dist'));

  // compile less
  gulp.src('./src/json-form.less')
  	.pipe(less())
  	.pipe(autoprefixer())
  	.pipe(cssmin())
    .pipe(gulp.dest('dist'));

  // minify js
  gulp.src('./src/json-form.js')
  	.pipe(uglify())
    .pipe(gulp.dest('dist'));

});

// watch and rebuild
gulp.task('watch', function () {
   gulp.watch('./src/*.*', ['default']);
});