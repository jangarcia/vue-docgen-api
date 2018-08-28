"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _vm = _interopRequireDefault(require("vm"));

function clone(obj) {
  if (null == obj || 'object' != (0, _typeof2.default)(obj)) return obj;
  var copy = obj.constructor();

  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }

  return copy;
}

module.exports = function evalComponentCode(code) {
  try {
    var script = new _vm.default.Script(code, {});

    var requireSanbox = function requireSanbox(element) {
      if (element === 'vuex') {
        var outputVuex = {
          mapState: function mapState() {},
          mapMutations: function mapMutations() {},
          mapGetters: function mapGetters() {},
          mapActions: function mapActions() {},
          createNamespacedHelpers: function createNamespacedHelpers() {}
        };
        return (0, _objectSpread2.default)({}, outputVuex, {
          default: outputVuex
        });
      }

      if (element === 'vue') {
        var outputVue = {
          __esModule: true,
          use: function use() {},
          directive: function use() {},
          component: function component() {},
          extended: function extended() {},
          extend: function extend(obj) {
            return obj;
          }
        };
        return (0, _objectSpread2.default)({}, outputVue, {
          default: outputVue
        });
      }

      return function () {};
    };

    requireSanbox.context = function () {
      return function () {};
    };

    var sandbox = {
      exports: {},
      module: {
        exports: {}
      },
      require: requireSanbox,
      document: {},
      window: {
        location: {}
      },
      alert: function alert() {},
      confirm: function confirm() {},
      console: {
        log: function log() {},
        debug: function debug() {}
      },
      sessionStorage: {
        getItem: function getItem() {},
        setItem: function setItem() {},
        removeItem: function removeItem() {}
      },
      localStorage: {
        getItem: function getItem() {},
        setItem: function setItem() {},
        removeItem: function removeItem() {}
      }
    };
    var context = new _vm.default.createContext(sandbox);
    script.runInContext(context);
    var output = sandbox;
    return clone(output);
  } catch (err) {
    throw err;
  }
};