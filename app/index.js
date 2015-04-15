'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var lodash = require('lodash');

var KickstartGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {

      if (!this.options['skip-install']) {
        this.installDependencies();
      }

      if(this.wysiwygCMS) {
        this.log('Don\'t forget run: ' + chalk.yellow('yo kickstart:addcomponent backend'));
        this.log('\n');
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Thank you for choosing Kickstart. Sit back and relax while I setup your project. '));

    var prompts = [
      {
        type: 'input',
        name: 'ProjectName',
        message: 'What is the project\'s name?'
      },
      {
        type: 'input',
        name: 'ProjectManager',
        message: 'Who is the project manager?'
      },
      {
        type: 'input',
        name: 'GraphicDesigner',
        message: 'Who is the graphic designer?'
      },
      {
        type: 'input',
        name: 'HTMLDeveloper',
        message: 'Who is developing the front end?'
      },
      {
        type: 'confirm',
        name: 'wysiwygCMS',
        message: 'Do you need additional setup for your wysiwyg CMS?',
        default: false
      },
      {
        type: 'confirm',
        name: 'oldIE',
        message: 'Would you like to support legacy IE (<9)?',
        default: false
      },
      {
        type: 'list',
        name: 'WCAG2',
        message: 'What WCAG2A level would you like to develop for?',
        choices: [{
          name: 'A',
          value: 'A'
        },
        {
          name: 'AA',
          value: 'AA'
        },
        {
          name: 'AAA',
          value: 'AAA'
        }]
      }
    ];

    this.prompt(prompts, function (answers) {

      // README
      this.GraphicDesigner = answers.GraphicDesigner;
      this.HTMLDeveloper = answers.HTMLDeveloper;
      this.ProjectManager = answers.ProjectManager;
      this.ProjectName = answers.ProjectName;

      // wysiwygCMS
      this.wysiwygCMS = answers.wysiwygCMS;

      // Support level
      this.oldIE = answers.oldIE;
      this.WCAG2 = answers.WCAG2;

      done();
    }.bind(this));
  },

  folders: function () {
    this.mkdir('components/libs');
    this.mkdir('img');
  },

  packagefiles: function () {
    this.copy('_accessibilityrc', '.accessibilityrc');
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_gitignore', '.gitignore');
    this.copy('_editorconfig', '.editorconfig');

    this.template('_bower.json', 'bower.json');
    this.template('_csslintrc', '.csslintrc');
    this.template('_gruntfile.js', 'gruntfile.js');
    this.template('_jshintrc', '.jshintrc');
    this.template('_package.json', 'package.json');
    this.template('_readme.md', 'README.md');
  },

  javascript: function () {
    this.template('_frontend-template-setup.js', 'components/' + _.slugify(this.ProjectName) + '.js');
    this.template('_main.js', 'components/app/main.js');
  },

  qunit: function () {
    this.template('qunit/_qunit-test-suite.html', 'qunit/qunit-test-suite.html');
    this.copy('qunit/_qunit.js', 'qunit/qunit.js');
  },

  styles: function () {
    this.copy('_frontend-template-setup.scss', 'components/' + _.slugify(this.ProjectName) + '.scss');
  },

  html: function () {
    this.template('_sandbox.html', 'sandbox.html');
  },

  images: function () {
    this.copy('_favicon.ico', 'favicon.ico');
    this.copy('_apple-touch-icon.png', 'apple-touch-icon.png');
  }

});

module.exports = KickstartGenerator;
