/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('kickstart generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('kickstart:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      'bower.json',
      'package.json',
      '.accessibilityrc',
      '.bowerrc',
      '.gitignore',
      '.editorconfig',
      '.csslintrc',
      '.jshintrc',
      'gruntfile.js',
      'README.md',
      'components/foo.js',
      'components/app/main.js',
      'qunit/qunit-test-suite.html',
      'qunit/qunit.js',
      'components/foo.scss',
      'sandbox.html',
      'favicon.ico',
      'apple-touch-icon.png'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
