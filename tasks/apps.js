module.exports = function (assemble, config, browserSync){

  var handlebars = require('gulp-handlebars');
  var wrap = require('gulp-wrap');
  var declare = require('gulp-declare');
  var concat = require('gulp-concat');
  var eslint = require('gulp-eslint');
  var notify = require('gulp-notify');
  var glob = require('glob');
  var browserify = require('browserify');
  var babelify = require('babelify');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var babel = require('gulp-babel');
  var injectString = require('gulp-inject-string');
  var rename = require('gulp-rename');
  var es = require('event-stream');
  var fs = require('fs');
  var path = require('path');

  assemble.task('apps.templates', function(done){

    function getFolders(dir){
      return fs.readdirSync(dir).filter(function(file){
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
    }

    var appsPath = 'src/apps';
    var folders = getFolders(appsPath);

    var tasks = folders.map(function(folder){
      var templatesFolder = path.join(appsPath, folder, 'templates');
      return assemble.src(path.join(templatesFolder, '**/*.hbs'))
                    .pipe(handlebars())
                    .pipe(wrap('Handlebars.template(<%= contents %>)'))
                    .pipe(declare({
                      noRedeclare: true,
                      root: 'module.exports'
                    }))
                    .pipe(concat('templates.js'))
                    .pipe(injectString.prepend('import Handlebars from \'handlebars\';\n'))
                    .pipe(assemble.dest(templatesFolder));
    });

    es.merge(tasks).on('end', done);
  });

  assemble.task('apps.scripts', function(done){

    assemble.src([
            'src/apps/**/*.js',
            '!src/apps/**/templates/*js'
          ])
          .pipe(eslint())
          .pipe(eslint.formatEach())
          .pipe(eslint.failAfterError())
          .on('error', notify.onError({ message: 'There is a JS error, please look at your terminal for details'}));

    glob('src/apps/**/js/*.js', function(err, files){
      if(err) done(err);

      var tasks = files.map(function(entry){
        return browserify({
              entries: [entry],
              debug: true
            })
            .transform('babelify', { presets: ['es2015'] })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(babel({compact: true}))
            .pipe(injectString.prepend(config.versionString))
            .pipe(rename({dirname: ''}))
            .pipe(assemble.dest('dist/js/'));
      });
      es.merge(tasks).on('end', done);
    });
  });

  assemble.task('apps', [
    'apps.templates',
    'apps.scripts',
    'clean.templates'
  ]);

};
