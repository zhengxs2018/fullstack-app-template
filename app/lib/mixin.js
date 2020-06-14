const { hasOwn } = require('./utils')

module.exports = function mixin(target, source, redefine = true) {
  if (!target) {
    throw new TypeError('argument target is required')
  }

  if (!source) {
    throw new TypeError('argument source is required')
  }

  for (const name of Object.getOwnPropertyNames(source)) {
    if (!redefine && hasOwn(target, name)) {
      continue
    }

    const descriptor = Object.getOwnPropertyDescriptor(source, name)
    Object.defineProperty(target, name, descriptor)
  }

  return target
}
