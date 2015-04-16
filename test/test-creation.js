'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('kickstart:app', function () {

  // not testing the actual run of generators yet
  it('the generator can be required without throwing', function () {
    this.app = require('../app');
  });

  describe('run test', function () {

    var files = [
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

    var prompts = {
      ProjectName: 'Foo',
      ProjectManager: 'Phil',
      GraphicDesigner: 'Sascha',
      HTMLDeveloper: 'Markus',
      wysiwygCMS: false,
      oldIE: true,
      WCAG2: 'A'
    };

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    var runKickstart;

    before(function (done) {
      runKickstart = helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .on('end', done);
    });

    it('have all files been created?', function () {
      runKickstart.
        withOptions(options).
        withArguments('bar').
        // withPrompt(prompts).
        on('end', function () {
          // have all files been created?
          assert.file(files);
        });
    });

  });

});
