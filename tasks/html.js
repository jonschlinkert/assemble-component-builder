module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');
  var glob = require('glob');
  var path = require('path');

  assemble.task('html.load', function(done){
    assemble.partials([
      'src/**/partials/*.hbs'
    ]);
    assemble.layouts([
      'src/**/layouts/*.hbs'
    ]);
    assemble.data([
      'src/**/data/*.json'
    ]);
    assemble.pages([
      'src/**/*.hbs',
      '!src/**/layouts/*.hbs',
      '!src/**/partials/*.hbs',
      '!src/**/index.hbs'
    ]);
    done();
  });

  assemble.task('html.build', function(){
    return assemble.toStream('pages')
                  .pipe(assemble.renderFile())
                  .pipe(rename({extname: '.html'}))
                  .pipe(assemble.dest('dist/html'));
  });

  assemble.task('html', [
    'html.load',
    'html.build'
  ], function(done){
    browserSync.reload();
    done();
  });

};
