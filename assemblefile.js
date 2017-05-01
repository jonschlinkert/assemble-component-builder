
var assemble = require('assemble')();

assemble.task('default', function(done){
  assemble.partials('src/**/partials/*.hbs');
  assemble.layouts('src/**/layouts/*.hbs');
  assemble.data('src/**/data/*.json');
  assemble.pages('src/**/*.hbs', {
    ignore: ['**/layouts/**', '**/partials/**']
  });

  console.log(assemble.views);
  done();
});

module.exports = assemble;
