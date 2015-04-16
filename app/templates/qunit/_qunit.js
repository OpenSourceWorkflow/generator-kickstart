require.config({
    baseUrl: "../",
    paths: {
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // 'test-YOUR_MODULE': 'components/app/YOUR_MODULE/test-YOUR_MODULE',
      // 'YOUR_MODULE': 'components/app/YOUR_MODULE/YOUR_MODULE',

      // 'test-YOUR_DEFERRED_MODULE': 'components/app/_deferred/YOUR_DEFERRED_MODULE/test-YOUR_DEFERRED_MODULE',
      // 'YOUR_DEFERRED_MODULE': 'components/app/_deferred/YOUR_DEFERRED_MODULE/YOUR_DEFERRED_MODULE'
    },
    shim: {
     'QUnit': {
        exports: 'QUnit'
      }
    }
});

require([
  // 'test-YOUR_MODULE',
  ], function(
    // YOUR_MODULE,
    ) {

  // YOUR_MODULE.startTests();

  QUnit.load();
  QUnit.start();

});
