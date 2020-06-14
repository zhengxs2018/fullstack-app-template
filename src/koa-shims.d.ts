import 'koa'

import context from './extend/context'

type CustomContext = typeof context

declare module 'koa' {
  interface BaseContext {
    /**
     * 渲染页面
     *
     * @param filename 文件名称
     * @param context  模板上下文
     */
    render(filename: string, context?: Record<string, unknown>): void
    json: CustomContext['json']
    validate: CustomContext['validate']
  }
}
