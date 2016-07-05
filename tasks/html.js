module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');
  var glob = require('glob');
  var path = require('path');
  var del = require('del');
  var fs = require('fs');
  var helpersFolder = '../src/global/html/helpers/';

  navigationData = function(){
    var temp = {};
    var data = [];

    for(var i in assemble.views.pages) {
      // for every pages
      // get the category, the title, and the link
      var view = assemble.views.pages[i];
      var href = view.path.replace(view.base+'/', '').replace('.hbs', '.html');
      var category = href.split('/')[0];
      var title = path.basename(href, '.html').replace('-', ' ');

      // exclude the index page
      // use the temp object to sort by category
      if(!view.data.isIndex) {
        temp[category] = temp[category] || [];
        temp[category].push({
          href: href,
          title: title
        });
      }
    }

    // convert to an array
    for (var i in temp){
      data.push({title: i, items: temp[i]});
    }

    return data;
  }

  assemble.helper('svgicon', require(helpersFolder+'svgicon.js'));

  assemble.helper('pre', require(helpersFolder+'pre.js'));

  assemble.task('html.load.icons', function (done){
    var data = {};
    var dataName = 'svgs';

    glob('./dist/svg-icons/*.svg', function(err, files){
      if(err) done(err);

      data[dataName] = files.map(function(file){
        return path.basename(file, '.svg');
      });

      assemble.data(data);
      done();
    });
  });

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
      '!src/**/demo-component/**/*.hbs',
      '!src/**/templates/**/*.hbs'
    ]);
    assemble.data({
      'navigation': navigationData
    });
    done();
  });

  assemble.task('html.build', function(){
    return assemble.toStream('pages')
                  .pipe(assemble.renderFile())
                  .pipe(rename(function (file) {
                    // convert extension to html
                    file.extname = '.html'
                    // for index.html, change the destination
                    // to dist/html
                    if(file.basename == 'index') {
                      file.dirname = '';
                    }
                  }))
                  .pipe(assemble.dest('dist/html'));
  });

  assemble.task('html', [
    'html.load.icons',
    'html.load',
    'html.build'
  ]);

};
