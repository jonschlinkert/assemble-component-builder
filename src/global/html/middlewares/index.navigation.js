var path = require('path');

var navigation = (function() {

  var DATA = {};

  function _extractViewData(view) {
    var viewData = {};

    viewData.href        = view.path.replace(view.base + path.sep, '').replace('.hbs', '.html');
    viewData.title       = view.data.pageTitle   || path.basename(viewData.href, '.html').replace(/-/g, ' ');
    viewData.category    = view.data.category    || view.path.replace(view.base + path.sep, '').split(path.sep)[0];
    viewData.subCategory = view.data.subCategory || viewData.category;
    viewData.isIndex     = !!view.data.isIndex;

    return viewData;
  }

  function _organiseByCategories(viewData) {
    var temp = DATA;

    if (!viewData.isIndex) {
      temp[viewData.category] = temp[viewData.category] || {};
      temp[viewData.category][viewData.subCategory] = temp[viewData.category][viewData.subCategory] || [];
      temp[viewData.category][viewData.subCategory].push(viewData);
    }

    return temp;
  }

  function _objectToArray(obj) {
    var temp = [];

    for (var i in obj) {
      var subData = [];

      for (var j in obj[i]) {

        if(obj[i][j].length) {
          subData.push({
            subTitle: j,
            subItems: obj[i][j]
          });
        }
      }

      temp.push({
        title: i,
        items: subData
      });
    }

    return temp;
  }

  function _sortCategories(array) {
    return array.sort(function (a, b) {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }

  function _sortSubCategories(array) {
    for(var i in array) {
      array[i].items.sort(function(a, b) {
        if (a.subItems.length < b.subItems.length) return 1;
        if (a.subItems.length > b.subItems.length) return -1;
        return 0;
      });
    }

    return array;
  }

  function onLoad(view, next) {
    var viewData;

    viewData = _extractViewData(view);
    DATA     = _organiseByCategories(viewData);

    next();
  }

  function preRender(view, next) {
    var convertedData;
    var sortedData;

    convertedData = _objectToArray(DATA);
    sortedData    = _sortSubCategories(_sortCategories(convertedData));

    view.data.navigation = sortedData;
    view.path = path.join(view.base, view.basename);

    DATA = {};
    next(null, view);
  }

  return {
    onLoad: onLoad,
    preRender: preRender
  }

}());

module.exports = navigation;
