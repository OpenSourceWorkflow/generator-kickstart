define(['jquery', 'jquery.exists'], function() {

  'use strict';

  var <%= _.classify(name) %> = {
    cacheElements: function() {
      this.$<%= _.underscored(name) %> = $('.<%= _.slugify(name) %>');
    },
    init: function() {
      this.cacheElements();

      this.$<%= _.underscored(name) %>.exists(function() {
        this.bindEvents();
      });
    },
    bindEvents: function() {
    }
  };

  <%= _.classify(name) %>.init();

  // return {
  //   : <%= _.classify(name) %>.
  // };

});
