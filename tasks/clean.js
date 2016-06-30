module.exports = function (assemble, config, browserSync){

  var del = require('del');

  assemble.task('clean', function(){
    return del([
      './dist/'
    ]);
  });

};
