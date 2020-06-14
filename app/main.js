const config = require('config')

const Redis = require('ioredis')

const get = require('lodash/get')

const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session')
const redisStore = require('koa-redis')

const mixin = require('./lib/mixin')

const application = require('./extend/application')
const context = require('./extend/context')

const api = require('./modules/api/main')
const admin = require('./modules/admin/main')
const mobile = require('./modules/mobile/main')
const web = require('./modules/web/main')

const app = new Koa()
const redis = new Redis({ ...config.get('redis') })
const store = redisStore({ db: 0, client: redis, duplicate: true })

// 拓展应用
mixin(app, application)
mixin(app.context, context)
mixin(app.context, { redis, store })

// 修改全局配置
app.keys = config.get('keys')
app.proxy = config.get('proxy')

// 添加全局中间件
app.use(bodyparser({ strict: true }))
app.use(session(app, { ...config.get('session'), store }))

// 添加模块
app.use(api.mount(app))
app.use(admin.mount(app))
app.use(mobile.mount(app))
app.use(web.mount(app))

app.listen(config.get('listen'), function onReady() {
  const info = this.address()
  const port = typeof info === 'string' ? info.split(':')[1] : get(info, 'port')
  console.log(`Listen on http://127.0.0.1:${port}`)
})
