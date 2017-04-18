'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const {equals, without} = require('ramda')
const objSubset = require('obj-subset')

const valid = {valid: true}

const invalid = message => ({valid: false, message})

const areArrays = (a, b) => is.array(a) && is.array(b)

const areObjects = (a, b) => is.object(a) && is.object(b)

// is list a1 a subset of a2?
function isSubset (a1, a2) {
  la(is.array(a1), 'expected first argument to be a list', a1)
  la(is.array(a2), 'expected second argument to be a list', a2)
  const diff = without(a2, a1)
  return is.empty(diff)
}

function compare ({expected, value}) {
  if (equals(expected, value)) {
    return valid
  }

  if (areArrays(expected, value)) {
    const subset = isSubset(expected, value)
    if (subset) {
      return valid
    }
  }

  if (areObjects(expected, value)) {
    const obj = value
    const subset = expected
    const isSnapshotSubset = objSubset(obj, subset)
    if (isSnapshotSubset) {
      return valid
    }

    const message = 'snapshot object is not subset of new value'
    return invalid(message)
  }

  return invalid('something is different')
}

module.exports = compare
