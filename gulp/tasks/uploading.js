'use strict';
const fs = require('fs');
const gulp = require('gulp');
const rsync = require('gulp-rsync');
const path = require('path');
const ghPages = require('gh-pages');

// 'gulp deploy' -- reads from your Rsync credentials file and incrementally
// uploads your site to your server
gulp.task('upload-rsync', () => {
  var credentials = JSON.parse(fs.readFileSync('rsync-credentials.json', 'utf8'));

  return gulp.src('dist/**', {dot: true})
    .pipe(rsync({
      root: 'dist',
      hostname: credentials.hostname,
      username: credentials.username,
      destination: credentials.destination,
      incremental: true
    }));
});

// 'gulp deploy' -- pushes your dist folder to Github
gulp.task('upload-github', (done) => {
  ghPages.publish(path.join(__dirname + '/../../', 'dist'), {
    dotfiles: true,
    branch: "dist"
	},
	done);
});
