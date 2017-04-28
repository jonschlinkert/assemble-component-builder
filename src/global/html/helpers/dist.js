var path = require('path');

module.exports = function() {
  var view = this.view;
  var a = path.join('dist', 'html', view.path.replace(view.base, ''));
  var b = path.join('dist', 'html');
  return path.relative(a, b);
};
