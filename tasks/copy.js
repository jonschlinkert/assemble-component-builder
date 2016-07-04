module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');

  assemble.task('copy.fonts', function(){
    return assemble.src('./node_modules/auspost-styles/dist/fonts/**/*.{woff,woff2}')
                  .pipe(rename({dirname: ''}))
                  .pipe(assemble.dest('./dist/fonts/'));
  });

  assemble.task('copy.cssImages', function(){
    return assemble.src('./src/components/**/css-images/*')
                  .pipe(rename({dirname: ''}))
                  .pipe(assemble.dest('./dist/css-images/'));
  });

  assemble.task('copy',
    assemble.parallel([
      'copy.fonts',
      'copy.cssImages'
    ])
  );

};
