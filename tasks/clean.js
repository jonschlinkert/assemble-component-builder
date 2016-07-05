module.exports = function (assemble, config, browserSync){

  var del = require('del');

  assemble.task('clean', function(){
    return del('dist/');
  });

  assemble.task('clean.templates', function(){
    return del('src/apps/**/templates.js');
  });

};
