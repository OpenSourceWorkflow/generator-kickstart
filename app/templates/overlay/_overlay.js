define(['jquery', 'jquery.exists'], function() {

  'use strict';

  /************************************************************
  @description Overlay
  *************************************************************/
  var Overlay = {
    _cacheElements: function() {
      this.$overlay = $('.overlay');
    },
    init: function() {
      Overlay._cacheElements();

      Overlay.$overlay.exists(function() {
        Overlay._bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: Overlay.init
  };

});
