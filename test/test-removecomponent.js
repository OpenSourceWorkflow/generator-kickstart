'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Kickstart:removecomponent', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../removecomponent'))
      .withArguments('name', '--force')
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

});
