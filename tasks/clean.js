module.exports = function (assemble, config, browserSync){

  var del = require('del');

  /*
   * assemble clean
   * - delete the dist folder
   * -------------------- */

  assemble.task('clean', function(){
    return del([
      './dist/'
    ]);
  });

};
