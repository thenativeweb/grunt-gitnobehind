'use strict';

var shell = require('shelljs');

module.exports = function (grunt) {
  grunt.registerTask('gitnobehind', 'Ensures that the local master is not behind origin/master.', function () {
    var behind = shell.exec('git fetch && git rev-list --right-only --count master...origin/master', {
      silent: !grunt.option('verbose')
    });

    if (behind.code !== 0) {
      grunt.fail.fatal('Failed to compare branches.');
    }

    if (behind.output.trim() !== '0') {
      grunt.fail.fatal('The local master is behind origin/master, run git pull first.');
    }
  });
};
