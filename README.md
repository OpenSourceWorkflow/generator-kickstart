# Kickstart<br>The open source workflow for the web<br>[![Dependency Status](https://gemnasium.com/markusfalk/generator-kickstart.svg)](https://gemnasium.com/markusfalk/generator-kickstart) [![Build Status](https://travis-ci.org/markusfalk/generator-kickstart.svg?branch=20150416_falk_test-creation-pass)](https://travis-ci.org/markusfalk/generator-kickstart)

<img src="https://raw.githubusercontent.com/markusfalk/generator-kickstart/20150425_falk_release-v3.2.0/kickstart.png">

## What is Kickstart?

The Kickstart project is more than just a yeoman generator. It is an open source workflow for creating the front-end of **websites** or **single page applications**. It is continuously tested and improved in an web agency environment.

### Why use Kickstart?

The power of many can be used to solve problems quickly and automate the setup of new projects in a very profound way. Besides that Kickstart has many best practices built in:

* Linters ensure a high quality of code
* Components and documentation standards makes it easy for teams to work together on a project
* Dependency management makes it easy to work with an unified set of 3rd party libraries
* Kickstart promotes test driven development for your java script
* The whole setup is fully adjustable to fit your needs
* and many more

### What technologies does Kickstart use?

Kickstart makes use of the following technologies and paradigms:

* [Compass](http://compass-style.org/)
* [CSSLint](http://csslint.net/)
* [HTML5](http://www.html5rocks.com/)
* [jQuery](http://jquery.com/)
* [JSHint](http://www.jshint.com/)
* [JSDoc](http://usejsdoc.org/)
* [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
* [QUnit](http://qunitjs.com/)
* [requireJS](http://requirejs.org/)
* [SASS](http://sass-lang.com/)
* [WCAG2](http://www.w3.org/TR/WCAG20/)
* [Modernizr](http://modernizr.com/)
* [Respond.js](https://github.com/scottjehl/Respond) (legacy IE only)
* [jquery.exists Plugin](https://github.com/markusfalk/jquery.exists)

## The setup

This is your working environment:

```bash
.
|── components/
|   └── libs/ #(all 3rd party components)
|   └── app/ #(all own components in folders containing JS, SCSS, HTML)
|   |   └── _deferred/ #(modules that are loaded dynamically)
|   |   └── <component-name>/
|   |   |   └── img/ #(background-images used by this component)
|   |   |   └── font/ #(webfonts used by this component)
|   |   |   └── <component-name>.js
|   |   |   └── test-<component-name>.js
|   |   |   └── <component-name>.scss
|   |   |   └── <component-name>.html
|   |   └── main.js #(main requirejs module)
|   └── .js #(require config)
|   └── .scss #(base file for SCSS)
|── img/ #(images rendered by CMS)
└── .bowerrc
└── .csslintrc
└── .editorconfig
└── .gitignore
└── Gemfile
└── bower.json
└── gruntfile.js
└── favicon.ico
└── package.json
└── README.md
└── sandbox.html #(main template)
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

### Assets

#### Images

Save images used for styling to the img/ subfolder of your component.

#### Webfonts

Save your webfonts to font/ subfolder of your component.

### HTML Placeholders

Include your modules via placeholder into your main template files. This gives you great overview on your templates and makes it easy to git log your components.

In your HTML you need to use one of the following placeholders for the 2 types of compontents. This will include the html from your component folder.

```html
{app:{component-name}}
{deferred:{component-name}}
```

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

### Grunt Tasks

* grunt (produces assets with sourcemaps used for development)
* grunt watch (used for development)
* grunt production (produces minified and optimized assets for deployment)
* grunt test (runs all quality assurance tasks)
* grunt doc (creates JavaScript documentation)

### Customization

There are a few customizable options for you to consider:

* OOCSS-Linter: [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* JSHint-Linter: [.jshintrc](http://www.jshint.com/docs/options/)
* accessibility-task: [.accessibilityrc](https://github.com/yargalot/grunt-accessibility/)


## WYSIWYG CMS

If you have CMS that uses some sort of front-end editing Kickstart will add this to enable deferred modules for your backend only.

```HTML
<!-- wysiwyg:
<link rel="stylesheet" href="assets/css/backend.css">
<script src="assets/js/libs/require.js"></script>
<script charset="utf-8">
  require(['assets/js/projectName'], function() {
    require(['assets/js/deferred/backend'], function(Backend) {
      Backend.init();
    });
  });
</script>
-->
```

All you have to do is add a deferred component with the name 'backend': ```yo kickstart:addcomponent backend```

## Legacy Browsers

During the setup of a new project kickstart will ask you if you want to support legacy IE (<9). Here is what happens if you choose to support legacy IE.

* Conditional comments are added to the html tag with IE classes
* RespondJS is added to bower.json to polyfill mediaqueries
* shiv and printshiv is included in the modernizr build
* jQuery is included as 1.x.x
* a link to browsehappy.com will be inserted with a conditional comment

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

Kickstart generates a Gemfile with the needed ruby gems. You can install with bundler into .bundles if you like. The folder is already included in .gitignore.

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

The command will add your styles to the .scss and to the requireJS config file. It will ask if the component is a 'standard module' or 'deferred module'. If the component uses JS this will do the following:

* **standard**: add requireJS module to main and add component to app/
* **deferred**: you will have to require the module yourself and the component is added to app/_deferred/

```bash
$ yo kickstart:addcomponent <name>
```

You can also use this command multiple times on the same component to add HTML, SCSS or JS as you need it.

### Removing a component

This command removes a component, all its files and references in .scss and .js.

```bash
$ yo kickstart:removecomponent <name>
```

### Adding a lib

It is recommended to use bower itself to add new packages to lib.

```bash
$ bower install <package-name> --save
```

Don't forget to add your lib to &lt;project-name&gt;.scss or &lt;project-name&gt;.js if needed.
Kickstart uses [sass-css-importer](https://github.com/chriseppstein/sass-css-importer) which lets you import CSS with 'CSS:'-prefix.

## License

[MIT](https://tldrlegal.com/license/mit-license)

### Images

All the shiny artwork is provided by [creeight – kustom graphics](http://creeight.de/)
