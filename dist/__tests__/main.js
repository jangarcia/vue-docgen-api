"use strict";

var main = require('../../dist/main');

var expect = require('chai').expect;

describe('main', function () {
  it('should return an object', function () {
    expect(main).to.be.an('object');
  });
});