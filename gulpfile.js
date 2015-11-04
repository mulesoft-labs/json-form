// plugins
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');

// build
gulp.task('default', function(){

  // compile less
  gulp.src('./src/json-form.less')
  	.pipe(less())
  	.pipe(autoprefixer())
  	.pipe(cssmin())
    .pipe(gulp.dest('dist'));

  // convert html to js
  gulp.src(['./src/template.js', './src/json-form.js'])
    .pipe(concat('json-form.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// template
gulp.task('template', function () {

  // convert html to js
  gulp.src('./src/json-form.html')
    .pipe(html2js({
      outputModuleName: 'json-form.template'
    }))
    .pipe(concat('template.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src'));
});

// watch and rebuild
gulp.task('watch', function () {
   gulp.watch('./src/*.*', ['template', 'default']);
});
