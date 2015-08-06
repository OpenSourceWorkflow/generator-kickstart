# JS Style Guide

## White space

In Kickstart projects all of these properties are set by default. An editorconfig file is created with these values.

* Indentation: whitespaces
* Indentation size: 2
* End of line: lf
* Charset: UTF-8
* Always trim trailing whitespaces
* Always include final new line

## Syntax

### Parentheses & Linebreaks

```javascript
// GOOD
if (true) {
  // code
} else {
  // code
}

for (var i = 0; i < 100; i++) {
 // code
}

// Functions
function foo(arg1, argN) {
 // code
}

foo(arg1, argN);

// with callback
foo(function() {
  // code
});

// In Object literals use empty line before and after functions and return
var Foo = {

  foo: function() {},

  bar: function() {}

  return {};

};
```

### Declarations

```javascript
// BAD
var foo = {
  'a': 'value',
  'b': 'value'
};
var bar = ['a', 'b'];

// GOOD
var // use comma separated list
foo = {
  'a': 'value',
  'b': 'value'
},
bar = ['a', 'b'];
```

### Quotes

```javascript
// BAD
var foo = "stringA";
var bar = 'StringB';

// GOOD
var // use single quotes
foo = 'StringA',
bar = 'StringB';
```

## Naming

* Use camel casing
* use verb to start function names

### Public functions
```javascript
[...]
init: function() {
}
[...]
return /** @alias module:Foo */ {
  /** init */
  init: Foo.init
};
```

### Private functions

```javascript
// beginn with '_'
_cacheElements: function() {
},
```

### Variables

```javascript
// BAD
var f = '';

// GOOD
var foo = ''; // always use descriptive names
```


```javascript
// Use '$' to indicate variables containing jQuery objects
var $foo = $('.foo');

$('.bar').on('click', function() {
  var $this = $(this); // cache object with '$'
});
```

## JSDoc

Kickstart uses [JSDoc](http://usejsdoc.org/) to render documentation. Here is an example of the minimum documentation for a module.

```javascript
/**
 * Description
 * @module Foo
 * @requires jquery
 * @requires jquery.exists
 * @author mail@markus-falk.com
 */
define(['jquery', 'jquery.exists'], function($, exists) {

  'use strict';

  var Foo = {

    /**
     * Caches all jQuery Objects for later use.
     * @function _cacheElements
     * @private
     */
    _cacheElements: function() {
      this.$foo = $('.foo');
    },

    /**
     * Initiates the module.
     * @function init
     * @public
     */
    init: function() {
      Foo._cacheElements();
      Foo.$foo.exists(function() {
        Foo._bar(2, 2);
      });
    },

    /**
     * Returns the sum of arg1 and arg1.
     * @function _bar
     * @private
     * @param {Number} arg1 - summand one.
     * @param {Number} arg2 - summand two.
     * @returns {Number} Sum of arg1 and arg2
     */
    _bar: function(arg1, arg2) {
      return arg1 + arg2;
    }
  };

  return /** @alias module:Foo */ {
    /** init */
    init: Foo.init
  };

});
```

## Misc

```javascript
define([ // line break long dependency arrays for readability
  'jquery',
  'jquery.exists'
], function($, exists) { // pass all dependencies to avoid globals, watch order!

  'use strict' // use strict mode

  var Foo = { // Camel case object literals

    foo: function() {},

    bar: function() {}

    return /** @alias module:Foo */ {
      /** init */
      foo: Foo.foo
    };

  };
});
```

```javascript
// BAD
foo === bar && foobar(); // don't short circuit

// GOOD
if (foo === bar) { // improved readability
  foobar();
}
```
