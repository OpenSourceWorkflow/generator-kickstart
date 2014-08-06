requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    'jquery.exists': 'bower/jquery.exists/jquery.exists',
    <% if (includeEqualHeight) { %>'jquery.equal-height': 'bower/jquery.equal-height/jquery.equal-height',<% } %>
    <% if (includeColorbox) { %>'colorbox': 'bower/colorbox/jquery.colorbox-min',<% } %>
    <% if (includeAnythingSlider) { %>'slider': 'bower/anythingslider/js/jquery.anythingslider.min',<% } %>
    <% if (includeAccordion) { %>'accordion': 'bower/accordion/accordion',<% } %>
    <% if (includeTabs) { %>'tabs': 'bower/tabs/tabs',<% } %>
    <% if (includeElementSwitcher) { %>'element-switcher': 'bower/element-switcher/element-switcher'<% } %>
  },
  'shim': {
    'jquery.exists': ['jquery'],
    <% if (includeEqualHeight) { %>'jquery.equal-height': ['jquery'],<% } %>
    <% if (includeColorbox) { %>'jquery.colorbox-min': ['jquery']<% } %>
  }
});

requirejs(['app/main']);
