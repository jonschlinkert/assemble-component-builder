;(function($) {
  'use strict';

  $('pre code').each(function(i, el){
    hljs.highlightBlock(el);
  });

})(jQuery);
