# generator-kickstart [![Dependency Status](https://gemnasium.com/markusfalk/generator-kickstart.svg)](https://gemnasium.com/markusfalk/generator-kickstart)

The generator-kickstart is an opinionated setup for front end development designed to make use of the following technologies and paradigms:

* [Compass](http://compass-style.org/)
* [CSSLint](http://csslint.net/)
* [HTML5](http://www.html5rocks.com/)
* [jQuery](http://jquery.com/)
* [JSHint](http://www.jshint.com/)
* [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
* [QUnit](http://qunitjs.com/)
* [requireJS](http://requirejs.org/)
* [SASS](http://sass-lang.com/)
* [WCAG2](http://www.w3.org/TR/WCAG20/)

For development it uses:

* [Yeoman](http://yeoman.io)
* [Grunt](http://gruntjs.com)
* [Bower](http://bower.io)

It aimes at creating frontend templates with high quality standards by continuously testing your work in progress:

* checks for WCAG2 compliance at different levels (A, AA, AAA)
* uses JSHint to check your java script
* CSSLint monitores your styling

## Main goal

The main goal of the project is to incorporate dependency management for the web using [Bower](http://bower.io) to enable you to reuse great projects easily and streamline your everday workflow.

The generator installs many commonly used components ready for you to customize to your needs:

* [Accordion](https://github.com/markusfalk/accordion)
* [Base64 Background Images](https://github.com/markusfalk/base64-background-image)
* [Element-Switcher](https://github.com/markusfalk/element-switcher)
* [Grid Layout](https://github.com/markusfalk/grid-layout)
* [jquery.equal-height Plugin](https://github.com/markusfalk/jquery.equal-height)
* [jquery.exists Plugin](https://github.com/markusfalk/jquery.exists)
* [Modernizr](http://modernizr.com/)
* [Respond.js](https://github.com/scottjehl/Respond)
* [Tabs](https://github.com/markusfalk/tabs)

## The setup

This is your working environment:

```bash
.
|── components/
|   └── libs/ (all 3rd party components)
|   └── app/ (all own components in folders containing JS, SCSS, HTML)
|   |   └── _deferred/ (modules that are loaded dynamically)
|   |   └── main.js (main requirejs module)
|   └── <project-name>.js (require config)
|   └── <project-name>.scss (base file for SCSS)
|── img/ (images rendered by CMS)
└── .bowerrc
└── .csslintrc
└── .editorconfig
└── .gitignore
└── bower.json
└── gruntfile.js
└── favicon.ico
└── package.json
└── README.md
└── sandbox.html (main template)
```

This is what it builds into:

```bash
build/
|── assets/
|   └── img/
|   └── css/
|   └── js/
|       └── _deferred/
|       └── libs/
|── img/
└── favicon.ico
└── sandbox.html
```

## HTML Placeholders

Include your modules via placeholder into your main template files. This gives you great overview on your templates and makes it easy to git log your components.

In your HTML you need to use one of the following placeholders for the 2 types of compontents. This will include the html from your component folder.

```html
{app:{component-name}}
{deferred:{component-name}}
```

## Assets

### Images

Save images used for styling to the img/ subfolder of your component.

There the grunt task expects an SVG and a PNG. If you choose to use the 'Base64BackgroundImages' mixin the SVG is inlined into your CSS and the png is saved to assets/img as fallback.

### Webfonts

Save your webfonts to font/ subfolder of your component.

You could use a 'common' or 'webfonts' component to seperate styles for your webfonts.

## Example for component 'Foo'

Here is an example setup for 'Foo' component:

```bash
.
|── components/
|   └── <project-name>.js (require config)
|   └── <project-name>.scss
|   └── app/
|       └── main.js
|       └── foo/
|           └── font/
|               └── webfonts.woff
|               └── ...
|           └── img/
|               └── arrow.svg
|               └── arrow.png
|           └── foo.js
|           └── foo.scss
|           └── foo.html
└── sandbox.html
```

In your html file you can use placeholders to keep it clean and simple (sandbox.html):

```html
<html>
  <head>...</head>
  <body>
    <main>
      {app:{foo}}
    </main>
  </body>
</html>
```

The requireJS config file (project-name.js):

```javascript
requirejs.config({
  'appdir': '../',
  'baseUrl': './',
  'paths': {
    'jquery': 'libs/jquery/dist/jquery.min',
    'jquery.exists': 'libs/jquery.exists/jquery.exists',
    'foo': 'app/foo/foo'
  },
  'shim': {
    'jquery.exists': ['jquery']
  }
});

requirejs(['app/main']);

```

App entry point:

```javascript
require([
  'jquery', // local jquery for jQuery.noConflict
  'foo', // your required modules
  'jquery.exists' // jquery plugins should be last
  ], function($, Foo) { // watch out for the right order

  'use strict';

  var Main = {
    cacheElements: function() {
      this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      this.loadDynamicModules();

      // Modules
      Foo.init();

    },
    loadDynamicModules: function() {
      this.$bar.exists(function() {
        require(['assets/js/deferred/bar'], function(Bar) {
          Bar.init();
        });

      });
    }
  };

  Main.init();

});
```

base file for styling (project-name.scss):

```css
@import "compass";
@import "app/colors/colors";
@import "app/common/common";
@import "app/rte/rte";
@import "app/foo/foo";

/* import CSS from a lib */
@import "CSS:libs/abc/styling";

```

Your inital styling (foo.scss):

```css
.foo {
  color: red;
}
```

Your inital markup (foo.html):

```html
<div class="foo"></div> <!-- foo -->
```

Your inital script (foo.js):

```javascript
define(['jquery', 'jquery.exists'], function($) {

  'use strict';

  var Foo = {
    cacheElements: function() {
      this.$foo = $('.foo');
    },
    init: function() {
      this.cacheElements();

      this.$foo.exists(function() {
        this.bindEvents();
      });
    },
    bindEvents: function() {
    }
  };

  Foo.init();

  // return {
  //   : Foo.
  // };

});

```

## Unit Tests

The Kickstart Generator uses [QUnit](http://qunitjs.com/) for Unit Tests.
To make it work with requireJS it sets up a parallel requireJS project and loads
HTML and JS into the test suite via jQuery.

To get things going the main entry point for your unit tests is **/qunit.js**.
There you have to add paths to all modules used by the tests. Then you load the
test module and start the tests.

```javascript
require.config({
    baseUrl: "../",
    paths: {
      'jquery': 'components/libs/jquery/dist/jquery.min',

      // 'test-YOUR_MODULE': 'components/app/YOUR_MODULE/test-YOUR_MODULE',
      // 'YOUR_MODULE': 'components/app/YOUR_MODULE/YOUR_MODULE',

      // 'test-YOUR_DEFERRED_MODULE': 'components/app/_deferred/YOUR_DEFERRED_MODULE/test-YOUR_DEFERRED_MODULE',
      // 'YOUR_DEFERRED_MODULE': 'components/app/_deferred/YOUR_DEFERRED_MODULE/YOUR_DEFERRED_MODULE'
    },
    shim: {
     'QUnit': {
        exports: 'QUnit'
      }
    }
});

require([
  // 'test-YOUR_MODULE',
  ], function(
    // YOUR_MODULE,
    ) {

  // YOUR_MODULE.startTests();

  QUnit.load();
  QUnit.start();

});
```

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

The test-* file then contains your actual tests. It comes with 2 exmample test cases.
One is a simple call to a public function of the module.
The other loads HTML and then fires a public function so that you could test on
DOM manipulation.

```javascript
define(['<component-name>'], function(Foo) {

  'use strict';

  var TestFoo = {
    startTests: function() {

      module("<component-name>");

      // test("<component-name> Test", function() {
      //   equal(<component-name>.publicFunction(), "Foo", "Function should return 'Foo'");
      // });

      // asyncTest("<component-name> Test", function() {
      //   expect(1);

      //   $('#qunit-fixture').load('../components/app/<component-name>/<component-name>.html', function(data) {
      //     <component-name>.init();
      //     ok($('.<component-name>').hasClass('lorem'), ".<component-name> should have class 'lorem'");
      //     QUnit.start();
      //   });

      // });

    }
  };

  return {
    startTests: TestFoo.startTests
  };

});
```
### Grunt Task

```bash
$ grunt qunit
```

## Getting started with generator-kickstart

### Requirements

* [Node](https://nodejs.org/)
* [Yeoman](http://yeoman.io)
* [Grunt](http://gruntjs.com)
* [Bower](http://bower.io)
* [Ruby](https://www.ruby-lang.org/)
* [Compass](http://compass-style.org/)
* [Sass](http://sass-lang.com/)
* [Sass CSS Importer Plugin](https://github.com/chriseppstein/sass-css-importer)

### Installation

Install Yeoman & Kickstart generator ([Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started))

```bash
$ npm install -g yo
$ npm install -g generator-kickstart
```

### Start new project

Navigate to an **empty** folder where you want to setup your new project. Then use the following command to start the generator and answer a few questions. It will ask for a few things put to a README.md and what libs you might want to use.

```bash
$ yo kickstart
```

### Adding a new component

The command will add your styles to the <project-name>.scss and to the requireJS config file. It will ask if the component is a 'standard module' or 'deferred module'. If the component uses JS this will do the following:

* **standard**: add requireJS module to main and add component to app/
* **deferred**: you will have to require the module yourself and the component is added to app/_deferred/

```bash
$ yo kickstart:addcomponent <name>
```

You can also use this command multiple times on the same component to add HTML, SCSS or JS as you need it.

### Removing a component

This command removes a component, all its files and references in <project-name>.scss and <project-name>.js.

```bash
$ yo kickstart:removecomponent <name>
```

### Adding a Bower package

It is reccomended to use bower itself to add new packages.

```bash
$ bower install <package-name> --save
```

Don't forget to add your lib to <project-name>.scss or <project-name>.js if needed.
Kickstart uses [sass-css-importer](https://github.com/chriseppstein/sass-css-importer) which lets you import CSS with 'CSS:'-prefix. See example for more Details.

### Grunt Tasks

There are 2 task predefined task: 'default' and 'production'.

The 'production'-task

### Example workflow

Here is what you need to get a new project working:

```bash
$ yo kickstart
$ grunt
$ grunt watch
```

This is for extending the project with another component:

```bash
$ yo kickstart:addcomponent accordion
$ grunt
$ grunt watch
```

This is for removing a component:

```bash
$ yo kickstart:removecomponent accordion
$ grunt
$ grunt watch
```

## Customization

There are a few customizable options for you to consider:

* For the OOCSS-Linter: [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* For the JSHint-Linter: [.jshintrc](http://www.jshint.com/docs/options/)
* For the accessibility-Task: [.accessibilityrc](https://github.com/yargalot/grunt-accessibility/)

## License

MIT
