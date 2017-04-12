'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const subsetShot = require('.')

describe('subset-shot', () => {
  it('is a function', () => {
    la(is.fn(subsetShot))
  })

  it('allows sublist', () => {
    const list = [1, 2, 3, 4]
    subsetShot(list)
  })
})
