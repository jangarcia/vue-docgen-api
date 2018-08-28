"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _parser = _interopRequireDefault(require("./parser"));

var _getComponentModuleJSCode = _interopRequireDefault(require("./getComponentModuleJSCode"));

var _getSlots = _interopRequireDefault(require("./getSlots"));

var _getDocFile2 = _interopRequireDefault(require("./getDocFile"));

var stateDoc =
/*#__PURE__*/
function () {
  function stateDoc() {
    (0, _classCallCheck2.default)(this, stateDoc);
    this.file = '';
    this.docComponent = {};
    this.sourceComponent = '';
    this.docMixins = [];
    this.jscodeReqest = '';
    this.jscodeLang = undefined;
    this.docTemp = '';
    this.slots;
  }

  (0, _createClass2.default)(stateDoc, [{
    key: "isMainComponent",
    value: function isMainComponent(file) {
      return file === this.file;
    }
  }, {
    key: "saveComponent",
    value: function saveComponent(source, file) {
      if (this.isMainComponent(file) && this.sourceComponent !== source) {
        var parts = (0, _parser.default)(source, 'name');
        this.slots = (0, _getSlots.default)(parts);
        this.jscodeReqest = (0, _getComponentModuleJSCode.default)(parts, source, file);
        this.jscodeLang = parts.script.lang;
        this.docComponent = this.getDocFile(this.jscodeReqest, file, this.jscodeLang);
      }
    }
  }, {
    key: "getDocFile",
    value: function getDocFile(source, file, lang) {
      this.docTemp = (0, _getDocFile2.default)(source, file, lang);
      return this.docTemp;
    }
  }, {
    key: "isMixin",
    value: function isMixin(doc) {
      doc = doc || this.docTemp;
      return doc.some(function (docPart) {
        return docPart.kind === 'mixin';
      });
    }
  }, {
    key: "getDocJs",
    value: function getDocJs() {
      var docMixins = [].concat.apply([], this.docMixins).filter(function (docPart) {
        return docPart.kind !== 'package';
      });
      return this.docComponent.concat(docMixins);
    }
  }, {
    key: "saveMixin",
    value: function saveMixin(doc, file) {
      if (this.isMixin(doc)) {
        doc = doc.map(function (docPart) {
          var longnameSplit = docPart.longname.split('.');

          if (longnameSplit[0] === 'default') {
            longnameSplit[0] = 'module.exports';
          }

          docPart.longname = longnameSplit.join('.');
          return docPart;
        }).filter(function (docPart) {
          return docPart.longname !== 'module.exports';
        });
        var index;
        this.docMixins.forEach(function (docMixin, id) {
          var packages = docMixin.filter(function (docPart) {
            return docPart.kind === 'package';
          })[0];

          if (packages && packages.files[0] === file) {
            index = id;
          }
        });

        if (!index) {
          this.docMixins.unshift(doc);
        }
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.file = '';
      this.docComponent = {};
      this.sourceComponent = '';
      this.docMixins = [];
      this.jscodeReqest = '';
      this.jscodeLang = undefined;
      this.docTemp = '';
    }
  }]);
  return stateDoc;
}();

var _default = new stateDoc();

exports.default = _default;