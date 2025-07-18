const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Paths
const paths = {
  styles: {
    src: 'src/styles/scss/**/*.scss',
    dest: 'src/styles/css/'
  },
};

// Compile SCSS → CSS + autoprefix + minify
function compileStyles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Watch for changes
function watch() {
  gulp.watch(paths.styles.src, compileStyles);
}

// Default task (run both)
const build = gulp.parallel(compileStyles);

// Exports
module.exports = {
  default: build,
  styles: compileStyles,
  watch
};