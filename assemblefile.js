
/*
 * Require
 * -------------------- */
var assemble = require('assemble')();
var browserSync = require('browser-sync').create();
var fs = require('fs');

/*
 * Global config object
 * -------------------- */
var config = {};
config.taskPath = './tasks/';
config.taskList = fs.readdirSync(config.taskPath);
config.package = JSON.parse(fs.readFileSync('package.json'));
config.versionString = '/*! '+ config.package.name +' */\n' +
                       '/*! Version: '+ config.package.version +' */\n' +
                       '/*! Created: ' + new Date() + ' */\n';
config.browserList = {
  browsers: [
    'IE >= 11',
    'Edge >= 13',
    'Chrome >= 50',
    'Firefox >= 47',
    'Safari >= 9',
    'iOS >= 9',
    'Android >= 4.4',
    'Samsung >= 4'
  ]
};

/*
 * Register tasks
 * -------------------- */
config.taskList.forEach(function (taskFile) {
  require(config.taskPath + taskFile)(assemble, config, browserSync);
});

/*
 * Tasks
 * -------------------- */

assemble.task('default', [
    'clean'
  ],
  assemble.parallel([
    'styles',
    'scripts',
    'html'
  ]), [
    'browserSync'
  ]
);

/*
 * Exports the instance
 * -------------------- */

module.exports = assemble;
