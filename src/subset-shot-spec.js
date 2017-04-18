'use strict'

/* global describe, it */
const la = require('lazy-ass')
const is = require('check-more-types')
const subsetShot = require('.')
const objSubset = require('obj-subset')

describe('obj-subset', () => {
  it('is a function', () => {
    la(is.fn(objSubset))
  })

  it('passes identical object', () => {
    const obj = {foo: 42}
    const subset = {foo: 42}
    la(objSubset(obj, subset))
  })

  it('passes subset object', () => {
    const obj = {foo: 42, bar: 10}
    const subset = {foo: 42}
    la(objSubset(obj, subset))
  })

  it('does not pass subset object because different values', () => {
    const obj = {foo: 42, bar: 10}
    const subset = {foo: 20}
    la(!objSubset(obj, subset))
  })

  it('compares nested objects', () => {
    const obj = {
      foo: {
        bar: 42,
        baz: 22
      }
    }
    const subset = {
      foo: {
        bar: 42
      }
    }
    la(objSubset(obj, subset))
  })
})

describe('subset-shot', () => {
  it('is a function', () => {
    la(is.fn(subsetShot))
  })

  it('allows sublist', () => {
    const list = [1, 2, 3, 4]
    subsetShot(list)
  })

  it('allows shallow objects', () => {
    const o = {foo: 42}
    subsetShot(o)
  })
})
