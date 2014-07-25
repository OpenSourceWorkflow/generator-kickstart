requirejs.config({
	'appdir': '../', // components
  'baseUrl': './', // app
  'paths': {
    'jquery': 'bower/jquery/dist/jquery.min',
    'jquery.exists': 'bower/jquery.exists/jquery.exists',
    'accordion': 'bower/accordion/accordion',
    'foo': 'app/foo/foo'
  },
  'shim': {
    'accordion/accordion.js': ['jquery'],
    'jquery.exists/jquery.exists.js': ['jquery']
  }
});

requirejs(['app/main']);
