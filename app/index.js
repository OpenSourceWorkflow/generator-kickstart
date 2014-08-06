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

  _hasFeature: function (feature) {
    return this.features && this.features.indexOf(feature) !== -1;
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Kickstart Generator @ webit! Scholar Day'));

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
        message: 'Who is developing the fronten end?'
      },
      {
        type: 'confirm',
        name: 'oldIE',
        message: 'Would you like to support legacy IE (<9)?',
        default: false
      },
      {
        type: 'checkbox',
        name: 'ContentElements',
        message: 'What more would you like?',
        choices: [
          {
            name: 'Colorbox',
            value: 'includeColorbox',
            checked: false
          },
          {
            name: 'AnythingSlider',
            value: 'includeAnythingSlider',
            checked: false
          },
          {
            name: 'Accordion',
            value: 'includeAccordion',
            checked: false
          },
          {
            name: 'ElementSwitcher',
            value: 'includeElementSwitcher',
            checked: false
          },
          {
            name: 'Tabs',
            value: 'includeTabs',
            checked: false
          },
          {
            name: 'jquery equal-height Plugin',
            value: 'includeEqualHeight',
            checked: false
          },
          {
            name: 'GridLayout',
            value: 'includeGridLayout',
            checked: true
          },
          {
            name: 'Base64BackgroundImages',
            value: 'includeBase64BackgroundImages',
            checked: true
          },
          {
            name: 'Modernizr',
            value: 'includeModernizr',
            checked: true
          }
        ]
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

      // Bower components
      this.features = answers.ContentElements;
      
      this.includeAccordion = this._hasFeature('includeAccordion');
      this.includeAnythingSlider = this._hasFeature('includeAnythingSlider');
      this.includeBase64BackgroundImages = this._hasFeature('includeBase64BackgroundImages');
      this.includeColorbox = this._hasFeature('includeColorbox');
      this.includeElementSwitcher = this._hasFeature('includeElementSwitcher');
      this.includeEqualHeight = this._hasFeature('includeEqualHeight');
      this.includeGridLayout = this._hasFeature('includeGridLayout');
      this.includeModernizr = this._hasFeature('includeModernizr');
      this.includeTabs = this._hasFeature('includeTabs');

      // Support level
      this.oldIE = answers.oldIE;
      this.WCAG2 = answers.WCAG2;

      done();
    }.bind(this));
  },

  folders: function () {
    this.mkdir('components/app/_deferred');
    this.mkdir('components/bower');
    this.mkdir('img');
  },

  packagefiles: function () {
    this.copy('_bowerrc', '.bowerrc');
    this.copy('_gitignore', '.gitignore');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_csslintrc', '.csslintrc');
    this.template('_gruntfile.js', 'gruntfile.js');
    this.template('_jshintrc', '.jshintrc');
    this.template('_readme.md', 'README.md');
  },

  javascript: function () {
    this.template('_frontend-template-setup.js', 'components/' + this._.slugify(this.ProjectName) + '.js');
    this.template('_main.js', 'components/app/main.js');
  },

  styles: function () {
    this.copy('_frontend-template-setup.scss', 'components/' + this._.slugify(this.ProjectName) + '.scss');
  },

  html: function () {
    this.template('_sandbox.html', 'sandbox.html');
  },

  components: function () {

    // colors
    this.template('colors/_colors.scss', 'components/app/colors/_colors.scss');

    // common
    this.template('common/_common.scss', 'components/app/common/_common.scss');

    // header
    this.template('header/_header.scss', 'components/app/header/_header.scss');
    this.template('header/_header.html', 'components/app/header/header.html');

    // footer
    this.template('footer/_footer.scss', 'components/app/footer/_footer.scss');
    this.template('footer/_footer.html', 'components/app/footer/footer.html');

    // rte
    this.template('rte/_rte.html', 'components/app/rte/rte.html');
    this.template('rte/_rte.scss', 'components/app/rte/_rte.scss');

  },

  optionalComponents: function () {

    // element-switcher
    if(this.includeElementSwitcher) {
      this.template('element-switcher/_element-switcher.html', 'components/app/element-switcher/element-switcher.html');
      this.template('element-switcher/_element-switcher.scss', 'components/app/element-switcher/_element-switcher.scss');
    }

    // Tabs
    if(this.includeTabs) {
      this.template('tabs/_tabs.html', 'components/app/tabs/tabs.html');
      this.template('tabs/_tabs.scss', 'components/app/tabs/_tabs.scss');
    }

    // Accordion
    if(this.includeAccordion) {
      this.template('accordion/_accordion.html', 'components/app/accordion/accordion.html');
      this.template('accordion/_accordion.scss', 'components/app/accordion/_accordion.scss');
    }

    // Colorbox
    if(this.includeColorbox) {
      this.template('overlay/_overlay.html', 'components/app/overlay/overlay.html');
      this.template('overlay/_overlay.js', 'components/app/overlay/overlay.js');
      this.template('overlay/_overlay.scss', 'components/app/overlay/_overlay.scss');
    }

    // AnythingSlider
    if(this.includeAnythingSlider) {
      this.template('slider/_slider.html', 'components/app/slider/slider.html');
      this.template('slider/_slider.js', 'components/app/slider/slider.js');
      this.template('slider/_slider.scss', 'components/app/slider/_slider.scss');
    }

  }

});

module.exports = KickstartGenerator;
