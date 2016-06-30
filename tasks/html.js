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

  assemble.task('html.load.index', function(done){
    var data = {};
    var dataName = 'htmls';
    var dataContent = [];
    var temp = {};

    glob('dist/html/**/*.html', function(err, files){
      if(err) done(err);
      files.map(function(file){
        var href = file.replace('dist/html/', '');
        var category = href.split('/')[0];
        var title = path.basename(href, '.html').replace('-', ' ');

        if (title !== 'index') {
          temp[category] = temp[category] || [];
          temp[category].push({
            href: href,
            title: title
          });
        }
      });

      for (var i in temp){
        dataContent.push({title: i, items: temp[i]});
      }

      data[dataName] = dataContent;
      assemble.data(data);
      done();
    });
  })

  assemble.task('html.build', function(){
    return assemble.toStream('pages')
                  .pipe(assemble.renderFile())
                  .pipe(rename({extname: '.html'}))
                  .pipe(assemble.dest('dist/html'));
  });

  assemble.task('html.build.index', function(){
    return assemble.src('./src/**/index.hbs')
                  .pipe(assemble.renderFile())
                  .pipe(rename({dirname: '', extname: '.html'}))
                  .pipe(assemble.dest('dist/html/'));

  });

  assemble.task('html', [

    'html.load',
    'html.build',
    'html.load.index',
    'html.build.index'

  ], function(done){
    browserSync.reload();
    done();
  });

  // expected result :
  // - load all the files required for assemble
  // - build all the components
  // - create a new data instance from the dist folder
  // - build the index html page
  // - change on .hbs or .json are reflected during the watch task

  // defect :
  // - when the task html.index task is added to the stream,
  //   data are not updated anymore

};
