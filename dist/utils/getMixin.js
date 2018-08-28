"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _stateDoc = _interopRequireDefault(require("./stateDoc"));

var _parseModule = _interopRequireDefault(require("./parseModule"));

var _evalComponentCode = _interopRequireDefault(require("./evalComponentCode"));

module.exports = function getMixin(listRequire) {
  var output = [];
  listRequire.forEach(function (filePath) {
    var pathRequire = filePath;

    try {
      if (_fs.default.lstatSync(pathRequire).isDirectory()) {
        pathRequire = _path.default.join(pathRequire, 'index.js');
      }
    } catch (e) {}

    var hasJSExt = _path.default.extname(pathRequire) === '.js';

    if (!hasJSExt) {
      pathRequire = filePath + '.js';
    }

    if (_fs.default.existsSync(pathRequire)) {
      var source = _fs.default.readFileSync(pathRequire, {
        encoding: 'utf-8'
      });

      var doc = _stateDoc.default.getDocFile(source, pathRequire);

      _stateDoc.default.saveMixin(doc, pathRequire);

      if (_stateDoc.default.isMixin()) {
        var parsedSource = (0, _parseModule.default)(source, filePath, _stateDoc.default.jscodeLang);
        var mixin = (0, _evalComponentCode.default)(parsedSource);

        if (Object.keys(mixin.exports).length === 0) {
          mixin.exports.default = mixin.module.exports;
        }

        if (mixin.exports.default) {
          output.push(mixin.exports.default);
        }
      }
    }
  });
  return output;
};