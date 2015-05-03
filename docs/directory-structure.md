## Directory structure

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
└── sandbox.html #(main template, you can add as many as you want)
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

### HTML Placeholders

Include your modules via placeholder into your main template files. This gives you great overview on your templates and makes it easy to git log your components.

Here is what you can do with them:

```html
<html>
  <head>Your sandbox.html</head>
  <body>
    <!-- insert app/component-name/component-name.html -->
    {app:{component-name}}

    <!-- insert app/component-name/alternate-file.html -->
    {app:{component-name:{alternate-file}}}

    <!-- insert app/_deferred/component-name/component-name.html -->
    {deferred:{component-name}}

    <!-- insert app/_deferred/component-name/alternate-file.html -->
    {deferred:{component-name:{alternate-file}}}
  <body>
<html
```
