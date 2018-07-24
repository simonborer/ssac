const gulp = require('gulp');
const $    = require('gulp-load-plugins')();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const uncss = require('postcss-uncss');
const cssnano = require('cssnano');

gulp.task('prod', function () {
    var plugins = [
        uncss({
            html: ['public/**/*.html']
        }),
        cssnano()
    ];
    return gulp.src('./src/assets/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/assets'));
});

gulp.task('sass', function() {
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch(['./src/assets/scss/**/*.scss'], ['sass']);
});