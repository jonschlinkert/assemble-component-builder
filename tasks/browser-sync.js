module.exports = function (assemble, config, browserSync){

  /*
   * assemble browserSync
   * - run the webserver
   * -------------------- */

  assemble.task('browserSync', function(){
    browserSync.init({
      server: {
        baseDir: './dist/'
      },
      open: true,
      https: false,
      notify: false,
      reloadDebounce: 500,
      startPath: '/html/'
    });
  });

};
