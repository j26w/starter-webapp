'use strict';
const argv = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const critical = require('critical').stream;
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gzip = require('gulp-gzip');
const newer = require('gulp-newer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const when = require('gulp-if');

// 'gulp scripts' -- creates a index.js file from your JavaScript files and
// creates a Sourcemap for it
// 'gulp scripts --prod' -- creates a index.js file from your JavaScript files,
// minifies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('scripts', () =>
  // NOTE: The order here is important since it's concatenated in order from
  // top to bottom, so you want vendor scripts etc on top
  gulp.src([
    'src/assets/javascript/vendor/jquery/*.js',
    'src/assets/javascript/vendor/plugins/**/*.js',
    'src/assets/javascript/main.js'
  ])
    .pipe(newer('.tmp/assets/javascript/index.js', {dest: '.tmp/assets/javascript', ext: '.js'}))
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('index.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/javascript')))
    .pipe(when(argv.prod, when('*.js', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/javascript'))
);

gulp.task('scripts-nonasync-head', () =>
  gulp.src([
    'src/assets/javascript/nonasync-head.js'
  ])
    .pipe(newer('src/_includes/nonasync-head.js', {dest: 'src/_includes', ext: '.js'}))
    .pipe(when(!argv.prod, sourcemaps.init()))

    .pipe(concat('nonasync-head-final.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, gulp.dest('src/_includes')))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('src/_includes'))
);

gulp.task('scripts-nonasync-end', () =>
  gulp.src([
    'src/assets/javascript/nonasync-end.js'
  ])
    .pipe(newer('src/_includes/nonasync-end.js', {dest: 'src/_includes', ext: '.js'}))
    .pipe(when(!argv.prod, sourcemaps.init()))

    .pipe(concat('nonasync-end-final.js'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(when(argv.prod, when('*.js', uglify({preserveComments: 'some'}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, gulp.dest('src/_includes')))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('src/_includes'))
);

// 'gulp styles' -- creates a CSS file from your SASS, adds prefixes and
// creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SASS, adds prefixes and
// then minwhenies, gzips and cache busts it. Does not create a Sourcemap
gulp.task('styles', () =>
  gulp.src('src/assets/scss/style.scss')
    .pipe(when(!argv.prod, sourcemaps.init()))
    .pipe(sass({
      precision: 10
    }).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: ['last 2 versions', '> 5%', 'IE 9']})
    ]))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest('src/_includes/'))
    .pipe(when(argv.prod, rename({suffix: '.min'})))
    .pipe(when(argv.prod, when('*.css', cssnano({autoprefixer: false}))))
    .pipe(when(argv.prod, size({
      showFiles: true
    })))
    .pipe(when(argv.prod, rev()))
    .pipe(when(!argv.prod, sourcemaps.write('.')))
    .pipe(when(argv.prod, gulp.dest('.tmp/assets/stylesheets')))
    .pipe(when(argv.prod, when('*.css', gzip({append: true}))))
    .pipe(when(argv.prod, size({
      gzip: true,
      showFiles: true
    })))
    .pipe(gulp.dest('.tmp/assets/stylesheets'))
    .pipe(when(!argv.prod, browserSync.stream()))
    .pipe(gulp.dest('dist/assets/stylesheets'))
    .pipe(when(!argv.prod, browserSync.stream()))
);

var pageDimensions = [{
                        width: 320,
                        height: 480
                      }, {
                        width: 768,
                        height: 1024
                      }, {
                        width: 1280,
                        height: 960
                      }];

// 'gulp styles:critical:home' -- extract layout.home critical CSS into /_includes/critical-home.css
gulp.task('styles:critical:home', function () {
  return gulp.src('dist/index.html')
    .pipe(critical({
      base: 'dist',
      inline: false,
      css: ['src/_includes/style.css'],
      dimensions: pageDimensions,
      dest: '../src/_includes/critical-home.css',
      minify: true,
      extract: false,
      include: [/fonts-loaded/],
      ignore: ['@font-face',/url\(/] // defer loading of webfonts and background images
    }))
});
// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}
// 'gulp serve' -- open up your website in your browser and watch for changes
// in all your files and update them when needed
gulp.task('serve', (done) => {
  browserSync.init({
    // tunnel: true,
    // open: false,
    // port: 4000, // change port to match default Jekyll
    // ui: {
    //   port: 4001
    // },
    // server: ['.tmp', 'dist'],
    // server: 'dist',
    proxy: "starter-webapp.dev",
    host: "192.168.1.144"
  });
  done();

  // Watch various files for changes and do the needful
  gulp.watch(['src/**/*.md', 'src/**/*.html', 'src/**/*.yml'], gulp.series('build:site', reload));
  gulp.watch(['src/**/*.xml', 'src/**/*.txt'], gulp.series('site', reload));
  gulp.watch('src/assets/javascript/**/*.js', gulp.series('scripts', reload));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
});
