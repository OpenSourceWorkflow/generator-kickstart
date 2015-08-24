/**
 * TODO: add description
 * @module <%= class_name %>
 * @requires jquery
 * @requires jquery.exists
 * @author TODO: add author
 */
define(['jquery', 'jquery.exists'], function($, exists) {

  'use strict';

  var <%= class_name %> = {

    /**
     * Caches all jQuery Objects for later use.
     * @function _cacheElements
     * @private
     */
    _cacheElements: function() {
      this.$<%= _name %> = $('.<%= slug_name %>');
    },

    /**
     * Initiates the module.
     * @function init
     * @public
     */
    init: function() {
      <%= class_name %>._cacheElements();

      <%= class_name %>.$<%= _name %>.exists(function() {
        <%= class_name %>._bindEvents();
      });
    },

    /**
     * Binds all events to jQuery DOM objects.
     * @function _bindEvents
     * @private
     */
    _bindEvents: function() {
    }

  };

  return /** @alias module:<%= class_name %> */ {
    /** init */
    init: <%= class_name %>.init
  };

});
