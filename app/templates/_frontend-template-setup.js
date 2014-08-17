requirejs.config({
	'appdir': '../',
  'baseUrl': './',
  'paths': {
    'jquery': 'libs/jquery/dist/jquery.min',
    'jquery.exists': 'libs/jquery.exists/jquery.exists',
    <% if (includeAccordion) { %>'accordion': 'libs/accordion/accordion',<% } %>
    <% if (oldIE) { %>'respondJS': 'libs/respondJS/dest/respond.min',<% } %>
    <% if (includeAnythingSlider) { %>'slider': 'libs/anythingslider/js/jquery.anythingslider.min',<% } %>
    <% if (includeColorbox) { %>'colorbox': 'libs/colorbox/jquery.colorbox-min',<% } %>
    <% if (includeElementSwitcher) { %>'element-switcher': 'libs/element-switcher/element-switcher',<% } %>
    <% if (includeEqualHeight) { %>'jquery.equal-height': 'libs/jquery.equal-height/jquery.equal-height',<% } %>
    <% if (includeTabs) { %>'tabs': 'libs/tabs/tabs'<% } %>
  },
  'shim': {
    'jquery.exists': ['jquery'],
    <% if (includeEqualHeight) { %>'jquery.equal-height': ['jquery'],<% } %>
    <% if (includeColorbox) { %>'jquery.colorbox-min': ['jquery']<% } %>
  }
});

requirejs(['app/main']);
