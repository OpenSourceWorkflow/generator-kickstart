+++ PRE-RELEASE: not ready for production yet! +++

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
* [AnythingSlider](https://github.com/CSS-Tricks/AnythingSlider)
* [Base64 Background Images](https://github.com/markusfalk/base64-background-image)
* [Colorbox](http://www.jacklmoore.com/colorbox/)
* [Element-Switcher](https://github.com/markusfalk/element-switcher)
* [Grid Layout](https://github.com/markusfalk/grid-layout)
* [jquery.equal-height Plugin](https://github.com/markusfalk/jquery.equal-height)
* [jquery.exists Plugin](https://github.com/markusfalk/jquery.exists)
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
build/
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

In your HTML you need to use one of the following placeholders for the 2 types of compontents. This will include the html from your component folder.

```html
{app:{component-name}}
{deferred:{component-name}}
```
### Accordion Example

The HTML from the accordion component folder will be inserted into the sandbox containing the placeholder.

```bash
.
|── components/
|   └── app/
|       └── accordion/
|           └── accordion.html
└── sandbox.html
```

In your html file:
```html
<html>
  <head>...</head>
  <body>
    <main>
      {app:{accordion}}
    </main>
  </body>
</html>
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

## Customization

There are a few customizable options for you to consider:

* [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* [.jshintrc](http://www.jshint.com/docs/options/)

## License

MIT

