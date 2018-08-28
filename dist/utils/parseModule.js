"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _getParseTypescript = _interopRequireDefault(require("./getParseTypescript"));

var _getParseBabel = _interopRequireDefault(require("./getParseBabel"));

module.exports = function parseModule(source, filename, type, preset) {
  var comment = !!preset;

  switch (type) {
    case 'ts':
      var tsOutput = (0, _getParseTypescript.default)(source);
      return (0, _getParseBabel.default)(tsOutput.outputText, filename, comment).code;
      break;

    default:
      return (0, _getParseBabel.default)(source, filename, comment).code;
  }
};