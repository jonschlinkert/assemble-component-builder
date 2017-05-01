
var assemble = require('assemble')();

assemble.task('default', function(done){
  assemble.partials('src/**/partials/*.hbs');
  assemble.layouts('src/**/layouts/*.hbs');
  assemble.pages(['src/components/**/*.hbs', 'src/**/pages/*.hbs']);
  assemble.data('src/**/data/*.json');

  console.log(assemble.views);
  done();
});

module.exports = assemble;
