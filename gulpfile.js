var gulp = require('gulp');
var jade = require('gulp-jade');
var nano = require('gulp-cssnano');
var stylus = require('gulp-stylus');
var tinypng = require('gulp-tinypng');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    },
  })
})


//compile stylus, remove styles, minify css
gulp.task('nano', function() {
    return gulp.src('dev/styl/main.styl')
    	.pipe(stylus())
        .pipe(nano())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('stylus', function () {
  gulp.src('dev/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
//images optimization
gulp.task('tinypng', function () {
    gulp.src('dev/images/*.*')
        .pipe(cache(tinypng('r32JegWUnlIuNsW4fU5Xtn8iyfNyEolG')))
        .pipe(gulp.dest('dist/images/'));
});

//gulp.task('stylus', function () {
  //gulp.src('dev/styl/main.styl')
    //.pipe(stylus())
    //.pipe(gulp.dest('dist/css/'))
//});

//jade compilation
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src('dev/jade/pages/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('watch', ['stylus', 'browserSync', 'tinypng', 'jade'], function (){
  gulp.watch('dev/images/*.*', ['tinypng']);
  gulp.watch('dev/styl/main.styl', ['stylus']);
  gulp.watch('dev/jade/pages/*.jade', ['jade']);
});