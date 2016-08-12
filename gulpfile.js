var gulp = require('gulp');
var stylus = require('gulp-stylus');


var paths = {
  stylus:['./dev/banner2/stylus/*'],
  script: ['./dev/banner2/js/*.js'],
};

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
       .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./pro/banner2/css'));
});
gulp.task('script', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.script)
    .pipe(gulp.dest('./pro/banner2/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.script, ['script']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','stylus','script']);