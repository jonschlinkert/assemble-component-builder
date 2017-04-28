module.exports = function(html) {

  var content;
  var type = '';
  var pre = '';

  if(typeof html.hash.type !== 'undefined') {
    type = ' class="'+html.hash.type+'"';
  }

  if(typeof html.hash.partial !== 'undefined' && this.app.views.partials[html.hash.partial] ) {
    content = this.app.views.partials[html.hash.partial].orig;
  } else {
    content = html.fn(this)
                  .replace(/%{/g, '{{')
                  .replace(/}%/g, '}}');
  }

  content = '\n' + content.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
     return '&#'+i.charCodeAt(0)+';';
  });

  content = content.replace(new RegExp(content.match(/\s*\n[\t\s]*/), 'g'),'\n');

  pre += '<pre><code'+type+'>';
  pre += content;
  pre += '</code></pre>';

  return pre;
};
