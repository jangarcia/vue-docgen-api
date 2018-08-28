"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parser;

var _hashSum = _interopRequireDefault(require("hash-sum"));

var compiler = require('vue-template-compiler');

var cache = require('lru-cache')(100);

function parser(source, filename) {
  var cacheKey = (0, _hashSum.default)(filename + source); // source-map cache busting for hot-reloadded modules

  var output = cache.get(cacheKey);

  if (output) {
    return output;
  }

  output = compiler.parseComponent(source, {
    pad: true
  });
  cache.set(cacheKey, output);
  return output;
}