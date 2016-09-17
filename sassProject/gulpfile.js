var gulp = require("gulp"),
jshint = require('gulp-jshint'),
sassRuby = require('gulp-ruby-sass'),
sourcemaps = require('gulp-sourcemaps'),
sass = require('gulp-sass'),
webserver = require('gulp-webserver');

gulp.task('copyHTML',function(){
	gulp.src("src/*.html").pipe(gulp.dest("dest"));
});

gulp.task('copyImages',function(){
	gulp.src("src/images/*.*").pipe(gulp.dest("dest/images"));
	gulp.src("src/lib/fonts/awesome/css/*.min.css").pipe(gulp.dest("dest/lib/glyphicons"));
	gulp.src("src/lib/fonts/awesome/fonts/*.*").pipe(gulp.dest("dest/lib/fonts"));
});

gulp.task('copyJS',function(){
	gulp.src("src/js/*.*").pipe(gulp.dest("dest/js"));
});

gulp.task('copy',['copyHTML','copyImages','copyJS'],function(){
	// before executing this please check dependencies
	// Please execute copyHTML and copyJS in sequence
});

gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css/'));
});

// gulp.task('webserver', function() {
//     gulp.src('dest/')
//         .pipe(webserver({
//             livereload: true,
//             open: true
//         }));
// });

gulp.task('jshint', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass-ruby', function () {
    return sass('src/scss/style.scss', {
      sourcemap: true,
      style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dest/css/'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*', ['jshint']);
  gulp.watch(['src/scss/**/*'], ['sass']);
  gulp.watch(['src/images/*.*'], ['copyImages']);
  gulp.watch(['src/*.html'], ['copyHTML']);
});

gulp.task('webserver', function() {
    gulp.src('./dest')
        .pipe(webserver({
          host:process.env.IP,
          port:process.env.PORT,
          livereload: {
            port: 8082,
            enable: true,
            directoryListing: true,
            open: true
            
          }
          
        }));
});

// livereload: {
//   filter: function(fileName) {
//     if (fileName.match(/.css$/)) {
//       return true;
      
//     } else {
//       return false;
      
//     }
    
//   }


gulp.task('default', ['watch', 'copy','sass','webserver']);
