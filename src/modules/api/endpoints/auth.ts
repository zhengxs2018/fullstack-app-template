import { genSalt, hash, compare } from 'bcrypt'

import pick from 'lodash/pick'

import { Middleware } from 'koa'
import { Session } from 'koa-session'

import { LoginFormRules, RegisterFormRules, RegisterInputFields } from '../../../contract/request/auth'

import { UserEntity } from '../../../db/client'

/**
 * @swagger
 *
 * tags:
 *   Authorization:
 *     name: Authorization
 *     description: 账号授权
 */
export default {
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
  async login(ctx) {
    const formData = ctx.request.body

    ctx.validate(LoginFormRules, formData)

    const { username, password } = formData
    const user = await UserEntity.findOne({ where: { username } })

    if (user === null) {
      return ctx.json(null, 201, '用户名或密码错误')
    }

    const pwd = user.password

    // 如果是第三方认证，密码可能为空
    if (typeof pwd !== 'string' || pwd === '') {
      return ctx.json(null, 202, '请使用密码找回功能修改密码后再登录')
    }

    if (await compare(password, pwd)) {
      const sess = ctx.session as Session

      sess.userId = user.id

      ctx.json()
    } else {
      ctx.json(null, 201, '用户名或密码错误')
    }
  },

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
  async register(ctx) {
    const formData = ctx.request.body

    ctx.validate(RegisterFormRules, formData)

    const users = await UserEntity.findMany({
      where: {
        OR: [{ username: formData.username }, { nickname: formData.nickname }],
      },
    })

    if (users.length > 0) {
      return ctx.json(null, 201, '用户名或昵称已存在')
    }

    const payload = pick(formData, RegisterInputFields)
    const password = await hash(payload.password, await genSalt(10))
    const user = await UserEntity.create({
      data: { ...payload, password },
    })

    const sess = ctx.session as Session

    sess.userId = user.id

    ctx.json()
  },
} as Record<string, Middleware>
