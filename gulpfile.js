const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');
// assets
const cssPath = 'src/css/**/*.css';
const { version } = require('./package.json');

function cssTask() {
  return src(cssPath)
    .pipe(sourcemaps.init())
    .pipe(concat(`sugar-glider.min.v${version}.css`))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/assets/css'));
}

function watchTask() {
  watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
}

exports.cssTask = cssTask;

exports.default = series(parallel(cssTask), watchTask);
