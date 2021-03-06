import { blueprint } from '../../shared/blueprints'

const bp = blueprint(__dirname, {
  prefix: '/m',
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

export default bp
