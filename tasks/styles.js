module.exports = function (assemble, config, browserSync){

  var injectString = require('gulp-inject-string');
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var moduleImporter = require('sass-module-importer');
  var notify = require('gulp-notify');
  var autoprefixer = require('gulp-autoprefixer');

  assemble.task('styles', function (){
    return assemble.src([
                    'src/global/sass/*.scss',
                    'src/global/demo/sass/*.scss'
                  ])
                  .pipe(injectString.prepend(config.versionString))
                  .pipe(sourcemaps.init())
                  .pipe(sass({ style: 'expanded', importer: moduleImporter() }))
                    .on('error', notify.onError(function (error){ return error.message; }))
                  .pipe(autoprefixer(['ie 11', 'Edge >= 13', 'Chrome >= 41', 'Firefox >= 37', 'Safari >= 7', 'iOS >= 7', 'Android >= 4.4']))
                  .pipe(sourcemaps.write('./'))
                  .pipe(assemble.dest('./dist/css/'));
  });

};
