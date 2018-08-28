"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMethod;

var _variables = require("./variables");

var _processTags = _interopRequireDefault(require("./processTags"));

function getParams(tags) {
  if (tags['params']) {
    return tags['params'].map(function (param) {
      var obj = {
        name: param.name,
        description: param.description
      };

      if (param['type']) {
        obj['type'] = {
          name: param['type']['name']
        };
      }

      return obj;
    });
  }

  return [];
}

function getReturns(tags) {
  if (tags['returns']) {
    var re = tags['returns'][0];
    var obj = {
      description: re.description
    };

    if (re['type']) {
      obj['type'] = {
        name: re['type']['name']
      };
    }

    return obj;
  }

  return {};
}

function getMethod(methodName, docPart) {
  var tags = (0, _processTags.default)(docPart);
  return {
    name: methodName,
    comment: (0, _variables.getComment)(docPart),
    modifiers: [],
    params: getParams(tags),
    returns: getReturns(tags),
    description: (0, _variables.getDescription)(docPart),
    tags: tags
  };
}