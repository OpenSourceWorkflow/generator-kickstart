require([
  'jquery',<% if (includeAccordion) { %>
  'accordion',<% } %><% if (includeAnythingSlider) { %>
  'slider',<% } %><% if (includeColorbox) { %>
  'overlay',<% } %><% if (includeElementSwitcher) { %>
  'element-switcher',<% } %><% if (includeTabs) { %>
  'tabs',<% } %><% if (includeEqualHeight) { %>
  'jquery.equal-height',<% } %><% if (oldIE) { %>
  'respondJS',<% } %>
  'jquery.exists'
  ], function(<% if (includeAccordion) { %>Accordion<% } %> <% if (includeAnythingSlider) { %>, Slider<% } %> <% if (includeColorbox) { %>, Overlay<% } %> <% if (includeElementSwitcher) { %>, ElementSwitcher<% } %> <% if (includeTabs) { %>, Tabs<% } %>) {

  'use strict';

  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      // this.loadDynamicModules();

      // Modules
      <% if (includeAccordion) { %>Accordion.init();<% } %>
      <% if (includeAnythingSlider) { %>Slider.init();<% } %>
      <% if (includeColorbox) { %>Overlay.init();<% } %>
      <% if (includeElementSwitcher) { %>ElementSwitcher.init();<% } %>
      <% if (includeTabs) { %>Tabs.init();<% } %>

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
