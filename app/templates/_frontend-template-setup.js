requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    'jquery.exists': 'bower/jquery.exists/jquery.exists',
    <% if (includeEqualHeight) { %>'bower/jquery.equal-height/jquery.equal-height.js',<% } %>
    <% if (includeColorbox) { %>'bower/colorbox/jquery.colorbox-min.js',<% } %>
    <% if (includeAccordion) { %>'accordion': 'bower/accordion/accordion',<% } %>
    <% if (includeTabs) { %>'accordion': 'bower/tabs/tabs',<% } %>
    <% if (includeElementSwitcher) { %>'accordion': 'bower/element-switcher/element-switcher'<% } %>
  },
  'shim': {
    'jquery.exists/jquery.exists.js': ['jquery'],
    <% if (includeEqualHeight) { %>'jquery.equal-height.js': ['jquery'],<% } %>
    <% if (includeColorbox) { %>'jquery.colorbox-min.js': ['jquery']<% } %>
  }
});

requirejs(['app/main']);
