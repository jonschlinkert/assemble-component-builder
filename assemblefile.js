
var assemble = require('assemble')();
var browserSync = require('browser-sync').create();
var fs = require('fs');
var rename = require('gulp-rename');

assemble.helpers(require('handlebars-helpers')());

assemble.task('load', function(done){
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
    '!src/**/partials/*.hbs'
  ]);
  done();
});

assemble.task('build', function(){
  return assemble.toStream('pages')
                .pipe(assemble.renderFile())
                .pipe(rename({extname:'.html'}))
                .pipe(assemble.dest('dist/html'));
});

assemble.task('default', [
  'load',
  'build'
]);

module.exports = assemble;
