'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const subsetShot = require('.')

describe('subset-shot', () => {
  it('is a function', () => {
    la(is.fn(subsetShot))
  })
})
