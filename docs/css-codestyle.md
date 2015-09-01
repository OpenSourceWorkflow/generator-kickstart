# CSS Style Guide

## White space

In Kickstart projects all of these properties are set by default. An editorconfig file is created with these values.

* Indentation: whitespaces
* Indentation size: 2
* End of line: lf
* Charset: UTF-8
* Always trim trailing whitespaces
* Always include final new line

## Syntax

```scss
// BAD
.foo {
  .bar { // check if .bar needs to be nested at all
    padding: 0;
  }
  h2, h3 { // put every selector on a new line
    color:red;
  }
  a {
    font: { // Don't nest properties
      size: 1rem;
      weight: bold;
    }
    color: blue;

    div{ // no space after selector
      span { // nested too deep
        border: 1px solid red;
      }
    }

  }
}

// GOOD
.foo {

  h2, // every selector on a new line
  h3 {
    color: red;
  }

  // use linebreaks to seperate blocks
  a {
    color: blue; // alphabetical order
    font-size: 1rem;
    font-weight: bold;

    // reached maximum nesting level of 3
    &:hover,
    &:active,
    &:focus {
      color: orange;
    }
  }

}

// nest only if needed! Keep CSS result in mind!
.bar {
  padding: 0;
}
```
