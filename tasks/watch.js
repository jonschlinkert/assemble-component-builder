module.exports = function (assemble, config, browserSync){

  assemble.use(require('base-watch')());

  assemble.task('watch', function(){

    assemble.watch([
      'src/**/*.hbs',
      'src/**/data/*.json'
    ], [
      'clean.html',
      'html'
    ], function(done){
       browserSync.reload();
       done();
    });

  });

};
