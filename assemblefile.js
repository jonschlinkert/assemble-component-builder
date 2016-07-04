
// Require
var assemble = require('assemble')();
var browserSync = require('browser-sync').create();
var fs = require('fs');

// Create config object
var config = {};

// Load all the tasks
var taskPath = './tasks/';
var taskList = fs.readdirSync(taskPath);

taskList.forEach(function (taskFile) {
  require(taskPath + taskFile)(assemble, config, browserSync);
});

// Set config.versionString
var packageJson = JSON.parse(fs.readFileSync('./package.json'));

config.versionString = '/*! '+ packageJson.name +' */\n' +
                       '/*! Version: '+ packageJson.version +' */\n' +
                       '/*! Created: '+ new Date() +' */\n';

// Assemble default task
assemble.task('default',
  [
    'clean',
  ], assemble.parallel([
    'copy', 'svg'
  ]), assemble.parallel([
    'html', 'styles', 'scripts', 'apps'
  ]), [
    'browserSync',
    'watch'
  ]
);

// Assemble production task
assemble.task('prod',
  [
    'clean',
  ], assemble.parallel([
    'copy', 'svg'
  ]), assemble.parallel([
    'html', 'styles', 'scripts', 'apps'
  ]), [
    'minification'
  ]
);

module.exports = assemble;
