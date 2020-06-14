const isNil = require('lodash/isNil')
const parameter = require('../lib/parameter')

module.exports = {
  json(data, code = 200, message = 'success') {
    this.status = 200
    this.type = 'application/json'
    this.body = { data: isNil(data) ? undefined : data, code, message }
  },
  validate(rules, data, code = 422, message = '表单验证失败') {
    const errors = parameter.validate(rules, data || this.request.body)
    const noError = Object(errors).length >>> 0 === 0
    if (noError) return

    if (process.env.NODE_ENV === 'development') {
      console.debug('[validate] Error: %j', errors)
    }

    this.throw(message, code, { errors })
  },
}
