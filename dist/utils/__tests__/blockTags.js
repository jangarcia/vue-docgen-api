"use strict";

var blockTags = require('../../../dist/utils/blockTags');

var expect = require('chai').expect;

describe('blockTags', function () {
  it('should return an array', function () {
    expect(blockTags.default).to.be.an('array');
  });
});