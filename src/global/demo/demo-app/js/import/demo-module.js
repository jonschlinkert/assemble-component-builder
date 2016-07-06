// import Handlebars from 'handlebars/runtime'      // example of loading a module from npm.
import templates  from '../../templates/templates'  // example of loading a module from the filesystem.

let Demo = (function() {

  // a private variable within this closure.
  let $container = document.getElementsByClassName('<%name%>--container')[0];

  // a private function.
  function _insertTemplate() {
    // compile and insert the html content.
    let htmlContent = templates.<%name%>();
    $container.innerHTML = htmlContent;
  };

  class Demo {
    constructor(initValue = '') {
      // you could initialise member variables here.
      this.member = initValue;
    }

    // a public function.
    init() {

      _insertTemplate();
    }
  }

  // expose the class.
  return Demo;
}());

export default Demo
