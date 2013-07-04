'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var KickstartGenerator = module.exports = function KickstartGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KickstartGenerator, yeoman.generators.Base);

KickstartGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'Wie heißt das Projekt?'
  },
  {
    type: 'confirm',
    name: 'webfonts',
    message: 'Werden webfonts verwendet?',
    default: true
  },
  {
    type: 'confirm',
    name: 'accordion',
    message: 'Gibt es ein Accordion?',
    default: true
  },
  {
    type: 'confirm',
    name: 'overlay',
    message: 'Gibt es ein Overlay?',
    default: true
  },
  {
    name: 'accordion',
    message: 'Welchen Slider möchtest du verwenden? (flexslider oder anythingslider)'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.webfonts = props.webfonts;
    this.accordion = props.accordion;
    this.overlay = props.overlay;
    this.slider = props.slider;

    cb();
  }.bind(this));
};

KickstartGenerator.prototype.structure = function structure() {
  this.mkdir('img');
  this.mkdir('assets');
  this.mkdir('assets/js');
  this.mkdir('assets/scss');
  this.mkdir('assets/css');
  this.mkdir('assets/img');

  // include font directory if webfonts need to be used
  if(this.webfonts) {
    this.mkdir('assets/font');
  }

};

KickstartGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');
  this.template('_gruntfile.js', 'gruntfile.js');
  this.template('_bower.json', 'bower.json');

  this.copy('_config.rb', 'config.rb');
  this.copy('_gitignore', '.gitignore');

};

KickstartGenerator.prototype.jssnippets = function jssnippets() {
  var cb = this.async();
  this.remote('markusfalk', 'js-snippets', function (err, remote) {
    if (err) {
      return cb(err);
    }
    remote.directory('.', 'components/jssnippets');
    cb();
  });
};