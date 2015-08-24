'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var path = require('path');

describe('Kickstart:removecomponent', function () {

  describe('yo kickstart:removecomponent foo (standardModule)', function () {

    var files = [
      'components/app/foo/foo.js',
      'components/app/foo/test-foo.js',
      'components/app/foo/_foo.scss',
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

      helpers.run(path.join( __dirname, '../removecomponent'))
      .inDir(path.join( __dirname, './tmp'))
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

    // it('have all files been deleted?', function () {
    //   assert.noFile(files);
    // });

    // it('is the new module deleted from project-name.scss?', function () {
    //   assert.noFileContent('components/foo.scss', /@import \"app\/foo\/foo\";/);
    // });

    // it('is the new module deleted from project-name.js?', function () {
    //   assert.noFileContent('components/foo.scss', /app\/foo\/foo/);
    // });

  });

  describe('yo kickstart:removecomponent bar (DeferredModule)', function () {

    var files = [
      'components/app/_deferred/bar/bar.js',
      'components/app/_deferred/bar/bar.scss',
      'components/app/_deferred/bar/bar.html',
      'components/app/_deferred/bar/test-bar.js'
    ];

    var prompts = {
      ComponentType: 'DeferredModule',
      whatFiles: ['includeHTML', 'includeSCSS', 'includeJS', 'includeQUnit']
    };

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    };

    before(function (done) {

      helpers.run(path.join( __dirname, '../removecomponent'))
      .inDir(path.join( __dirname, './tmp'))
      .withArguments(['bar'])
      .withPrompts(prompts)
      .withOptions(options)
      .on('ready', function(generator) {

        // create dummy package.json
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_package.json'),
          generator.destinationPath('package.json'),
          { ProjectName: 'bar' }
        );

        // create dummy project-name.scss
        generator.fs.copy(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/bar.scss')
        );

        // create dummy project-name.js
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/bar.js'),
          { oldIE: false }
        );

      })
      .on('end', done);

    });

    // it('have all files been created?', function () {
    //   assert.noFile(files);
    // });
    //
    // it('is the new module wired to project-name.scss?', function () {
    //   assert.noFileContent('components/bar.scss', /@import \"app\/_deferred\/bar\/bar\";/);
    // });
    //
    // it('is the new module wired to project-name.js?', function () {
    //   assert.noFileContent('components/bar.scss', /app\/_deferred\/bar\/bar/);
    // });

  });

  describe('yo kickstart:removecomponent bar (hidden _project-name.scss)', function () {

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

      helpers.run(path.join( __dirname, '../removecomponent'))
      .inDir(path.join( __dirname, './tmp'))
      .withArguments(['bar'])
      .withPrompts(prompts)
      .withOptions(options)
      .on('ready', function(generator) {

        // create dummy package.json
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_package.json'),
          generator.destinationPath('package.json'),
          { ProjectName: 'bar' }
        );

        // create dummy hidden _project-name.scss
        generator.fs.copy(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/_bar.scss')
        );

        // create dummy project-name.js
        generator.fs.copyTpl(
          generator.templatePath('../../app/templates/_frontend-template-setup.scss'),
          generator.destinationPath('components/bar.js'),
          { oldIE: false }
        );

      })
      .on('end', done);

    });

    // it('is the new module deleted from _project-name.scss?', function () {
    //   assert.noFileContent('components/_bar.scss', /@import \"app\/bar\/bar\";/);
    // });

  });
});
