
// all javascript files are concated by default in main.js
;(function($, COMPONENTS, HELPERS) {
  'use strict';

  // component are expected to be namespaced
  // in namespace.COMPONENTS
  COMPONENTS.<%name:js%> = (function(){

    // private function are expected
    // to start by an underscore
    // to start by an underscore:
    // function _private(){}

    function init(){
      console.log('<%name:js%> is called');
    }

    return {
      init: init
    };

  })();

  COMPONENTS.<%name:js%>.init();

// if you don't need any helpers,
// do not register the namespace.HELPERS
})(jQuery, apAEM.COMPONENTS, apAEM.HELPERS);
