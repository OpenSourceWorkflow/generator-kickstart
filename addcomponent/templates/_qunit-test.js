define(['<%= _.slugify(name) %>'], function(<%= _.classify(name) %>) {

  'use strict';

  var Test<%= _.classify(name) %> = {

    startTests: function() {

      module("<%= _.classify(name) %>");

      // test("<%= _.classify(name) %> Test", function() {
      //   equal(Foo.greet(), "Hello", "Function should return 'Hello'");
      // });

      // asyncTest("<%= _.classify(name) %> Test", function() {
      //   expect(1);

      //   $('#qunit-fixture').load('../components/app/<%= _.slugify(name) %>/<%= _.slugify(name) %>.html', function(data) {
      //     <%= _.classify(name) %>.init();
      //     ok($('.<%= _.classify(name) %>').hasClass('lorem'), ".<%= _.classify(name) %> should have class 'lorem'");
      //     QUnit.start();
      //   });

      // });

    }
  };

  return {
    startTests: Test<%= _.classify(name) %>.startTests
  };

});
