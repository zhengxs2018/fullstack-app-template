const isNil = require('lodash/isNil')

module.exports = function requiresAuth(ctx, next) {
  // 需要根据 context-type 响应
  if (isNil(ctx.session.userId)) {
    return ctx.json(null, 401, '用户未登录或已过期')
  }

  return next()
}
