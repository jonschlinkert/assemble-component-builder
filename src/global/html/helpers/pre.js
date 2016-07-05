module.exports = function(html) {

  var content = html.fn(this)
    .replace(/{/g, '{{')
    .replace(/}/g, '}}')
    .replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
       return '&#'+i.charCodeAt(0)+';';
    });

  return '<pre><code>'+content+'</code></pre>';
};
