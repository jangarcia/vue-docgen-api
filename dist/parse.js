"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSource = exports.parse = void 0;

var _fs = _interopRequireDefault(require("fs"));

var utils = _interopRequireWildcard(require("./utils"));

var _stateDoc = _interopRequireDefault(require("./utils/stateDoc"));

var parse = function parse(file) {
  var source = _fs.default.readFileSync(file, {
    encoding: 'utf-8'
  });

  if (source === '') {
    throw new Error('The document is empty');
  }

  _stateDoc.default.file = file;

  _stateDoc.default.saveComponent(source, file);

  var component = utils.getSandbox(_stateDoc.default, file).default;
  var vueDoc = utils.getVueDoc(_stateDoc.default, component);

  _stateDoc.default.reset();

  return vueDoc;
};

exports.parse = parse;

var parseSource = function parseSource(source, path) {
  if (source === '') {
    throw new Error('The document is empty');
  }

  _stateDoc.default.file = path;

  _stateDoc.default.saveComponent(source, path);

  var component = utils.getSandbox(_stateDoc.default, path).default;
  var vueDoc = utils.getVueDoc(_stateDoc.default, component);

  _stateDoc.default.reset();

  return vueDoc;
};

exports.parseSource = parseSource;