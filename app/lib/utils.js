const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(target, key) {
  return hasOwnProperty.call(target, key)
}

module.exports = {
  hasOwn,
}
