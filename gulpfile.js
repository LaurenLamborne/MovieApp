gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
beautify = require('gulp-beautify'),
ngAnnotate = require('gulp-ng-annotate'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
sass = require('gulp-ruby-sass'),
minifycss = require('gulp-minify-css'),
autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  return sass('./public/scss/**/*.scss', {style: 'expanded'})
  .pipe(autoprefixer("last 2 version"))
  .pipe(gulp.dest('./dist/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./dist/css'))
  .pipe(notify({message: "SASS compiled"}));
});

gulp.task('scripts', function() {
  return gulp.src('./public/javascript/**/*.js')
  .pipe(concat('jsBundle.js'))
  .pipe(beautify({indentSize: 4, indentChar: ' '}))
  .pipe(gulp.dest('./dist/js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
  .pipe(notify({message: "Minified JS and Bundled."}));
});

gulp.task('watch', function() {
  gulp.watch('./public/javascript/**/*.js', ['scripts']);
});
