+++ PRE-RELEASE: not ready for production yet! +++

# generator-kickstart

The generator-kickstart is an opinionated setup for front end development designed to make use of the following technologies and paradigms:

* [Compass](http://compass-style.org/)
* [CSSLint](http://csslint.net/)
* [HTML5](http://www.html5rocks.com/)
* [jQuery](http://jquery.com/)
* [JSHint](http://www.jshint.com/)
* [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
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
* [AnythingSlider](https://github.com/CSS-Tricks/AnythingSlider)
* [Base64 Background Images](https://github.com/markusfalk/base64-background-image)
* [Colorbox](http://www.jacklmoore.com/colorbox/)
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
└── .gitignore
└── bower.json
└── gruntfile.js
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

As you can see in the 'foo' example. Save images used for styling to the img/ subfolder of your component. There the grunt task expects an SVG and a PNG. If you choose to use the 'Base64BackgroundImages' mixin the SVG is inlined into your CSS and the png is saved to assets/img as fallback.

## Example

Here is a complete setup for the included 'foo' component:

```bash
.
|── components/
|   └── <project-name>.js (require config)
|   └── <project-name>.scss
|   └── app/
|       └── main.js
|       └── foo/
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

The requireJS config file (<project-name>.js):

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
  'jquery',
  'foo',
  'jquery.exists'
  ], function() {

  'use strict';

  var Main = {
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    init: function() {
      this.cacheElements();
      // this.loadDynamicDependencies();
    }
    // loadDynamicDependencies: function() {
      // this.$bar.exists(function() {
      //   console.log('.bar exists: load bar');
      //   require(['assets/js/deferred/bar']);
      // });
    // }
  };

  Main.init();

});
```

Your inital styling (foo.scss):

```css
.foo {
  color: red;
}
```

Your inital markup (foo.html):

```html
<div class="foo">
  <p>Foo!</p>
</div> <!-- foo -->
```

Your inital script (foo.js):

```javascript
define(['jquery', 'jquery.exists'], function() {

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

## Getting Started

Install Yeoman & kickstart generator ([Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started))

```bash
$ npm install -g yo
$ npm install -g generator-kickstart
```

Your are ready to use the generator with:

```bash
$ yo kickstart
```

Adding a module to app/.

```bash
$ yo kickstart:addcomponent <name>
```

Adding a Bower package.

```bash
$ yo kickstart:addbower <name>
```

### Example workflow

Here is what you need to get a new project working:

```bash
$ npm install -g yo
$ npm install -g generator-kickstart

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

This is for extending the project with another bower package:

```bash
$ yo kickstart:addbower accordion
$ grunt
$ grunt watch
```

## FAQ

* Where do I put webfonts? app/common/font (can be font/ in any component).

## Customization

There are a few customizable options for you to consider:

* [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* [.jshintrc](http://www.jshint.com/docs/options/)

## License

MIT

