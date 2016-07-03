module.exports = function (assemble, config, browserSync){

  assemble.use(require('base-watch')());

  assemble.task('watch', function(){

    assemble.watch([
      'src/**/*.hbs',
      'src/**/data/*.json',
      '!src/**/demo-component/**/*.hbs',
      '!src/**/templates/**/*.hbs'
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
      'src/global/js/namespace.js',
      'src/global/js/vendors/**/*.js',
      'src/global/js/helpers/**/*.js',
      'src/components/**/js/*.js'
    ], [
      'clean.scripts',
      'scripts'
    ], function(done){
       browserSync.reload();
       done();
    });

    assemble.watch([
      'src/apps/**/js/**/*.js',
      'src/apps/**/templates/**/*.hbs',
      '!src/apps/**/templates/*.js'
    ], [
      'apps'
    ], function(done){
       browserSync.reload();
       done();
    });

  });

};
