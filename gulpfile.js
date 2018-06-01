'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  reporter = require('postcss-reporter'),
  scss = require('postcss-scss'),
  browserSync = require('browser-sync').create(),
  pxtorem = require('postcss-pxtorem'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  env = process.env.NODE_ENV || 'development',
  folder = {
    src: 'src/',
    build: 'dist/'
  };

// html
gulp.task('html', function() {
  let out = folder.build;

  return gulp.src(folder.src + '**/*.html').pipe(gulp.dest(out));
});

// CSS options
const sassOptions = {
    outputStyle: 'nested',
    precision: 3,
    errLogToConsole: true
  },
  processors = [
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    pxtorem({
      replace: true,
      propList: [
        'font',
        'font-size',
        'line-height',
        'letter-spacing',
        'margin',
        'margin-left',
        'margin-right',
        'margin-top',
        'margin-bottom',
        'padding',
        'padding-left',
        'padding-right',
        'padding-top',
        'padding-bottom',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'top',
        'bottom',
        'left',
        'right'
      ]
    }),
    mqpacker
  ];

// CSS Task
gulp.task('css', () => {
  let out = folder.build + 'css';
  return gulp
    .src(folder.src + 'scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .on('error', sass.logError)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(out))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'css'], function() {
  browserSync.init({
    server: folder.build
  });

  gulp.watch(folder.src + 'scss/**/*', ['css']);
  gulp
    .watch(folder.src + '**/*.html', ['html'])
    .on('change', browserSync.reload);
});

// Tasks
gulp.task('run', ['html', 'css']);

gulp.task('default', ['run', 'serve']);
