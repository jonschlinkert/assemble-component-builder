module.exports = function (assemble, config, browserSync){

  var rename = require('gulp-rename');
  var replace = require('gulp-replace');

  assemble.task('create', function() {

    function camelCase(string) {
      return string.split(/-| /).map(function(str, i){
        if (i!==0) {
          return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return str;
      }).join('');
    }

    if (typeof assemble.options.component !== 'undefined') {
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

    if (typeof assemble.options.app !== 'undefined') {
      var name = assemble.options.app;
      var nameAll = name.replace(/ /g, '-');
      var nameJs = camelCase(name);

      return assemble.src('src/global/demo/demo-app/**/*')
                    .pipe(replace(/<%name%>/g, nameAll))
                    .pipe(replace(/<%name:js%>/g, nameJs))
                    .pipe(rename(function(path){
                      if (path.extname !== '' && path.dirname !== 'js/import' && path.dirname !== 'templates') {
                        path.basename = nameAll;
                      }
                    }))
                    .pipe(assemble.dest('src/apps/'+ nameAll));
    }

  });
};




