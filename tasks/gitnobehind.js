'use strict';

var shell = require('shelljs');

module.exports = function (grunt) {
  grunt.registerTask('gitnobehind', 'Ensures that your local branch is up-to-date.', function () {
    var behind = shell.exec('git rev-list --right-only --count HEAD...origin/master', {
      silent: !!grunt.option('verbose')
    });

    if (behind.code !== 0) {
      grunt.fail.fatal('Failed to compare branches.');
    }

    if (behind.output.trim() !== '0') {
      grunt.fail.fatal('Your local branch is behind origin/master, run git pull first.');
    }
  });
};
