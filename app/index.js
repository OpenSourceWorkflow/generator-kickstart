'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var string = require('underscore.string');
var mkdirp = require('mkdirp');

var KickstartGenerator = yeoman.generators.Base.extend({

  init: function () {

    this.pkg = require('../package.json');

    this.on('end', function () {

      if(this.wysiwygCMS) {
        this.log('Don\'t forget to run: ' + chalk.yellow('yo kickstart:addcomponent backend'));
        this.log('\n');
      }
    });

  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Thank you for choosing Kickstart. Sit back and relax while I setup your project.'));

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
      this.ProjectName = string.slugify(answers.ProjectName);

      // wysiwygCMS
      this.wysiwygCMS = answers.wysiwygCMS;

      // Support level
      this.oldIE = answers.oldIE;
      this.WCAG2 = answers.WCAG2;

      done();
    }.bind(this));
  },

  folders: function () {
    mkdirp.mkdirp('img');
  },

  packagefiles: function () {

    this.fs.copyTpl(
      this.templatePath('_accessibilityrc'),
      this.destinationPath('.accessibilityrc')
    );

    this.fs.copyTpl(
      this.templatePath('_bowerrc'),
      this.destinationPath('.bowerrc')
    );

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_gemfile'),
      this.destinationPath('Gemfile')
    );

    this.fs.copyTpl(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      this.templatePath('_csslintrc'),
      this.destinationPath('.csslintrc')
    );

    this.fs.copyTpl(
      this.templatePath('_jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        ProjectName: this.ProjectName,
        oldIE: this.oldIE
      }
    );

    this.fs.copyTpl(
      this.templatePath('_gruntfile.js'),
      this.destinationPath('gruntfile.js'),
      {
        ProjectName: this.ProjectName,
        WCAG2: this.WCAG2,
        oldIE: this.oldIE
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        ProjectName: this.ProjectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('_readme.md'),
      this.destinationPath('README.md'),
      {
        ProjectName: this.ProjectName,
        WCAG2: this.WCAG2,
        oldIE: this.oldIE,
        GraphicDesigner: this.GraphicDesigner,
        HTMLDeveloper: this.HTMLDeveloper,
        ProjectManager: this.ProjectManager
      }
    );

  },

  javascript: function () {

    this.fs.copyTpl(
      this.templatePath('_frontend-template-setup.js'),
      this.destinationPath('components/' + this.ProjectName + '.js'),
      {
        oldIE: this.oldIE
      }
    );

    this.fs.copyTpl(
      this.templatePath('_main.js'),
      this.destinationPath('components/app/main.js'),
      {
        oldIE: this.oldIE
      }
    );
  },

  qunit: function () {

    this.fs.copyTpl(
      this.templatePath('qunit/_qunit-test-suite.html'),
      this.destinationPath('qunit/qunit-test-suite.html'),
      {
        ProjectName: this.ProjectName
      }
    );

    this.fs.copy(
      this.templatePath('qunit/_unit.js'),
      this.destinationPath('qunit/unit.js')
    );

    this.fs.copy(
      this.templatePath('qunit/_config.js'),
      this.destinationPath('qunit/config.js')
    );

  },

  styles: function () {
    this.fs.copyTpl(
      this.templatePath('_frontend-template-setup.scss'),
      this.destinationPath('components/' + this.ProjectName + '.scss')
    );
  },

  html: function () {
    this.fs.copyTpl(
      this.templatePath('_sandbox.html'),
      this.destinationPath('sandbox.html'),
      {
        ProjectName: this.ProjectName,
        oldIE: this.oldIE,
        wysiwygCMS: this.wysiwygCMS
      }
    );
  },

  images: function () {

    this.fs.copy(
      this.templatePath('_favicon.ico'),
      this.destinationPath('favicon.ico')
    );

    this.fs.copy(
      this.templatePath('_apple-touch-icon.png'),
      this.destinationPath('apple-touch-icon.png')
    );

  },

  install: function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  }
});

module.exports = KickstartGenerator;
