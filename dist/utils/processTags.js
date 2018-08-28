"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processTags;

var _blockTags = _interopRequireDefault(require("./blockTags"));

var _getTag = _interopRequireDefault(require("./getTag"));

function processTags(docPart) {
  var ignoreTags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var obj = {};

  if (docPart) {
    _blockTags.default.filter(function (tagName) {
      return ignoreTags.indexOf(tagName) === -1;
    }).forEach(function (tagName) {
      var tag = (0, _getTag.default)(tagName, docPart);

      if (tag) {
        obj[tagName] = tag;
      }
    });
  }

  return obj;
}