define(['<%= slug_name %>'], function(<%= class_name %>) {

  'use strict';

  var Test<%= class_name %> = {

    startTests: function() {

      module("<%= class_name %>");

      // test("<%= class_name %> Test", function() {
      //   equal(Foo.greet(), "Hello", "Function should return 'Hello'");
      // });

      // asyncTest("<%= class_name %> Test", function() {
      //   expect(1);

      //   $('#qunit-fixture').load('../components/app/<%= slug_name %>/<%= slug_name %>.html', function(data) {
      //     <%= class_name %>.init();
      //     ok($('.<%= class_name %>').hasClass('lorem'), ".<%= class_name %> should have class 'lorem'");
      //     QUnit.start();
      //   });

      // });

    }
  };

  return {
    startTests: Test<%= class_name %>.startTests
  };

});
