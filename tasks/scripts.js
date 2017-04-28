module.exports = function (assemble, config, browserSync){

  var babel = require('gulp-babel');
  var concat = require('gulp-concat');
  var injectString = require('gulp-inject-string');
  var eslint = require('gulp-eslint');

  /*
   * assemble scripts.lint
   * -------------------- */

  assemble.task('scripts.lint', function (){
    return assemble.src([
              'src/global/js/namespace.js',
              'src/**/js/**/*.js'
            ])
            .pipe(eslint(config.eslint))
            .pipe(eslint.formatEach())
            .pipe(eslint.failAfterError());
  });

  /*
   * assemble scripts.app
   * - concat all javascript files
   * - compile using babel
   * - app.js is outputed to dist/js/
   * -------------------- */

  assemble.task('scripts.app', function (){
    return assemble.src([
              'src/global/js/namespace.js',
              'src/**/js/**/*.js'
            ])
            .pipe(concat('app.js'))
            .pipe(babel({compact: true}))
            .pipe(injectString.prepend(config.versionString))
            .pipe(assemble.dest('dist/js/'));
  });

  /*
   * assemble scripts
   * -------------------- */

  assemble.task('scripts', [
    assemble.parallel([
      'scripts.lint',
      'scripts.app'
    ])
  ]);

};
