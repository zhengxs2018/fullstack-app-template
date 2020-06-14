import { ParameterizedContext } from 'koa'

import isNil from 'lodash/isNil'

import parameter, { Rules } from '../shared/parameter'

export default {
  json(this: ParameterizedContext, data?: unknown, code = 200, message = 'success'): void {
    this.status = 200
    this.type = 'application/json'
    this.body = { data: isNil(data) ? undefined : data, code, message }
  },
  validate(
    this: ParameterizedContext,
    rules: Rules,
    data: unknown,
    code = 422,
    message = '表单验证失败'
  ): void | never {
    const errors = parameter.validate(rules, data || this.request.body)
    const noError = Object(errors).length >>> 0 === 0
    if (noError) return

    if (process.env.NODE_ENV === 'development') {
      console.debug('[validate] Error: %j', errors)
    }

    this.throw(message, code, { errors })
  },
}
