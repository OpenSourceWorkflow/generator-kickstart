requirejs.config({
	'appdir': '../',
  'baseUrl': './',
  'paths': {

  	//{{app}}

    //{{libs}}
    <% if (includeAccordion) { %>'accordion': 'libs/accordion/accordion',<% } %>
    <% if (includeElementSwitcher) { %>'element-switcher': 'libs/element-switcher/element-switcher',<% } %>
    <% if (includeEqualHeight) { %>'jquery.equal-height': 'libs/jquery.equal-height/jquery.equal-height',<% } %>
    <% if (includeTabs) { %>'tabs': 'libs/tabs/tabs',<% } %>
    <% if (oldIE) { %>'respondJS': 'libs/respondJS/dest/respond.min',<% } %>
		'jquery.exists': 'libs/jquery.exists/jquery.exists',
		'jquery': 'libs/jquery/dist/jquery.min'
  },
  'shim': {
    'jquery.exists': ['jquery'],
    <% if (includeEqualHeight) { %>'jquery.equal-height': ['jquery']<% } %>
  }
});

requirejs(['app/main']);
