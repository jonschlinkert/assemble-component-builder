
var assemble = require('assemble')();
var browserSync = require('browser-sync').create();
var fs = require('fs');

var config = {};

var taskPath = './tasks/';
var taskList = fs.readdirSync(taskPath);

taskList.forEach(function (taskFile) {
  require(taskPath + taskFile)(assemble, config, browserSync);
});

var packageJson = JSON.parse(fs.readFileSync('package.json'));

config.versionString = '/*! '+ packageJson.name +' */\n' +
                       '/*! Version: '+ packageJson.version +' */\n' +
                       '/*! Created: '+ new Date() +' */\n';



assemble.task('default', [
  'compile',
  'browserSync',
  'watch'
]);


assemble.task('prod', [
  'compile',
  'minification'
]);


assemble.task('compile', [
  'clean'
  ], assemble.parallel([
    'copy',
    'svg'
  ]), assemble.parallel([
    'html',
    'styles',
    'scripts',
    'apps'
  ])
);


module.exports = assemble;
