"use strict";

var getProp = require('../../../dist/utils/getProp').default;

var expect = require('chai').expect;

describe('getProp', function () {
  it('should return a object', function () {
    expect(getProp({
      default: function _default() {
        return function () {
          return null;
        };
      }
    }, {
      ignore: true
    })).to.deep.equal({
      type: {
        name: 'func'
      },
      required: '',
      defaultValue: {
        value: 'function() { return function() { return null } }',
        func: true
      },
      tags: {
        ignore: [{
          title: 'ignore',
          description: true
        }]
      },
      comment: '',
      description: ''
    });
  });
  it('should return a prop type string', function () {
    expect(getProp({
      type: String
    }, {
      ignore: true
    })).to.deep.equal({
      type: {
        name: 'string'
      },
      required: '',
      tags: {
        ignore: [{
          title: 'ignore',
          description: true
        }]
      },
      comment: '',
      description: ''
    });
  });
  it('should return a prop type string with default', function () {
    expect(getProp({
      default: 'Hello',
      type: String
    })).to.deep.equal({
      type: {
        name: 'string'
      },
      required: '',
      defaultValue: {
        value: '"Hello"',
        func: false
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type string with function default', function () {
    expect(getProp({
      default: function _default() {
        return 'Hello';
      },
      type: String
    })).to.deep.equal({
      type: {
        name: 'string'
      },
      required: '',
      defaultValue: {
        value: "function() { return 'Hello' }",
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type number', function () {
    expect(getProp({
      type: Number
    })).to.deep.equal({
      type: {
        name: 'number'
      },
      required: '',
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type number with default', function () {
    expect(getProp({
      default: 3,
      type: Number
    })).to.deep.equal({
      type: {
        name: 'number'
      },
      required: '',
      defaultValue: {
        value: '3',
        func: false
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type number with function default', function () {
    expect(getProp({
      default: function _default() {
        return 3;
      },
      type: Number
    })).to.deep.equal({
      type: {
        name: 'number'
      },
      required: '',
      defaultValue: {
        value: 'function() { return 3 }',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type boolean', function () {
    expect(getProp({
      type: Boolean
    })).to.deep.equal({
      type: {
        name: 'boolean'
      },
      required: '',
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type boolean with default', function () {
    expect(getProp({
      default: true,
      type: Boolean
    })).to.deep.equal({
      type: {
        name: 'boolean'
      },
      required: '',
      defaultValue: {
        value: 'true',
        func: false
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type boolean with function default', function () {
    expect(getProp({
      default: function _default() {
        return true;
      },
      type: Boolean
    })).to.deep.equal({
      type: {
        name: 'boolean'
      },
      required: '',
      defaultValue: {
        value: 'function() { return true }',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Array', function () {
    expect(getProp({
      type: Array
    })).to.deep.equal({
      type: {
        name: 'array'
      },
      required: '',
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Array with default', function () {
    expect(getProp({
      default: [],
      type: Array
    })).to.deep.equal({
      type: {
        name: 'array'
      },
      required: '',
      defaultValue: {
        value: '[]',
        func: false
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Array with function default', function () {
    expect(getProp({
      default: function _default() {
        return [];
      },
      type: Array
    })).to.deep.equal({
      type: {
        name: 'array'
      },
      required: '',
      defaultValue: {
        value: 'function() { return [] }',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Object', function () {
    expect(getProp({
      type: Object
    })).to.deep.equal({
      type: {
        name: 'object'
      },
      required: '',
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Object with default', function () {
    expect(getProp({
      default: {},
      type: Object
    })).to.deep.equal({
      type: {
        name: 'object'
      },
      required: '',
      defaultValue: {
        value: '{}',
        func: false
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Object with function default', function () {
    expect(getProp({
      default: function _default() {
        return {};
      },
      type: Object
    })).to.deep.equal({
      type: {
        name: 'object'
      },
      required: '',
      defaultValue: {
        value: 'function() { return {} }',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Function', function () {
    expect(getProp({
      type: Function
    })).to.deep.equal({
      type: {
        name: 'func'
      },
      required: '',
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Function with default', function () {
    expect(getProp({
      default: function _default() {},
      type: Function
    })).to.deep.equal({
      type: {
        name: 'func'
      },
      required: '',
      defaultValue: {
        value: 'function() {}',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
  it('should return a prop type Function with function default', function () {
    expect(getProp({
      default: function _default() {
        return function () {};
      },
      type: Function
    })).to.deep.equal({
      type: {
        name: 'func'
      },
      required: '',
      defaultValue: {
        value: 'function() { return function() {} }',
        func: true
      },
      tags: {},
      comment: '',
      description: ''
    });
  });
});