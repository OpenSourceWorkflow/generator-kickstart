'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var KickstartGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Kickstart generator!'));

    var prompts = [{
      type: 'input',
      name: 'projectname',
      message: 'Your project name'
    }];

    this.prompt(prompts, function (props) {
      this.projectname = props.projectname;

      done();
    }.bind(this));
  },

  folders: function () {
    // this.mkdir('components');
    this.mkdir('components/bower');
    this.mkdir('components/app/_deferred');
    this.mkdir('img');
  },

  files: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_frontend-template-setup.scss', this.projectname + '.scss');
  }

});

module.exports = KickstartGenerator;
