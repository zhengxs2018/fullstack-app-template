const toSafeInteger = require('lodash/toSafeInteger')

function toPage(value) {
  return Math.max(toSafeInteger(value || 1), 1)
}

function toPageSize(value) {
  return Math.min(toPage(value || 10), 500)
}

module.exports = {
  toPage,
  toPageSize,
}
