module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');

  assemble.task('svg.icons', function(){
    return assemble.src('./src/global/svg-icons/*.svg')
                  .pipe(rename({dirname: ''}))
                  .pipe(assemble.dest('./dist/svg-icons/'));
  });

  assemble.task('svg',
    assemble.parallel([
      'svg.icons'
    ])
  );

};
