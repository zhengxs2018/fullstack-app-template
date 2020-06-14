import { Server } from 'http'

import config from 'config'

import Redis, { RedisOptions } from 'ioredis'

import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import session from 'koa-session'
import redisStore from 'koa-redis'

import { mixin } from './shared/mixin'

import application from './extend/application'
import context from './extend/context'

import api from './modules/api/main'
import admin from './modules/admin/main'
import mobile from './modules/mobile/main'
import web from './modules/web/main'

const app = new Koa()
const redis = new Redis({ ...config.get<RedisOptions>('redis') })
const store = redisStore({ db: 0, client: redis, duplicate: true })

// 修改全局配置
app.keys = config.get('keys')
app.proxy = config.get('proxy')

// 拓展应用
mixin(app, application)
mixin(app.context, context)
mixin(app.context, { redis, store })

// 添加全局中间件
app.use(bodyparser({ strict: true }))
app.use(session({ ...config.get('session'), store }, app))

// 添加模块
app.use(api.mount(app))
app.use(admin.mount(app))
app.use(mobile.mount(app))
app.use(web.mount(app))

app.listen(config.get('listen'), function onReady(this: Server) {
  const info = this.address()
  const port = typeof info === 'string' ? info.split(':')[1] : info?.port
  console.log(`Listen on http://127.0.0.1:${port}`)
})
