# generator-kickstart

The generator-kickstart is an opinionated setup for front end development designed to make use of the following technologies:

* Compass & SASS
* requireJS
* jQuery

It aimes at creating frontend templates with high quality standards by continuously testing your work in progress:

* checks for WCAG2 compliance at different levels
* uses JSHint to check your java script
* CSSLint monitores your styling 

## Main goal

The main goal of the project is to incorporate dependency management for the web using [Bower](http://bower.io) to enable you to reuse great projects easily and streamline your everday workflow.  

The generator installs many commonly used components ready for you to customize to your needs:

* [Accordion](https://github.com/markusfalk/accordion)
* [Base64 Background Images](https://github.com/markusfalk/base64-background-image)
* [Colorbox](http://www.jacklmoore.com/colorbox/)
* [Element-Switcher](https://github.com/markusfalk/element-switcher)
* [Grid Layout](https://github.com/markusfalk/grid-layout)
* [jquery.equal-height Plugin](https://github.com/markusfalk/jquery.equal-height)
* [Modernizr](http://modernizr.com/)
* [Tabs](https://github.com/markusfalk/tabs)

## The setup

This is your working environment:

```bash
.
|── components/
|   └── bower/ (all bower components)
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
.
|── assets/
|   └── img/
|   └── css/
|   └── js/
|       └── _deferred/
|── img/ 
└── sandbox.html
```

## HTML Placeholders

Include your modules via placeholder into your main template files. This gives you great overview on your templates and makes it easy to git log your components.

In your HTML you need to use one of the following placeholders for the 2 types of compontents.

```html
<div>
  {app:{module-name}}
  {deferred:{module-name}}
</div>
```
Accordion Example

```html
<div>
  {app:{accordion}}
</div>
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

## Customization

* [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* [.jshintrc](http://www.jshint.com/docs/options/)

## Requirements

* [npm](https://npmjs.org)
* [Yeoman](http://yeoman.io)
* [Grunt](http://gruntjs.com)
* [Bower](http://bower.io)

## License

MIT

