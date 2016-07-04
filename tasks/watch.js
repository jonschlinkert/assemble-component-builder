module.exports = function (assemble, config, browserSync){

  assemble.use(require('base-watch')());

  assemble.task('watch', function(){

    assemble.watch([
      'src/**/*.hbs',
      'src/**/data/*.json',
      '!src/**/demo-component/**/*.hbs',
      '!src/**/templates/**/*.hbs'
    ], [
      'html'
    ], function(done){
       browserSync.reload();
       done();
    });

    assemble.watch([
      'src/**/*.scss',
    ], [
      'styles'
    ], function(done){
       browserSync.reload();
       done();
    });

    assemble.watch([
      'src/global/js/*.js',
      'src/components/**/js/*.js'
    ], [
      'scripts.main'
    ], function(done){
       browserSync.reload();
       done();
    });

    assemble.watch([
      'src/global/demo/js/*.js'
    ], [
      'scripts.demo'
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
