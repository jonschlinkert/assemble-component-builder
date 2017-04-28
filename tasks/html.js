
module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');

  /*
   * assemble middlewares
   * -------------------- */

  var middlewareFolder = '../src/global/html/middlewares';
  var navigation = require(middlewareFolder+'/index.navigation.js');

  assemble.pages.onLoad(/\.hbs$/, navigation.onLoad);

  assemble.pages.preRender(/index\.hbs$/, navigation.preRender);

  /*
   * assemble helpers
   * -------------------- */

  var helpersFolder = '../src/global/html/helpers';

  assemble.helper('dist', require(helpersFolder+'/dist.js'));

  assemble.helper('pre', require(helpersFolder+'/pre.js'));

  assemble.helper('ifTask', require(helpersFolder+'/ifTask.js'));

  assemble.helpers(require('handlebars-helpers')());

  /*
   * assemble html.load
   * -------------------- */

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
    assemble.data({
      package: config.package
    });
    assemble.pages([
      'src/**/*.hbs',
      '!src/**/layouts/*.hbs',
      '!src/**/partials/*.hbs'
    ]);
    done();
  });

  /*
   * assemble html.build
   * -------------------- */

  assemble.task('html.build', function(){
    return assemble.toStream('pages')
                  .pipe(assemble.renderFile())
                  .pipe(rename({extname:'.html'}))
                  .pipe(assemble.dest('dist/html'));
  });

  /*
   * assemble html
   * -------------------- */

  assemble.task('html', [
    'html.load',
    'html.build'
  ]);

};
