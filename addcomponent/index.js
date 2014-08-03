'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');

var AddcomponentGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.pkg = this.dest.readJSON('package.json');

    this.log(this.pkg);

    // this.on('end', function () {
    //   this.log('Added component ' + this.name + ' to components/app/' + this._.slugify(this.name));
    // });
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
          }
        ]
      }
    ];

    this.prompt(prompts, function (answers) {

      this.features = answers.whatFiles;

      this.includeHTML = this._hasFeature('includeHTML');
      this.includeSCSS = this._hasFeature('includeSCSS');
      this.includeJS = this._hasFeature('includeJS');

      this.ComponentType = answers.ComponentType;

      done();
    }.bind(this));
  },

  setDefaults: function () {

    if (this.ComponentType === 'standardModule') {
      this.directory = 'components/app/';
    } else {
      this.directory = 'components/app/_deferred';
    }

  },

  addApp: function () {


    this.mkdir(this.directory + this.name);

    if (this.includeJS) {
      this.template('_component.js', this.directory + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '.js');
    }
    if (this.includeSCSS) {
      this.template('_component.scss', this.directory + this._.slugify(this.name) + '/_' + this._.slugify(this.name) + '.scss');
    }
    if (this.includeHTML) {
      this.template('_component.html', this.directory + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '.html');
    }
  },

  addStyling: function () {
    if (this.includeSCSS) {

      var path = 'components/' + this.pkg.name + '.scss',
          file = this.readFileAsString(path);

      if (this.ComponentType === 'standardModule') {
        file += '@import "app/' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '";\n';
      } else {
        file += '@import "app/_deferred' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '";\n';
      }

      this.write(path, file);
    }
  }

  // end: function () {
  //   this.log('done');
  //   // this.spawnCommand('composer', ['install']);
  // }

});

module.exports = AddcomponentGenerator;
