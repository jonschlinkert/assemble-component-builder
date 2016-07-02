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

    assemble.watch([
      'src/**/*.scss',
    ], [
      'clean.styles',
      'styles'
    ], function(done){
       browserSync.reload();
       done();
    });

    assemble.watch([
      './src/global/js/namespace.js',
      './src/global/js/vendors/**/*.js',
      './src/global/js/helpers/**/*.js',
      './src/components/**/js/*.js'
    ], [
      'scripts'
    ], function(done){
       browserSync.reload();
       done();
    });

  });

};
