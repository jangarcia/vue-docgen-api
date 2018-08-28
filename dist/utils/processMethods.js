"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMethods;

var _getMethod = _interopRequireDefault(require("./getMethod"));

function processMethods(docFile, component) {
  docFile = docFile.slice();
  var methods = component.methods;
  var listDocMethods = [];
  var mixins = component.mixins;

  if (mixins) {
    mixins.forEach(function (mixin) {
      var mMixin = mixin.methods;

      if (mMixin) {
        methods = Object.assign({}, mMixin, methods);
      }
    });
  }

  if (methods) {
    var listDocParts = [];
    Object.keys(methods).forEach(function (methodName) {
      var docPart = docFile.reverse().filter(function (comment) {
        return comment.longname.indexOf('methods.' + methodName) > -1 && listDocParts.indexOf(comment.longname) === -1;
      })[0];

      if (docPart) {
        if (docPart['access'] && docPart['access'] === 'public') {
          listDocParts.push(docPart.longname);
          listDocMethods.push((0, _getMethod.default)(methodName, docPart));
        }
      }
    });
  }

  return listDocMethods;
}