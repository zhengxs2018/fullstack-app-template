
const { resolve } = require('path')

const config = require('config')

const swagger = require('koa2-swagger-ui')
const jsdoc = require('swagger-jsdoc')

const { apis, ...options } = config.get('swagger')

const swaggerSpec = jsdoc({
  ...options,
  apis: [...apis, resolve(__dirname, './endpoints/*.js')]
})

async function json(ctx) {
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = swaggerSpec
}

const html = swagger({
  routePrefix: false,
  swaggerOptions: {
    url: '/api/docs/schema.json',
    supportedSubmitMethods: ['GET', 'POST']
  },
})

module.exports = { json, html }
