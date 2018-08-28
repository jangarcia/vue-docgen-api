"use strict";

var parse = require('../../dist/parse');

var expect = require('chai').expect;

describe('parse', function () {
  it('should return an function', function () {
    expect(parse.parse).to.be.an('function');
  });
});