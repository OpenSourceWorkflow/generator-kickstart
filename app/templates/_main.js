/**
 * Main entry point into all Java Script.
 * @module Main
 * @requires jquery
 <% if (oldIE) { %>* @requires respondJS<% } %>
 * @requires jquery.exists
 * @author TODO: add author
 */
require([
  'jquery',<% if (oldIE) { %>
  'respondJS',<% } %>
  'jquery.exists'
], function($, <% if (oldIE) { %>respondJS, <% } %>exists) {

  'use strict';

  var Main = {
    /**
     * Caches all jQuery Objects for later use.
     * @function _cacheElements
     * @private
     */
    cacheElements: function() {
      // this.$bar = $('.bar');
    },
    /**
     * Initiates the module.
     * @function init
     * @public
     */
    init: function() {
      this.cacheElements();
    }
  };

  Main.init();

});
