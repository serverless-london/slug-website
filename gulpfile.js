var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var uncss = require('gulp-uncss');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
/*
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
*/
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('./dist/assets/')
    ],
    cb
  );
});

gulp.task('bundle-css',function(){
  return gulp.src('./src/css/*.css')
    .pipe(concat('slug.css'))
    .pipe(uncss({
            html: ['./src/*.html']
        }))
    .pipe(nano())
    .pipe(gulp.dest('./dist/assets/'));
});

 
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('copy', function(){
  return gulp.src(['src/data/config.json'])
    .pipe(gulp.dest('./dist/templates/'));
});

gulp.task('templates', function(){
  gulp.src(['src/hbs/*.hbs'])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(handlebars({handlebars: require('handlebars')}))
    .pipe(defineModule('node'))
    .pipe(gulp.dest('./dist/templates/'));
});

gulp.task('build',['templates','compress','copy','bundle-css']);

gulp.task('build-dev',['minify','compress','copy','bundle-css'])
