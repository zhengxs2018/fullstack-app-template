const { blueprint } = require('../../lib/blueprints')
const requiresAuth = require('../../middleware/requiresAuth')

const errorhandler = require('./middleware/errorhandler')

const Auth = require('./endpoints/auth')
const Me = require('./endpoints/me')
const User = require('./endpoints/user')

const bp = blueprint(__dirname, {
  prefix: '/api',
  staticFolder: false,
  templateFolder: false,
})

// 路由中间件
bp.use(errorhandler)

// 添加文档功能
if (process.env.NODE_ENV === 'development') {
  const SwaggerUI = require('./swagger-ui')

  bp.get('/docs', SwaggerUI.html)
  bp.get('/docs/schema.json', SwaggerUI.json)
}

bp.post('/auth/login', Auth.login)
bp.post('/auth/register', Auth.register)

bp.get('/me', requiresAuth, Me.getUser)

bp.get('/user/:userId', User.getUser)
bp.get('/users', User.getUserListByPaging)

bp.all('(.*)', (ctx) => {
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = { code: 404, message: 'not found' }
})

module.exports = bp
