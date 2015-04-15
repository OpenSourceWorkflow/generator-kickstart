define(['jquery', 'jquery.exists'], function($) {

  'use strict';

  var <%= string.classify(name) %> = {
    _cacheElements: function() {
      this.$<%= string.underscored(name) %> = $('.<%= string.slugify(name) %>');
    },
    init: function() {
      <%= string.classify(name) %>._cacheElements();

      <%= string.classify(name) %>.$<%= string.underscored(name) %>.exists(function() {
        <%= string.classify(name) %>._bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: <%= string.classify(name) %>.init
  };

});
