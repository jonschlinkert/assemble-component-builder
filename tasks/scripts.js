module.exports = function (assemble, config, browserSync){

  var eslint = require('gulp-eslint');
  var notify = require('gulp-notify');
  var babel = require('gulp-babel');
  var concat = require('gulp-concat');
  var injectString = require('gulp-inject-string');

  assemble.task('scripts', function (){
    return assemble.src([
              './src/global/js/namespace.js',
              './src/global/js/vendors/**/*.js',
              './src/global/js/helpers/**/*.js',
              './src/components/**/js/*.js'
            ])
            .pipe(eslint({
              parserOptions: {sourceType: 'script'}
            }))
            .pipe(eslint.formatEach())
            .pipe(eslint.failAfterError())
            .on('error', notify.onError({
              message: 'There is a JS error, please look at your terminal for details'
            }))
            .pipe(concat('main.js'))
            .pipe(babel({compact: false}))
            .pipe(injectString.prepend(config.versionString))
            .pipe(assemble.dest('./dist/js/'))
            .pipe(browserSync.stream());
  });

};