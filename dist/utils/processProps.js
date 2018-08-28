"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processProps;

var _getProp = _interopRequireDefault(require("./getProp"));

function processProps(docFile, component) {
  docFile = docFile.slice();
  var props = component.props;
  var mixins = component.mixins;
  var propsMixins = {};

  if (mixins) {
    mixins.forEach(function (mixin) {
      var pMixin = mixin.props;

      if (pMixin) {
        if (Array.isArray(pMixin)) {
          var propsMerge = {};
          pMixin.forEach(function (key) {
            propsMerge[key] = {};
          });
          propsMixins = Object.assign({}, propsMerge, propsMixins);
        } else {
          propsMixins = Object.assign({}, pMixin, propsMixins);
        }
      }
    });
  }

  var hasPropsInMixin = propsMixins && Object.keys(propsMixins).length;
  var hasPropsInComponent = props && Object.keys(props).length;

  if (hasPropsInMixin || hasPropsInComponent) {
    var listDocProps = {};

    if (Array.isArray(props)) {
      var newProps = {};
      props.forEach(function (propName) {
        newProps[propName] = {};
      });
      props = newProps;
    }

    props = Object.assign({}, propsMixins, props);
    var listDocParts = [];
    Object.keys(props).forEach(function (key) {
      var propName = key;
      var docPart = docFile.filter(function (comment) {
        var propNameDoc = comment.longname.split('props.')[1];
        return propNameDoc === propName && listDocParts.indexOf(propNameDoc) === -1;
      })[0];

      if (docPart) {
        listDocParts.push(docPart.longname);
      }

      var prop = props[propName];
      var docProp = (0, _getProp.default)(prop, docPart);

      if (docProp.tags.model) {
        propName = 'v-model';
      }

      listDocProps[propName] = docProp;
    });
    return listDocProps;
  }

  return;
}