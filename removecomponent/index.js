'use strict';
var yeoman = require('yeoman-generator');
var string = require('underscore.string');
var wire = require("html-wiring");

var memFs = require('mem-fs');
var editor = require('mem-fs-editor');
var store = memFs.create();
var fs = editor.create(store);

module.exports = yeoman.generators.Base.extend({

  initializing: function () {

    this.pkg = this.fs.readJSON('package.json');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The app name'
    });

    // this.log('You called the Kickstart subgenerator with the argument ' + this.name + '.');
  },

  askForApp: function () {
    var done = this.async();

    var prompts = [
      {
        type: 'list',
        name: 'ComponentType',
        message: 'What type of module would you like to remove?',
        choices: [{
          name: 'Standard module (compiled to main file)',
          value: 'standardModule'
        },
        {
          name: 'Deferred module (dynamically loaded)',
          value: 'DeferredModule'
        }]
      }
    ];

    this.prompt(prompts, function (answers) {
      this.features = answers.whatFiles;
      this.ComponentType = answers.ComponentType;

      done();
    }.bind(this));
  },

  setDefaults: function() {
    if (this.ComponentType === 'standardModule') {
      this.directory = 'components/app/';
    } else {
      this.directory = 'components/app/_deferred/';
    }
  },

  removeApp: function () {
    // remove folder from app/
    this.fs.delete(this.directory + this.name);
  },

  removeStyling: function () {

    var
<<<<<<< HEAD
    path = 'components/' + this.pkg.name + '.scss';
>>>>>>> master
    match,
    newcontent = '';

    // also enable to use hidden scss with _
    // this way project-name.scss can be imported
    // for theming support
    if(!fs.exists(path)) {
      path = 'components/_' + this.pkg.name + '.scss';
    }

    var file = this.fs.read(path),

    if (this.ComponentType === 'standardModule') {
      match = '@import \"app\/' + string.slugify(this.name) + '\/' + string.slugify(this.name) + '\";\n';
    } else {
      match = '@import \"app\/_deferred\/' + string.slugify(this.name) + '\/' + string.slugify(this.name) + '\";\n';
    }

    var newfile = file.replace(match, newcontent);
    this.fs.write(path, newfile);
  },

  removeFromRequireJS: function () {

    var
    path = 'components/' + this.pkg.name + '.js',
    file = this.fs.read(path),
    newcontent = '',
    match;

    if (this.ComponentType === 'standardModule') {
      match = '\'' + string.slugify(this.name) + '\': \'app/' + string.slugify(this.name) + '/' + string.slugify(this.name) + '\',\n';
    } else {
      match = '\'' + string.slugify(this.name) + '\': \'app/_deferred/' + string.slugify(this.name) + '/' + string.slugify(this.name) + '\',\n';
    }

    var newfile = file.replace(match, newcontent);
    this.fs.write(path, newfile);
  }

});
