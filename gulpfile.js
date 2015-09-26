var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

gulp.task('default', ['serve', 'watch']);

gulp.task('watch', ['build'], function() {
  gulp.watch('app.js', ['build']);  
  gulp.watch(['./pub/*.*', './modules/*.*'], ['reload']);
});

gulp.task('build', function() {
    return browserify('./app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
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
  gulp.src('./pub/*.*')
    .pipe(connect.reload());
});
