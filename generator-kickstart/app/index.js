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
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

KickstartGenerator.prototype.app = function app() {
  this.mkdir('src/html');
  this.mkdir('src/html/img');
  this.mkdir('src/html/assets');
  this.mkdir('src/html/assets/js');
  this.mkdir('src/html/assets/font');
  this.mkdir('src/html/assets/scss');
  this.mkdir('src/html/assets/css');
  this.mkdir('src/html/assets/img');
};

KickstartGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('_package.json', 'src/html/package.json');
  this.copy('_config.rb', 'src/html/config.rb');
  this.copy('_gruntfile.js', 'src/html/gruntfile.js');
  this.copy('_gitignore', 'src/html/.gitignore');
};
