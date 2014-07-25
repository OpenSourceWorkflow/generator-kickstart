require([
  'jquery',
  'jquery.exists'<% if (includeAccordion) { %>,
  'accordion',<% } %>
  ], function() {

  /************************************************************
  Strict Mode
  @see http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more
  *************************************************************/
  'use strict';

  /************************************************************
  @description Main
  *************************************************************/
  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      this.loadDynamicDependencies();
    },
    loadDynamicDependencies: function() {

      // this.$bar.exists(function() {
      //   console.log('.bar exists: load bar');
      //   require(['assets/js/deferred/bar']);
      // });

    }
  };

  Main.init();

});
