define(['jquery', 'jquery.exists'], function() {

  'use strict';

  var <%= _.classify(name) %> = {
    _cacheElements: function() {
      this.$<%= _.underscored(name) %> = $('.<%= _.slugify(name) %>');
    },
    init: function() {
      this.cacheElements();

      this.$<%= _.underscored(name) %>.exists(function() {
        this.bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: <%= _.classify(name) %>.init
  };

});
