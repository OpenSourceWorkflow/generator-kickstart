'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('Kickstart:removecomponent', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../addcomponent'))
      .withArguments('name', '--force')
      .withOptions({ 'skip-install': true })
      .on('end', done);
  });

  // it('creates files', function () {
  //   assert.file([
  //     'somefile.js'
  //   ]);
  // });
});
