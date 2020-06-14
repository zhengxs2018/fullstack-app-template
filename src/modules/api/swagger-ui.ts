import { resolve } from 'path'

import config from 'config'
import jsdoc from 'swagger-jsdoc'

import { Middleware } from 'koa'
import swagger from 'koa2-swagger-ui'

const { apis, ...options } = config.get('swagger')

const swaggerSpec = jsdoc({
  ...options,
  apis: [...apis, resolve(__dirname, './endpoints/*.[tj]s')],
})

export default {
  async json(ctx) {
    ctx.status = 200
    ctx.type = 'application/json'
    ctx.body = swaggerSpec
  },
  html: swagger({
    routePrefix: false,
    swaggerOptions: {
      url: '/api/docs/schema.json',
      supportedSubmitMethods: ['GET', 'POST'],
    },
  }),
} as Record<string, Middleware>
