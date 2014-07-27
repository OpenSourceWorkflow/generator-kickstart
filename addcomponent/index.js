'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var AddcomponentGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.pkg = this.dest.readJSON('package.json');
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

      done();
    }.bind(this));
  },

  addApp: function () {

    // this.log('js: ', this.includeJS);
    // this.log('html: ', this.includeHTML);
    // this.log('scss: ', this.includeSCSS);
    // this.log(this._.slugify(this.name));
    this.mkdir('components/app/' + this.name);

    if(this.includeJS) {
      this.template('component.js', 'components/app/' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '.js');
    }
    if(this.includeSCSS) {
      this.template('_component.scss', 'components/app/' + this._.slugify(this.name) + '/_' + this._.slugify(this.name) + '.scss');
    }
    if(this.includeHTML) {
      this.template('component.html', 'components/app/' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '.html');
    }
  },

  addStyling: function () {
    if(this.includeSCSS) {

      var path = 'components/' + this.pkg.name + '.scss',
          file = this.readFileAsString(path);

      /* make modifications to the file string here */
      // this.log(file);

      file += '@import "app/' + this._.slugify(this.name) + '/'+ this._.slugify(this.name) + '";\n';

      this.write(path, file);
    }
  }

  // end: function () {
  //   this.log('done');
  //   // this.spawnCommand('composer', ['install']);
  // }

});

module.exports = AddcomponentGenerator;
