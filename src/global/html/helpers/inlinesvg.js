var fs = require('fs');

module.exports = function(file) {

  var content = '';
  var icon = './dist/svg-icons/'+file+'.svg';
  var illu = './dist/svg-illustrations/'+file+'.svg';

  try {
    content = fs.readFileSync(icon, 'utf8');
  } catch (e) {
    try {
      content = fs.readFileSync(illu, 'utf8');
    } catch (e) {
      console.log('svg '+ file +' not found');
    }
  }

  return content;
};
