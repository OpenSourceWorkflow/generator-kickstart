require([
  'jquery',
  'jquery.exists'<% if (includeAccordion) { %>,
  'accordion',<% } %>
  ], function() {

  'use strict';

  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      // this.loadDynamicDependencies();
    }
    // loadDynamicDependencies: function() {
      // this.$bar.exists(function() {
      //   console.log('.bar exists: load bar');
      //   require(['assets/js/deferred/bar']);
      // });
    // }
  };

  Main.init();

});
