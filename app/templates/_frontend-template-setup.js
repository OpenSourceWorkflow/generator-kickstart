requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    <% if (includeAccordion) { %>'accordion': 'bower/accordion/accordion',<% } %>
  },
  'shim': {
    'jquery.exists/jquery.exists.js': ['jquery']
  }
});

requirejs(['app/main']);
