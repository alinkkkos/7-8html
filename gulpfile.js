var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin');//минификатор
var rename = require('gulp-rename');//переименовать в min.css
var notify = require('gulp-notify');//уведомления в панельке
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

//server connect
gulp.task('connect', function() {
  connect.server({
  		root: 'app',
  		livereload: true
  	});
});

gulp.task('html', function() {
	gulp.src('app/index.html')
	.pipe(connect.reload());
})

//css
gulp.task('css', function () {
  return gulp.src('css/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(prefix('last 10 versions', 'ie8', 'ie9'))
    .pipe(gulp.dest('app/css'))
    .pipe(cssmin())
  	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

//watch
gulp.task('watch', function () {
	gulp.watch('css/*.css', ['css'])
	gulp.watch('app/index.html', ['html'])
})

//default
gulp.task('default', ['connect', 'css', 'watch', 'html']);