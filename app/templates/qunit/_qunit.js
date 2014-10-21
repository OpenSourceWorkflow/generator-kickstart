require.config({
    baseUrl: "../",
    paths: {
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // 'test-<%= _.slugify(name) %>': 'components/app/<%= _.slugify(name) %>/test-<%= _.slugify(name) %>',
      // '<%= _.slugify(name) %>': 'components/app/<%= _.slugify(name) %>/<%= _.slugify(name) %>',

      // 'test-<%= _.slugify(name) %>': 'components/app/_deferred/<%= _.slugify(name) %>/test-<%= _.slugify(name) %>',
      // '<%= _.slugify(name) %>': 'components/app/_deferred/<%= _.slugify(name) %>/<%= _.slugify(name) %>'
    },
    shim: {
     'QUnit': {
        exports: 'QUnit'
      }
    }
});

require([
  // 'test-<%= _.slugify(name) %>',
  ], function(
    // <%= _.slugify(name) %>,
    ) {

  // <%= _.slugify(name) %>.startTests();

  QUnit.load();
  QUnit.start();

});

