requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    'jquery.exists': 'bower/jquery.exists/jquery.exists',
    <% if (includeAccordion) { %>'accordion': 'bower/accordion/accordion',<% } %>
  },
  'shim': {
    'jquery.exists/jquery.exists.js': ['jquery']
  }
});

requirejs(['app/main']);
