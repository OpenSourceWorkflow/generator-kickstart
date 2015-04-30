## Grunt Tasks

### grunt
Builds the whole project into ```build/```.

### grunt watch
The ```watch```-task is used during development and smartly builds only what is needed.

### grunt production
Builds minified and optimized assets for deployment into ```build/```.
Can be used by other deployment scripts to get the whole front-end production ready.

### grunt test
Runs all quality assurance tasks. This task can be used in a pre-commit hook to keep
the repository on a high level of quality.

### grunt doc
Creates JavaScript documentation in ```documentation/```.

## Customization of your grunt tasks

For each customizable task there is a ```.*rc```-file that you can use to make these tasks fit your needs.

* OOCSS-Linter: [.csslintrc](https://github.com/CSSLint/csslint/wiki/Rules)
* JSHint-Linter: [.jshintrc](http://www.jshint.com/docs/options/)
* accessibility-task: [.accessibilityrc](https://github.com/yargalot/grunt-accessibility/)
