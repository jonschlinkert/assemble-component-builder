;(function($) {
  'use strict';

  $('pre code').each(function(i, el){

    var $el = $(el);
    var html = $el.html().replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
       return '&#'+i.charCodeAt(0)+';';
    });

    $el.html(html);
    hljs.highlightBlock(el);

  });


})(jQuery);
