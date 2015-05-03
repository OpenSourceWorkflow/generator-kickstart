requirejs.config({
	'appdir': '../',
	'baseUrl': './',
	'paths': {
		//{{app}}

		//{{libs}}
		<% if (oldIE) { %>'respondJS': 'libs/respondJS/dest/respond.min',<% } %>
		'jquery.exists': 'libs/jquery.exists/jquery.exists',
		'jquery': 'libs/jquery/dist/jquery.min'
	},
	'shim': {
		'jquery.exists': ['jquery']
	}
});

requirejs(['app/main']);
