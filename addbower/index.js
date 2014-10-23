'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var AddbowerGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.pkg = this.dest.readJSON('package.json');

    this.on('end', function () {

      this.log('\n');
      this.log('You might need to add ' + this.name + '\'s dependencies to your requireJS config: ');
      this.log(chalk.yellow.bold(JSON.stringify(this.bowerJSON.dependencies)));
      this.log('\n');

    });
  },

  addBower: function () {
    var done = this.async();
    this.bowerInstall([this.name], { 'save': true }, done);
  },

  addToRequireJS: function () {

    var

    bowerFile = 'components/libs/' + this.name + '/bower.json',
    bowerJSON = this.dest.readJSON(bowerFile),
    bowerMain = bowerJSON.main.replace(".js", ""),

    pathToRequireJSConfig = 'components/' + this.pkg.name + '.js',
    requireJSConfig = this.readFileAsString(pathToRequireJSConfig),

    match = '//{{libs}}',
    newcontent = '//{{libs}}\n    \'' + this.name + '\': \'' + 'libs/' + this.name + '/' + bowerMain + '\',',
    newRequireJSConfig = requireJSConfig.replace(match, newcontent);

    this.bowerJSON = bowerJSON;

    this.write(pathToRequireJSConfig, newRequireJSConfig);
  }
});

module.exports = AddbowerGenerator;
