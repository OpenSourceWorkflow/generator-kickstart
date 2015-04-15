require([
  'jquery',<% if (oldIE) { %>
  'respondJS',<% } %>
  'jquery.exists'
], function($) {

  'use strict';

  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      // this.loadDynamicModules();
    }
    // loadDynamicModules: function() {
      // this.$bar.exists(function() {
      //   console.log('.bar exists: load bar');
      //   require(['assets/js/_deferred/bar']);
      // });
    // }
  };

  Main.init();

});
