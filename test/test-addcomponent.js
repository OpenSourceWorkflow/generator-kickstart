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
      'components/app/foo/test-foo.js',
      'components/app/foo/foo.scss',
      'components/app/foo/foo.html'
    ];

    var prompts = {
      ComponentType: 'standardModule',
      whatFiles: ['includeHTML', 'includeSCSS', 'includeJS', 'includeQUnit']
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

        // fs.copyTpl(
        //   path.join(__dirname, '../app/templates/_package.json'),
        //   dir + 'package.json',
        //   { ProjectName: 'foo' }
        // );
        //
        // var test = fs.readJSON(dir + 'package.json');
        // console.log('test: ' + test);
        // console.log('test.name: ' + test.name);

      })
      .withArguments(['foo'])
      .withPrompts(prompts)
      .withOptions(options)
      .on('ready', function(generator) {

        // create dummy package.json
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_package.json'),
          generator.destinationPath('package.json'),
          { ProjectName: 'foo' }
        );

        // create dummy project-name.scss
        generator.fs.copy(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/foo.scss')
        );

        // create dummy project-name.js
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/foo.js'),
          { oldIE: false }
        );

      })
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
