'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  initializing: function () {

    this.pkg = this.fs.readJSON('package.json');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The app name'
    });

    this.log('You called the Kickstart subgenerator with the argument ' + this.name + '.');
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
    path = 'components/' + this.pkg.name + '.scss',
    file = this.readFileAsString(path),
    match,
    newcontent = '';

    if (this.ComponentType === 'standardModule') {
      match = '@import \"app\/' + this._.slugify(this.name) + '\/' + this._.slugify(this.name) + '\";\n';
    } else {
      match = '@import \"app\/_deferred\/' + this._.slugify(this.name) + '\/' + this._.slugify(this.name) + '\";\n';
    }

    var newfile = file.replace(match, newcontent);
    this.fs.write(path, newfile);
  },

  removeFromRequireJS: function () {

    var
    path = 'components/' + this.pkg.name + '.js',
    file = this.readFileAsString(path),
    newcontent = '',
    match;

    if (this.ComponentType === 'standardModule') {
      match = '\'' + this._.slugify(this.name) + '\': \'app/' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '\',\n';
    } else {
      match = '\'' + this._.slugify(this.name) + '\': \'app/_deferred/' + this._.slugify(this.name) + '/' + this._.slugify(this.name) + '\',\n';
    }

    var newfile = file.replace(match, newcontent);
    this.fs.write(path, newfile);
  }

});
