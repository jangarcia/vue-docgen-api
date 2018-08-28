"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVueDoc;

var _path = _interopRequireDefault(require("path"));

var _variables = require("./variables");

var _processTags = _interopRequireDefault(require("./processTags"));

var _processProps = _interopRequireDefault(require("./processProps"));

var _processMethods = _interopRequireDefault(require("./processMethods"));

var _processEvents = _interopRequireDefault(require("./processEvents"));

function getVueDoc(stateDoc, component) {
  var docJsFile = stateDoc.getDocJs();
  var docComponent;
  var displayName = !component.name || component.name === '' ? // if component does not have a name, use the name of the file containing it
  _path.default.basename(stateDoc.file, _path.default.extname(stateDoc.file)) : component.name;

  if (docJsFile) {
    docJsFile = docJsFile.filter(function (comment) {
      return comment.kind !== 'package';
    });
    docComponent = docJsFile.filter(function (comment) {
      return comment.longname === 'module.exports' || comment.longname === 'default';
    })[0];
  } else {
    docJsFile = [];
    docComponent = false;
  }

  var description = _variables.EMPTY;
  var comment = _variables.EMPTY;
  var tags = {};

  if (docComponent) {
    description = (0, _variables.getDescription)(docComponent);
    comment = (0, _variables.getComment)(docComponent);
    tags = (0, _processTags.default)(docComponent, _variables.IGNORE_DEFAULT);
  }

  var props = (0, _processProps.default)(docJsFile, component);
  var methods = (0, _processMethods.default)(docJsFile, component);
  var events = (0, _processEvents.default)(docJsFile, component);
  return {
    description: description,
    methods: methods,
    displayName: displayName,
    props: props,
    comment: comment,
    tags: tags,
    events: events,
    slots: stateDoc.slots
  };
}