define(['jquery', 'jquery.exists'], function($) {

  'use strict';

  var <%= class_name %> = {
    _cacheElements: function() {
      this.$<%= _name %> = $('.<%= slug_name %>');
    },
    init: function() {
      <%= class_name %>._cacheElements();

      <%= class_name %>.$<%= _name %>.exists(function() {
        <%= class_name %>._bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: <%= class_name %>.init
  };

});
