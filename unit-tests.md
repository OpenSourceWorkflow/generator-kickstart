
### Unit Tests

The Kickstart Generator uses [QUnit](http://qunitjs.com/) for Unit Tests.
To make it work with requireJS it sets up a parallel requireJS project.

The test suite consists of these files:

* qunit/unit.js
* qunit/config.js
* qunit/qunit-test-suite.html
* component/app/&lt;component-name&gt;/test-&lt;component-name&gt;.js

#### qunit/config.js

This file contains the requireJS configuration.

```javascript
var requirejs = {
    baseUrl: "../",
    paths: {
      'unit': 'qunit/unit',
      'qunit': 'components/libs/qunit/qunit/qunit',
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // Example Foo
      'foo': 'components/app/foo/foo',
      'test-foo': 'components/app/foo/test-foo'
    }
};
```

#### qunit/unit.js

This file starts the tests you want to run.

```javascript
// Example with Foo as module
// component/app/foo/foo.js
// component/app/foo/test-foo.js

require(['qunit', 'test-foo'], function(qunit, Foo) {
  Foo();
  qunit.start();
});
```

#### component/app/&lt;component-name&gt;/test-&lt;component-name&gt;.js

Tests are put into the component folder right next to the module you want to test.
Kickstart assumes that this file is prefixed with **test-** and then contains the module's
name.

```bash
.
|── components/
|   └── app/
|       └── <component-name>/
|           └── <component-name>.js
└──         └── test-<component-name>.js
```

The test-* file then contains your actual tests.

```javascript
// Example for foo
define(['qunit', 'foo'], function(qunit, Foo) {

  'use strict';

  return function() {

    qunit.module("Foo");

    qunit.test("Foo return Test", function() {
      equal(Foo.falsify(), false, "Function should return 'false'");
    });

  };

});

```
