'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const {equals, propEq} = require('ramda')
const compare = require('./compare')

describe('compare as subset', () => {
  const isValid = equals({valid: true})
  const isInvalid = propEq('valid', false)

  it('can check valid', () => {
    la(isValid({valid: true}))
    la(!isValid({valid: false}))
  })

  it('can check invalid', () => {
    la(isInvalid({valid: false}))
    la(!isInvalid({valid: true}))
  })

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

  it('flags different lists', () => {
    const result = compare({
      expected: [1, 2, 3],
      value: [2, 3, 4]
    })
    la(isInvalid(result), result)
  })

  it('allows subset lists', () => {
    const result = compare({
      expected: [1, 2, 3],
      value: [1, 2, 3, 4]
    })
    la(isValid(result), result)
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

  it('allows sub list of objects', () => {
    const result = compare({
      expected: [{foo: 'bar'}],
      value: [{foo: 1}, {foo: 'bar'}, {foo: 2}]
    })
    la(isValid(result), result)
  })
})
