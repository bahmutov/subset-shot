'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const {equals} = require('ramda')
const compare = require('./compare')

describe('compare as subset', () => {
  const isValid = equals({valid: true})

  it('is a function', () => {
    la(is.fn(compare))
  })

  it('matches two lists', () => {
    const list = [1, 2, 3]
    const result = compare({
      expected: list,
      value: list
    })
    la(isValid(result))
  })

  it('matches two objects', () => {
    const o = {
      foo: 'bar'
    }
    const result = compare({
      expected: o,
      value: o
    })
    la(isValid(result))
  })
})
