'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Kickstart:app', function () {

  describe('yo kickstart (no wysiwygCMS, no legacyIE)', function () {

    var files = [
      '.accessibilityrc',
      '.bowerrc',
      '.csslintrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      '.scsslintrc',
      'README.md',
      'apple-touch-icon.png',
      'windows-tile-icon.png',
      'bower.json',
      'components/app/main.js',
      'components/foo.scss',
      'favicon.ico',
      'gems.rb',
      'gruntfile.js',
      'img/',
      'package.json',
      'qunit/config.js',
      'qunit/qunit-test-suite.html',
      'qunit/unit.js',
      'sandbox.html'
    ];

    var prompts = {
      ProjectName: 'Foo',
      ProjectManager: 'Phil',
      GraphicDesigner: 'Sascha',
      HTMLDeveloper: 'Markus',
      wysiwygCMS: false,
      livereload: true,
      oldIE: false,
      WCAG2: 'A'
    };

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    before(function (done) {
      helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .withPrompts(prompts)
      .withOptions(options)
      .on('end', done);
    });

    it('have all files been created?', function () {
      assert.file(files);
    });

    it('is the right CSS wired to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /assets\/css\/foo\.css/);
    });

    it('is the right JS wired to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /data-main="assets\/js\/foo"/);
    });

    it('is livereload.js wired to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /livereload\.js\?snipver/);
    });

  });

  describe('yo kickstart (wysiwygCMS, legacyIE)', function () {

    var prompts = {
      ProjectName: 'Bar',
      ProjectManager: 'Phil',
      GraphicDesigner: 'Sascha',
      HTMLDeveloper: 'Markus',
      wysiwygCMS: true,
      oldIE: true,
      WCAG2: 'A'
    };

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    before(function (done) {
      helpers.run(path.join( __dirname, '../app'))
      .inDir(path.join( __dirname, './tmp'))
      .withPrompts(prompts)
      .withOptions(options)
      .on('end', done);
    });

    // legacy IE
    it('is jquery version 1.x.x added to bower.json?', function () {
      assert.fileContent('bower.json', /"jquery": "~1"/);
    });

    it('is respondJS added to bower.json?', function () {
      assert.fileContent('bower.json', /"respondJS": "~1"/);
    });

    it('is browsehappy.com linked in sandbox.html?', function () {
      assert.fileContent('sandbox.html', /browsehappy\.com/);
    });

    it('are conditional comments added to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /if gt IE 8/);
    });

    it('is modernizr\'s shiv and printshiv set to true?', function () {
      assert.fileContent('gruntfile.js', /'shiv' : true/);
      assert.fileContent('gruntfile.js', /'printshiv' : true/);
    });

    it('is legacy support noted in README?', function () {
      assert.fileContent('README.md', /This project supports IE8!/);
    });

    // wysiwygCMS
    it('is backend CSS wired to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /backend\.css/);
    });

    it('is backend JS wired to sandbox.html?', function () {
      assert.fileContent('sandbox.html', /assets\/js\/deferred\/backend/);
    });

  });

});
