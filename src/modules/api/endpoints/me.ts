import { Middleware } from 'koa'
import { Session } from 'koa-session'

import { getUserById } from '../../../db/repos/user'

/**
 * @swagger
 *
 * tags:
 *   Me:
 *     name: Me
 *     description: 当前登录用户
 */
export default {
  /**
   * @swagger
   *
   * /api/me:
   *   get:
   *     description: 获取当前登录用户信息
   *     tags: [Me]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: 当前登录用户
   *         schema:
   *           type: object
   *           $ref: '#/definitions/User'
   */
  async getUser(ctx) {
    const sess = ctx.session as Session
    ctx.json(await getUserById(sess.userId))
  },
} as Record<string, Middleware>
