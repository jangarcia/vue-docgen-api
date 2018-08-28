"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(source) {
  try {
    var typescript = require('typescript');

    return typescript.transpileModule(source, {
      compilerOptions: {
        target: 'es2017'
      }
    });
  } catch (err) {
    throw err;
  }
}