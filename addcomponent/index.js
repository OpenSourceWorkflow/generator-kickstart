'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var string = require('underscore.string');

var wire = require("html-wiring");

var mkdirp = require('mkdirp');
var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var store = memFs.create();
var fs = editor.create(store);

var AddcomponentGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.pkg = this.fs.readJSON('package.json');

    this.on('end', function () {

      this.log('\n');

      if (this.ComponentType === 'standardModule') {
        this.log('Added component ' + this.name + ' to components/app/' + string.slugify(this.name));
        if(this.includeHTML) {
          this.log('You can use it in your HTML with ' + chalk.yellow('{app:{' + string.slugify(this.name) + '}}'));
        }
      } else {
        this.log('Added component ' + this.name + ' to components/app/_deferred/' + string.slugify(this.name));
        if(this.includeHTML) {
          this.log('You can use it in your HTML with ' + chalk.yellow('{deferred:{' + string.slugify(this.name) + '}}'));
        }
      }

      this.log('\n');
    });
  },

  _hasFeature: function (feature) {
    return this.features && this.features.indexOf(feature) !== -1;
  },

  askForApp: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'list',
        name: 'ComponentType',
        message: 'What type of module would you like to add?',
        choices: [{
          name: 'Standard module (compiled to main file)',
          value: 'standardModule'
        },
        {
          name: 'Deferred module (dynamically loaded)',
          value: 'DeferredModule'
        }]
      },
      {
        type: 'checkbox',
        name: 'whatFiles',
        message: 'What assets do you need?',
        choices: [
          {
            name: 'HTML',
            value: 'includeHTML',
            checked: true
          },
          {
            name: 'SCSS',
            value: 'includeSCSS',
            checked: true
          },
          {
            name: 'JS',
            value: 'includeJS',
            checked: true
          },
          {
            name: 'QUnit Test',
            value: 'includeQUnit',
            checked: false
          }
        ]
      }
    ];

    this.prompt(prompts, function (answers) {

      this.features = answers.whatFiles;

      this.includeHTML = this._hasFeature('includeHTML');
      this.includeJS = this._hasFeature('includeJS');
      this.includeQUnit = this._hasFeature('includeQUnit');
      this.includeSCSS = this._hasFeature('includeSCSS');

      this.ComponentType = answers.ComponentType;

      done();
    }.bind(this));
  },

  setDefaults: function () {

    if (this.ComponentType === 'standardModule') {
      this.directory = 'components/app/';
    } else {
      this.directory = 'components/app/_deferred/';
    }

  },

  addApp: function () {

    // set path
    var
    path = this.directory + string.slugify(this.name);

    // create directory
    mkdirp.mkdirp(path);

    if (this.includeJS) {
      this.fs.copyTpl(
        this.templatePath('_component.js'),
        this.destinationPath(path + '/' + string.slugify(this.name) + '.js'),
        {
          class_name: string.classify(this.name),
          _name: string.underscored(this.name),
          slug_name: string.slugify(this.name)

        }
      );
    }

    if (this.includeSCSS) {
      this.fs.copyTpl(
        this.templatePath('_component.scss'),
        this.destinationPath(path + '/' + string.slugify(this.name) + '.scss'),
        {
          slug_name: string.slugify(this.name)

        }
      );
    }

    if (this.includeHTML) {
      this.fs.copyTpl(
        this.templatePath('_component.html'),
        this.destinationPath(path + '/' + string.slugify(this.name) + '.html'),
        {
          slug_name: string.slugify(this.name)

        }
      );
    }

    if (this.includeQUnit) {
      this.fs.copyTpl(
        this.templatePath('_qunit-test.js'),
        this.destinationPath(path + '/test-' + string.slugify(this.name) + '.js'),
        {
          class_name: string.classify(this.name),
          slug_name: string.slugify(this.name)
        }
      );
    }
  },

  addStyling: function () {
    if (this.includeSCSS) {

      var path = 'components/' + this.pkg.name + '.scss';

      // also enable to use hidden scss with _
      // this way project-name.scss can be imported
      // for theming support
      if(!fs.exists(path)) {
        path = 'components/_' + this.pkg.name + '.scss';
      }

      var file = this.fs.read(path);

      if (this.ComponentType === 'standardModule') {
        file += '@import "app/' + string.slugify(this.name) + '/' + string.slugify(this.name) + '";\n';
      } else {
        file += '@import "app/_deferred/' + string.slugify(this.name) + '/' + string.slugify(this.name) + '";\n';
      }

      this.fs.write(path, file);
    }
  },

  addToRequireJS: function () {

    if(this.includeJS) {

      var
      path = 'components/' + this.pkg.name + '.js',
      file = this.fs.read(path);

      if(this.includeJS) {
        var
        match = '//{{app}}',
        newcontent;

        if (this.ComponentType === 'standardModule') {
          newcontent = '//{{app}}\n    \'' + string.slugify(this.name) + '\': \'' + 'app/' + string.slugify(this.name) + '/'+ string.slugify(this.name) + '\',';
        } else {
          newcontent = '//{{app}}\n    \'' + string.slugify(this.name) + '\': \'' + 'app/_deferred/' + string.slugify(this.name) + '/'+ string.slugify(this.name) + '\',';
        }

        var newfile = file.replace(match, newcontent);
      }

      this.fs.write(path, newfile);

    }
  }

});

module.exports = AddcomponentGenerator;
