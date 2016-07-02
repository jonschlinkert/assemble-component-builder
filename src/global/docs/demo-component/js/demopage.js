;(function($, COMPONENTS, HELPERS) {
  'use strict';

  COMPONENTS.<%name:js%> = (function(){

    // private function are expected
    // to start by an underscore
    function _private(){
      console.log('_private function is called');
    }

    function init(){
      _private();
      console.log('init function is called');
    }

    return {
      init: init
    };

  })();

  COMPONENTS.<%name:js%>.init();

})(jQuery, apAEM.COMPONENTS, apAEM.HELPERS);