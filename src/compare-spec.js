'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const compare = require('./compare')

describe('compare as subset', () => {
  it('is a function', () => {
    la(is.fn(compare))
  })
})
