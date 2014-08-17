'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AddbowerGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.pkg = this.dest.readJSON('package.json');

    this.on('end', function () {

      this.log('\n');
      this.log('Added component ' + this.name + ' to components/libs/');
      this.log('Don\'t forget to wire this into your requirejs config (components/' + this.pkg.name + '.js)');
      this.log('\n');
    });
  },
  addBower: function () {
    var done = this.async();
    this.bowerInstall([this.name], { 'save': true }, done);
  }
});

module.exports = AddbowerGenerator;
