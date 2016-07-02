module.exports = function (assemble, config, browserSync){

  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var cssnano = require('gulp-cssnano');
  var injectString = require('gulp-inject-string');

  assemble.task('minification.css', function(){
    return assemble.src('dist/css/*.css')
                  .pipe(cssnano({autoprefixer: false}))
                  .pipe(rename({suffix: '.min'}))
                  .pipe(injectString.prepend(config.versionString))
                  .pipe(assemble.dest('dist/css/'));
  });

  assemble.task('minification.js', function(){
    return assemble.src('dist/js/*.js')
                  .pipe(uglify())
                  .pipe(rename({suffix: '.min'}))
                  .pipe(injectString.prepend(config.versionString))
                  .pipe(assemble.dest('dist/js/'));
  });

  assemble.task('minification',
    assemble.parallel([
      'minification.js',
      'minification.css'
    ])
  );

};
