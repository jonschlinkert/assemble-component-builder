var fs = require('fs');

module.exports = function(file) {

  var content = '';
  var path = './dist/svg-icons/'+file+'.svg';

  try {
    content = fs.readFileSync(path, 'utf8');
  } catch (e) {
    console.log('icon not found');
  }

  return content;
};
