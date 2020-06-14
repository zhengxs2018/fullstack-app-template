const { join } = require('path')

const config = require('config')

const Router = require('@koa/router')
const mount = require('koa-mount')
const serve = require('koa-static')

const get = require('lodash/get')

const { Environment, FileSystemLoader } = require('nunjucks')

const mkdirp = require('mkdirp')

/** 创建蓝图
 *
 * @param {String} rootPath  蓝图模块根路径
 * @param {Object} options
 * @param {String} [options.prefix=]                   url 前缀，参考 @koa/router 模块的 prefix 属性
 * @param {String} [options.staticFolder=static]       静态资源目录
 * @param {String} [options.templateFolder=templates]  模板目录
 */
function blueprint(rootPath, options = {}) {
  const router = new Router()

  const templateFolder = get(options, 'templateFolder', 'templates')
  if (typeof templateFolder === 'string') {
    const templatePath = join(rootPath, templateFolder)
    mkdirp.sync(templatePath)

    const { ...viewOptions } = config.get('view')
    const engine = new Environment(new FileSystemLoader(templatePath), viewOptions)

    router.use((ctx, next) => {
      ctx.render = (filename, context) => {
        ctx.status = ctx.status || 200
        ctx.type = 'text/html'
        ctx.body = engine.render(filename, { ...ctx.state, ...context })
      }
      return next()
    })
  }

  router.mount = function (app, opts) {
    const prefix = get(opts, 'prefix', get(options, 'prefix'))

    if (typeof prefix === 'string') {
      this.prefix(prefix)
    }

    const staticFolder = get(options, 'staticFolder', 'static')
    if (typeof staticFolder === 'string') {
      const staticPath = join(rootPath, staticFolder)

      mkdirp.sync(staticPath)

      if (typeof prefix !== 'string' || prefix === '/') {
        app.use(serve(staticPath))
      } else {
        app.use(mount(prefix, serve(staticPath)))
      }
    }

    return router.routes()
  }

  return router
}

module.exports = {
  blueprint,
}
