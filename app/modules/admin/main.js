const { blueprint } = require('../../lib/blueprints')

const bp = blueprint(__dirname, {
  prefix: '/admin',
})

bp.get('/', (ctx) => {
  ctx.render('index.html')
})

bp.get('/login', (ctx) => {
  ctx.render('login.html')
})

bp.get('(.*)', (ctx) => {
  ctx.render('404.html')
})

module.exports = bp
