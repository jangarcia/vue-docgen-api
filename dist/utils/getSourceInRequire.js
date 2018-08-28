"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _getRequires = _interopRequireDefault(require("./getRequires"));

module.exports = function getSourceInRequire(code, file) {
  try {
    var requiresFromComponent = (0, _getRequires.default)(code);
    var output = [];
    Object.keys(requiresFromComponent).forEach(function (reqFromComponent) {
      var tempRequire = reqFromComponent.split('/');

      if (tempRequire[0] === '.' || tempRequire[0] === '..') {
        var folderFile = _path.default.dirname(file);

        output.push(_path.default.join(_path.default.normalize(folderFile), reqFromComponent));
      }
    });
    return output;
  } catch (err) {
    throw err;
  }
};