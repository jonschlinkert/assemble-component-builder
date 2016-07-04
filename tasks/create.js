module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');
  var replace = require('gulp-replace');

  assemble.task('create', function(){
    if (typeof assemble.options.component !== 'undefined') {

      function camelCase(string) {
        return string.split(/-| /).map(function(str, i){
          if (i!==0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }
          return str;
        }).join('');
      }

      var name = assemble.options.component;
      var nameAll = name.replace(/ /g, '-');
      var nameJs = camelCase(name);

      return assemble.src('src/global/demo/demo-component/**/*')
                    .pipe(replace(/<%name%>/g, nameAll))
                    .pipe(replace(/<%name:js%>/g, nameJs))
                    .pipe(rename(function(path){
                      if (path.extname !== '') {
                        path.basename = nameAll;
                      }
                    }))
                    .pipe(assemble.dest('src/components/'+ nameAll));
    }
  });
};




