import { join } from 'path'

import config from 'config'

import Koa, { Middleware } from 'koa'
import Router from '@koa/router'
import mount from 'koa-mount'
import serve from 'koa-static'

import { Environment, FileSystemLoader } from 'nunjucks'

import mkdirp from 'mkdirp'

export interface BlueprintOptions {
  prefix: string
  templateFolder: string | false
  staticFolder: string | false
}

export interface Blueprint extends Router {
  mount(app: Koa, opts?: Partial<Pick<BlueprintOptions, 'prefix'>>): Middleware
}

/** 创建蓝图
 *
 * @param rootPath  蓝图模块根路径
 * @param options 可选项
 *
 * @returns 路由组件
 */
export function blueprint(rootPath: string, options?: Partial<BlueprintOptions>): Blueprint {
  const router = new Router()

  const templateFolder = options?.templateFolder ?? 'templates'
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

  // @ts-ignore
  router.mount = function (app, opts) {
    const prefix = opts?.prefix ?? options?.prefix

    if (typeof prefix === 'string') {
      this.prefix(prefix)
    }

    const staticFolder = options?.staticFolder ?? 'static'
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

  return router as Blueprint
}
