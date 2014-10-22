define(['jquery', 'jquery.exists'], function() {

  'use strict';

  /************************************************************
  @description Slider
  *************************************************************/
  var Slider = {
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
    init: Slider.init
  };

});
