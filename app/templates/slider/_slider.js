define(['jquery', 'jquery.exists'], function() {

  'use strict';

  /************************************************************
  @description Slider
  *************************************************************/
  var Slider = {
    _cacheElements: function() {
      this.$slider = $('.slider');
    },
    init: function() {
      Slider._cacheElements();

      Slider.$slider.exists(function() {
        Slider._bindEvents();
      });
    },
    _bindEvents: function() {
    }
  };

  return {
    init: Slider.init
  };

});
