requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    'jquery.exists': 'bower/jquery.exists/jquery.exists',
    <% if (includeAccordion) { %>'accordion': 'bower/accordion/accordion',<% } %>
    <% if (includeAnythingSlider) { %>'slider': 'bower/anythingslider/js/jquery.anythingslider.min',<% } %>
    <% if (includeColorbox) { %>'colorbox': 'bower/colorbox/jquery.colorbox-min',<% } %>
    <% if (includeElementSwitcher) { %>'element-switcher': 'bower/element-switcher/element-switcher',<% } %>
    <% if (includeEqualHeight) { %>'jquery.equal-height': 'bower/jquery.equal-height/jquery.equal-height',<% } %>
    <% if (includeTabs) { %>'tabs': 'bower/tabs/tabs'<% } %>
  },
  'shim': {
    'jquery.exists': ['jquery'],
    <% if (includeEqualHeight) { %>'jquery.equal-height': ['jquery'],<% } %>
    <% if (includeColorbox) { %>'jquery.colorbox-min': ['jquery']<% } %>
  }
});

requirejs(['app/main']);
