'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var AddbowerGenerator = yeoman.generators.NamedBase.extend({

  // init: function () {
  //   this.on('end', function () {
  //     this.log('Added bower ' + this.name + ' to components/bower');
  //   });
  // },

  installBower: function () {
    var done = this.async();
    this.bowerInstall([this.name], { 'save': true }, done);
  }
});

module.exports = AddbowerGenerator;
