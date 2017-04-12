'use strict'

// const la = require('lazy-ass')
// const is = require('check-more-types')
const R = require('ramda')

function compare ({expected, value}) {
  if (R.equals(expected, value)) {
    return {valid: true}
  }

  return {
    valid: false,
    message: 'something is different'
  }
}

module.exports = compare
