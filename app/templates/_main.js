require([
  'jquery',
  'jquery.exists'<% if (includeAccordion) { %>,
  'accordion',<% } %><% if (oldIE) { %>
  'respondJS',<% } %><% if (includeAnythingSlider) { %>
  'slider',<% } %><% if (includeColorbox) { %>
  'colorbox',<% } %><% if (includeElementSwitcher) { %>
  'element-switcher',<% } %><% if (includeEqualHeight) { %>
  'jquery.equal-height',<% } %><% if (includeTabs) { %>
  'tabs'<% } %>
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
