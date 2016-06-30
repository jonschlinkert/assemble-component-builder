
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
config.versionString = '/*! Australia Post */\n' +
											 '/*! Version: '+ JSON.parse(fs.readFileSync('./package.json')).version +' */\n' +
											 '/*! Created: ' + new Date() + ' */\n';

// Assemble default task
assemble.task('default', [
	'clean',
	'html',
	'browserSync',
	'watch'
]);




module.exports = assemble;
