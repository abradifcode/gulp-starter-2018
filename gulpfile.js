'use strict';

const gulp = require('gulp'),
  babel = require('gulp-babel'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  normalize = require('postcss-normalize'),
  reporter = require('postcss-reporter'),
  scss = require('postcss-scss'),
  browserSync = require('browser-sync').create(),
  pxtorem = require('postcss-pxtorem'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  deporder = require('gulp-deporder'),
  concat = require('gulp-concat'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  del = require('del'),
  env = process.env.NODE_ENV || 'development',
  folder = {
    src: 'src/',
    build: 'dist/'
  };

// delete build folder
gulp.task('clean', function() {
  return del.sync(folder.build);
});

// html
gulp.task('html', ['images'], () => {
  let out = folder.build;

  return gulp
    .src(folder.src + '**/*.html')
    .pipe(newer(out))
    .pipe(gulp.dest(out));
});

// CSS options
const sassOptions = {
    outputStyle: 'nested',
    precision: 3,
    errLogToConsole: true
  },
  processors = [
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
    normalize({ browserslist: ['last 3 versions'] }),
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
gulp.task('css', ['images'], () => {
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

// Images
gulp.task('images', () => {
  let out = folder.build + 'images/';

  return gulp
    .src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest(out));
});

// Js Development
gulp.task('js', function(cb) {
  pump(
    [
      gulp.src(folder.src + 'js/**/*'),
      babel({ presets: ['env'] }),
      concat('scripts.js'),
      gulp.dest(folder.build + 'js')
    ],
    cb
  );
});

gulp.task('js:compress', function(cb) {
  pump(
    [
      gulp.src(folder.src + 'js/**/*'),
      babel({ presets: ['env'] }),
      uglify(),
      concat('scripts.js'),
      stripdebug(),
      gulp.dest(folder.build + 'js')
    ],
    cb
  );
});

// Watch
gulp.task('serve', ['html', 'css', 'images', 'js'], () => {
  browserSync.init({
    server: folder.build,
    ui: false
  });

  gulp.watch(folder.src + 'scss/**/*', ['css']);
  gulp.watch(folder.src + 'images/**/*', ['images']);
  gulp
    .watch(folder.src + '**/*.html', ['html'])
    .on('change', browserSync.reload);
  gulp.watch(folder.src + 'js/**/*', ['js']).on('change', browserSync.reload);
});

// Tasks
gulp.task('run', ['html', 'css', 'images', 'js']);

gulp.task('default', ['clean', 'run', 'serve']);
