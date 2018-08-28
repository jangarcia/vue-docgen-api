"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getComponentModuleJSCode;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var readSeparateScriptFile = function readSeparateScriptFile(fileName) {
  return _fs.default.readFileSync(fileName, {
    encoding: 'utf-8'
  });
};

function getComponentModuleJSCode(parts, source, file) {
  if (!parts.script) {
    return source; // No script code;
  } else if (parts.script.src) {
    var jsFilePath = _path.default.join(_path.default.dirname(file), parts.script.src);

    return readSeparateScriptFile(jsFilePath);
  } else {
    return parts.script.content;
  }
}