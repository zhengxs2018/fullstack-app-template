const { genSalt, hash, compare } = require('bcrypt')

const pick = require('lodash/pick')

const { LoginFormRules, RegisterFormRules, RegisterInputFields } = require('../../../contract/request/auth')

const db = require('../../../db/client')

/**
 * @swagger
 *
 * tags:
 *   Authorization:
 *     name: Authorization
 *     description: 账号授权
 */

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     description: 密码登录
 *     tags: [Authorization]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       200:
 *         description: 登录成功
 *       201:
 *         description: 用户名或密码错误
 */
async function login(ctx) {
  const formData = ctx.request.body

  ctx.validate(LoginFormRules, formData)

  const { username, password } = formData
  const user = await db.user.findOne({
    where: { username },
  })

  if (user === null) {
    return ctx.json(null, 201, '用户名或密码错误')
  }

  if (await compare(password, user.password)) {
    const userId = user.id

    ctx.session.userId = userId

    db.user.update({
      data: { latestLogiedWithIP: ctx.ip, latestLogiedInTime: new Date() },
      where: { id: userId },
    })
    ctx.json()
  } else {
    ctx.json(null, 201, '用户名或密码错误')
  }
}

/**
 * @swagger
 *
 * /api/auth/register:
 *   get:
 *     description: 用户注册
 *     tags: [Authorization]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *       - $ref: '#/parameters/password'
 *       - $ref: '#/parameters/avatar'
 *       - $ref: '#/parameters/nickname'
 *     responses:
 *       200:
 *         description: 注册成功
 *       201:
 *         description: 用户名或昵称已存在
 */
async function register(ctx) {
  const formData = ctx.request.body

  ctx.validate(RegisterFormRules, formData)

  const users = await db.user.findMany({
    where: {
      OR: [{ username: formData.username }, { nickname: formData.nickname }],
    },
  })

  if (users.length > 0) {
    return ctx.json(null, 201, '用户名或昵称已存在')
  }

  const payload = pick(formData, RegisterInputFields)
  const password = await hash(payload.password, await genSalt(10))
  const user = await db.user.create({
    data: {
      ...payload,
      password,
      latestLogiedWithIP: ctx.ip,
      latestLogiedInTime: new Date(),
    },
  })

  ctx.session.userId = user.id
  ctx.json()
}

module.exports = {
  login,
  register,
}
