'use strict';
const gulp = require('gulp');
const inject = require('gulp-inject');

// 'gulp inject:css' -- injects style.css
gulp.task('inject:css', () =>
  gulp.src('.tmp/src/_layouts/default.html')
    .pipe(inject(gulp.src('.tmp/assets/stylesheets/*.css'), {
    	transform: function (filepath, file, i, length) {
        return filepath; // return filepath only
      },
      ignorePath: '.tmp',
      addRootSlash: false,
      addPrefix: '{{ site.url }}/{{ site.baseurl }}',
      removeTags: true
    }))
    .pipe(gulp.dest('.tmp/src/_layouts'))
);

// 'gulp inject:js' -- injects index.js
gulp.task('inject:js', () =>
  gulp.src('.tmp/src/_includes/scripts.html')
    .pipe(inject(gulp.src('.tmp/assets/javascript/*.js'), {
    	transform: function (filepath, file, i, length) {
        	return filepath; // return filepath only
      	},
      	ignorePath: '.tmp',
      	addRootSlash: false,
      	addPrefix: '{{ site.url }}/{{ site.baseurl }}',
      	removeTags: true
    }))
    .pipe(gulp.dest('.tmp/src/_includes'))
);
