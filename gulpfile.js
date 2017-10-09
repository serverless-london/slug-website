var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var uncss = require('gulp-uncss');

 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('bundle-css',function(){
  return gulp.src('./src/css/*.css')
    .pipe(concat('main.css'))
    .pipe(uncss({
            html: ['./src/*.html']
        }))
    .pipe(nano())
    .pipe(gulp.dest('./dist/'));
});

 
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function(){
  return gulp.src(['src/_redirects','src/*.xml'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build',['minify','compress','copy','bundle-css']);

