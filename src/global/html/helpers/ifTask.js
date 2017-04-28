module.exports = function(taskName, options) {

  if(taskName === this.options.tasks[0]) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
