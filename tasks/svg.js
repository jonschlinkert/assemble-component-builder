module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');
  var svgo = require('gulp-svgo');

  assemble.task('svg.icons', function(){
    return assemble.src('./src/global/svg-icons/*.svg')
                  .pipe(svgo())
                  .pipe(rename({dirname: ''}))
                  .pipe(assemble.dest('./dist/svg-icons/'));
  });

  assemble.task('svg',
    assemble.parallel([
      'svg.icons'
    ])
  );

};
