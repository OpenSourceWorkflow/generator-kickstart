<%

  var components = ['$'];

  if(includeAccordion) { components.push('Accordion'); }
  if(includeColorbox) { components.push('Overlay'); }
  if(includeElementSwitcher) { components.push('ElementSwitcher'); }
  if(includeTabs) { components.push('Tabs'); }

  components = _.toSentence(components, ', ', ', ');
%>
require([
  'jquery',<% if (includeAccordion) { %>
  'accordion',<% } %><% if (includeColorbox) { %>
  'overlay',<% } %><% if (includeElementSwitcher) { %>
  'element-switcher',<% } %><% if (includeTabs) { %>
  'tabs',<% } %><% if (includeEqualHeight) { %>
  'jquery.equal-height',<% } %><% if (oldIE) { %>
  'respondJS',<% } %>
  'jquery.exists'
  ], function(<%= components %>) {

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
