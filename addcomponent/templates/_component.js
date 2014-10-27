define(['jquery', 'jquery.exists'], function() {

  'use strict';

  var <%= _.classify(name) %> = {
    _cacheElements: function() {
      this.$<%= _.underscored(name) %> = $('.<%= _.slugify(name) %>');
    },
    init: function() {
      <%= _.classify(name) %>._cacheElements();

      <%= _.classify(name) %>.$<%= _.underscored(name) %>.exists(function() {
        <%= _.classify(name) %>._bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: <%= _.classify(name) %>.init
  };

});
