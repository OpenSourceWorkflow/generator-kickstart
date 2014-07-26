define(['jquery'], function() {

  'use strict';

  var <%= _.classify(name) %> = {
    cacheElements: function() {
    },
    init: function() {
      this.cacheElements();
      this.bindEvents();
    },
    bindEvents: function() {
    }
  };

  <%= _.classify(name) %>.init();

  // return {
  //   : <%= _.classify(name) %>.
  // };

});
