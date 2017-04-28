module.exports = function (assemble, config, browserSync){

  var injectString = require('gulp-inject-string');
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var notify = require('gulp-notify');
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer');
  var rename = require('gulp-rename');
  var stylelint = require('stylelint');
  var reporter = require('postcss-reporter');
  var syntaxScss = require('postcss-scss');


  /*
   * assemble styles.lint
   * -------------------- */

  assemble.task('styles.lint', function() {
    var processors = [
      stylelint(),
      reporter({
        clearMessages: true,
        clearReportedMessages: true,
        throwError: false
      })
    ];

    return assemble.src([
                    'src/**/*.scss'
                  ])
                  .pipe(postcss(processors, {syntax: syntaxScss}));
  });

  /*
   * assemble styles.compile
   * - compile and create the sourcemap for any scss files
   * - autoprefixe following config.browserList
   * - all scss are outputed to dist/css/
   * -------------------- */

  assemble.task('styles.compile', function () {
    return assemble.src([
                    'src/**/*.scss'
                  ])
                  .pipe(injectString.prepend(config.versionString))
                  .pipe(sourcemaps.init())
                  .pipe(sass({ style: 'expanded' }))
                    .on('error', notify.onError(function (error){ return error.message; }))
                  .pipe(postcss([autoprefixer(config.browserList)]))
                  .pipe(sourcemaps.write('./'))
                  .pipe(rename({dirname: ''}))
                  .pipe(assemble.dest('./dist/css/'));
  });

  /*
   * assemble styles
   * -------------------- */

  assemble.task('styles', [
    assemble.parallel([
      'styles.lint',
      'styles.compile'
    ])
  ]);

};
