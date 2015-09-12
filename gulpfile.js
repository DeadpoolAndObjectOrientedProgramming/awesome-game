var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function() {
  gulp.watch('app.js', ['build']);  
});

gulp.task('build', function() {
    return browserify('./app.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'));
});
