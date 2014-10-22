define(['jquery', 'jquery.exists'], function() {

  'use strict';

  /************************************************************
  @description Overlay
  *************************************************************/
  var Overlay = {
    _cacheElements: function() {
    },
    init: function() {
      this.cacheElements();
      this.bindEvents();
    },
    _bindEvents: function() {
    }
  };

  return {
    init: Overlay.init
  };

});
