module.exports = function (assemble, config, browserSync){

  assemble.task('create.component', function(){

    // var name = assemble.options.component.replace(' ','-');
    // var dest = 'src/components/' + name;
    // var demo = 'src/global/docs/demo-component/';

    // console.log(dest);

    return assemble.src('src/global/docs/demo-component/**/*')
                  .pipe(assemble.dest('src/components/'));


  });

};

