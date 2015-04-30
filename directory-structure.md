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

### HTML Placeholders

Include your modules via placeholder into your main template files. This gives you great overview on your templates and makes it easy to git log your components.

In your HTML you need to use one of the following placeholders for the 2 types of compontents. This will include the html from your component folder.

```html
{app:{component-name}}
{deferred:{component-name}}
```
