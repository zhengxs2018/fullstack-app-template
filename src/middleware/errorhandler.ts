import { Next, Context, Middleware } from 'koa'

async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (e) {
    const statusCode = e.statusCode || 500
    if (typeof e.statusCode === 'number') {
      ctx.json(statusCode, e.message, { errors: e.errors })
    } else {
      console.error(ctx.method, ctx.path, ctx.ip, e.stack)
      ctx.json(500, '网络异常，请检查网络！')
    }
  }
}

export default errorHandler as Middleware
