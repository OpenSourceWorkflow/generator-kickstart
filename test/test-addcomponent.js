'use strict';
var path = require('path');

var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var store = memFs.create();
var fs = editor.create(store);

var fse = require('fs-extra')

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Kickstart:addcomponent', function () {

  describe('yo kickstart:addcomponent foo (standardModule)', function () {

    var files = [
      'components/app/foo/foo.js',
      'components/app/foo/foo.scss',
      'components/app/foo/foo.html'
    ];

    var prompts = {
      ComponentType: 'standardModule',
      whatFiles: ['includeHTML', 'includeSCSS', 'includeJS']
    };

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    before(function (done) {

      helpers.run(path.join( __dirname, '../addcomponent'))
      .inDir(path.join( __dirname, './tmp'), function(dir) {

        fs.copy(
          path.join(__dirname, 'templates/package.json'),
          dir + 'package.json'
        );

        var test = fs.readJSON(dir + 'package.json');
        console.log('test: ' + test);
        console.log('test.name: ' + test.name);

      })
      .withArguments(['foo'])
      .withPrompts(prompts)
      .withOptions(options)
      .on('end', done);

    });

    it('have all files been created?', function () {
      assert.file(files);
    });

    // it('is the right CSS wired to sandbox.html?', function () {
    //   assert.fileContent('sandbox.html', /assets\/css\/foo\.css/);
    // });
    //
    // it('is the right JS wired to sandbox.html?', function () {
    //   assert.fileContent('sandbox.html', /data-main="assets\/js\/foo"/);
    // });

  });

});
