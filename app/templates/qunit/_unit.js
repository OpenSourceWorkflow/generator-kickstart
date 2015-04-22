require([
  'qunit'
],

function(qunit) {

  qunit.module("QUnit");
  qunit.test("Load Qunit", function() {
    equal(typeof(qunit), 'object', "Function should return 'Qunit Object'");
  });

  // call test script here
  qunit.start();
});
