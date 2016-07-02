module.exports = function (assemble, config, browserSync){

  assemble.task('browserSync', function(done){
    browserSync.init({
      server: {
        baseDir: './dist/'
      },
      open: 'local',
      https: false
    });
    done();
  });

};
