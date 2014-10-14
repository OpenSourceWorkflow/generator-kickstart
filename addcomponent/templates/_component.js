define(['jquery', 'jquery.exists'], function() {

  'use strict';

  var <%= _.classify(name) %> = {
    _cacheElements: function() {
      this.$<%= _.underscored(name) %> = $('.<%= _.slugify(name) %>');
    },
    _init: function() {
      this.cacheElements();

      this.$<%= _.underscored(name) %>.exists(function() {
        this.bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  <%= _.classify(name) %>._init();

  // return {
  //   : <%= _.classify(name) %>.
  // };

});
