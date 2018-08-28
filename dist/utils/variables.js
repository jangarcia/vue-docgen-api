"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDescription = getDescription;
exports.getComment = getComment;
exports.IGNORE_DEFAULT = exports.UNDEFINED = exports.EMPTY = void 0;
var EMPTY = '';
exports.EMPTY = EMPTY;
var UNDEFINED = 'undefined';
exports.UNDEFINED = UNDEFINED;
var IGNORE_DEFAULT = ['params', 'param', 'returns'];
exports.IGNORE_DEFAULT = IGNORE_DEFAULT;

function getDescription(docPart) {
  if (docPart) return docPart['description'] || EMPTY;
  return EMPTY;
}

function getComment(docPart) {
  if (docPart) return docPart['comment'] || EMPTY;
  return EMPTY;
}