module.exports = function (assemble, config, browserSync){

  var del = require('del');

  assemble.task('clean', function(){
    return del('dist/');
  });

  assemble.task('clean.html', function(){
    return del('dist/html/');
  });

  assemble.task('clean.styles', function(){
    return del('dist/css/');
  });

  assemble.task('clean.scripts', function(){
    return del('dist/js/main.js');
  });

  assemble.task('clean.templates', function(done){
    return del('src/apps/**/templates.js');
  });

};
