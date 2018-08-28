"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _parser = _interopRequireDefault(require("./parser"));

var _getComponentModuleJSCode = _interopRequireDefault(require("./getComponentModuleJSCode"));

var _stateDoc = _interopRequireDefault(require("./stateDoc"));

var _parseModule = _interopRequireDefault(require("./parseModule"));

var _evalComponentCode = _interopRequireDefault(require("./evalComponentCode"));

module.exports = function getExtends(listRequire) {
  var output = [];
  listRequire.forEach(function (filePath) {
    var isComponent = _path.default.extname(filePath) === '.vue';

    if (isComponent && _fs.default.existsSync(filePath)) {
      var source = _fs.default.readFileSync(filePath, {
        encoding: 'utf-8'
      });

      var parts = (0, _parser.default)(source, 'name');
      var jscodeLang = parts.script.lang;
      var jscode = (0, _getComponentModuleJSCode.default)(parts, source, filePath);

      var doc = _stateDoc.default.getDocFile(jscode, filePath, jscodeLang);

      _stateDoc.default.saveMixin(doc, filePath);

      if (_stateDoc.default.isMixin()) {
        var parsedSource = (0, _parseModule.default)(jscode, filePath, _stateDoc.default.jscodeLang);
        var mixin = (0, _evalComponentCode.default)(parsedSource);

        if (Object.keys(mixin.exports).length === 0) {
          mixin.exports.default = mixin.module.exports;
        }

        if (mixin.exports.default) {
          var component = mixin.exports.default;
          delete component.title;
          output.push(component);
        }
      }
    }
  });
  return output;
};