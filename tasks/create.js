module.exports = function (assemble, config, browserSync){

  var fs = require('fs');
  var path = require('path');

  assemble.task('create.component', function(){

    var name = assemble.options.component.replace(' ','-');
    var dest = 'src/components/' + name;
    var docs = 'src/global/docs/';
    var standardScript = fs.readFileSync(docs+ 'standard-script.txt','utf8').replace('/[name]/g', name);


    var folders = [
      {
        name: '',
        ext: '.hbs',
        content: '{{> '+name+' '+name+'}}'
      },
      {
        name: 'data',
        ext: '.json',
        content: '{ "content": "hello"}'
      },
      {
        name: 'js',
        ext: '.js',
        content: standardScript
      },
      {
        name: 'partials',
        ext: '.hbs',
        content: '<p class="'+name+'-test">{{content}}</p>'
      },
      {
        name: 'sass',
        ext: '.scss',
        content: '.'+name+'-test {\n' +
                 '  color: red;\n' +
                 '}'
      }
    ];


  });

};

      // folders.map(function(folder){

      //   console.log(dest, folder.name);
      //   fs.mkdir(path.join(dest, folder.name), function(){
      //     fs.writeFile(path.join(dest, folder.name, name+folder.ext), folder.content);
      //   });
      // });

