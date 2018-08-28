"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getSlots;

var _htmlparser = _interopRequireDefault(require("htmlparser2"));

var HtmlParser = _htmlparser.default.Parser;

function getSlots(parts) {
  var output = {};

  if (parts.template && parts.template.content) {
    var template = parts.template.content;
    var lastComment = '';
    var parser = new HtmlParser({
      oncomment: function oncomment(data) {
        if (data.search(/\@slot/) !== -1) {
          lastComment = data.replace('@slot', '').trim();
        }
      },
      ontext: function ontext(text) {
        if (text.trim()) {
          lastComment = '';
        }
      },
      onopentag: function onopentag(name, attrs) {
        if (name === 'slot') {
          var nameSlot = attrs.name || 'default';
          output[nameSlot] = {
            description: lastComment
          };
          lastComment = '';
        }
      }
    });
    parser.write(template);
    parser.end();
    return output;
  }

  return {};
}