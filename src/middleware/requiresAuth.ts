import { Context, Next } from 'koa'

export default function requiresAuth(ctx: Context, next: Next) {
  const userId = ctx.session?.userId ?? false

  if (userId === false) {
    // todo: 需要根据 context-type 响应
    return ctx.json(null, 401, '用户未登录或已过期')
  }

  return next()
}
