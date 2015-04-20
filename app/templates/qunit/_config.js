var requirejs = {
  baseUrl: "../",
  paths: {
    //{{app}}

    //{{libs}}
    'unit': 'qunit/unit',
    'qunit': 'components/libs/qunit/qunit/qunit',
    'jquery.exists': 'libs/jquery.exists/jquery.exists',
    'jquery': 'components/libs/jquery/dist/jquery.min'
  },
  'shim': {
    'jquery.exists': ['jquery']
  }
};
