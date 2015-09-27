var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');

gulp.task('default', ['serve', 'watch']);

gulp.task('watch', ['build', 'lint'], function() {
  gulp.watch(['app.js', './modules/*.*'], ['build']);  
  gulp.watch(['./pub/*.*'], ['reload', 'lint']);
});

gulp.task('build', function() {
    return browserify('./app.js')
        .bundle()
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./pub/'));
});

gulp.task('serve', function () {
  connect.server({
    root: 'pub',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./pub/*.*', './modules/*.*'])
    .pipe(connect.reload());
});

gulp.task('lint', function () {
  return gulp.src(['./modules/*.js', './app.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
});
