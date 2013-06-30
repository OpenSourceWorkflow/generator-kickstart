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
  // console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'Wie heißt das Projekt?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

KickstartGenerator.prototype.app = function app() {
  this.mkdir('img');
  this.mkdir('assets');
  this.mkdir('assets/js');
  this.mkdir('assets/font');
  this.mkdir('assets/scss');
  this.mkdir('assets/css');
  this.mkdir('assets/img');
};

KickstartGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_package.json', 'package.json');

  this.copy('_config.rb', 'config.rb');
  this.copy('_gruntfile.js', 'gruntfile.js');
  this.copy('_gitignore', '.gitignore');
};
