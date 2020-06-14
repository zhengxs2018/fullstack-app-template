import { blueprint } from '../../shared/blueprints'

import requiresAuth from '../../middleware/requiresAuth'
import errorHandler from '../../middleware/errorhandler'

import Auth from './endpoints/auth'
import Me from './endpoints/me'
import User from './endpoints/user'

import SwaggerUI from './swagger-ui'

const bp = blueprint(__dirname, {
  prefix: '/api',
  staticFolder: false,
  templateFolder: false,
})

// 路由中间件
bp.use(errorHandler)

// 添加文档功能
if (process.env.NODE_ENV === 'development') {
  bp.get('/docs/schema.json', SwaggerUI.json)
  bp.get('/docs', SwaggerUI.html)
}

bp.post('/auth/login', Auth.login)
bp.post('/auth/register', Auth.register)

bp.get('/me', requiresAuth, Me.getUser)

bp.get('/user/:userId(\\d+)', User.getUser)
bp.get('/users', User.getUserListByPaging)

bp.all('(.*)', (ctx) => {
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = { code: 404, message: 'not found' }
})

export default bp
