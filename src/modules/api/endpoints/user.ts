import { Middleware } from 'koa'

import { UserWhereInput } from '@prisma/client'

import toSafeInteger from 'lodash/toSafeInteger'

import { getUserById, getUserListByPaging } from '../../../db/repos/user'

export default {
  /**
   * @swagger
   *
   * tags:
   *   User:
   *     name: User
   *     description: 注册用户
   */

  /**
   * @swagger
   *
   * /api/user/:userId:
   *   get:
   *     description: 获取当个用户信息
   *     tags: [User]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: 用户详情
   *         schema:
   *           type: object
   *           $ref: '#/definitions/User'
   */
  async getUser(ctx) {
    const userId = toSafeInteger(ctx.params.userId)
    const user = await getUserById(userId, ['mobile', 'email', 'updatedAt', 'updatedBy'])
    if (user === null) {
      ctx.json(null, 201, '用户不存在')
    } else {
      ctx.json(user)
    }
  },

  /**
   * @swagger
   *
   * /api/users:
   *   get:
   *     description: 获取用户列表
   *     tags: [User]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: wd
   *         type: string
   *         in: formData
   *         description: 查询关键字
   *       - $ref: '#/parameters/page'
   *       - $ref: '#/parameters/pageSize'
   *     responses:
   *       200:
   *         description: 用户列表
   *         schema:
   *           type: object
   *           properties:
   *              items:
   *                type: array
   *                items:
   *                  type: object
   *                  $ref: '#/definitions/User'
   *              page:
   *                type: integer
   *              pageSize:
   *                type: integer
   *              total:
   *                type: integer
   */
  async getUserListByPaging(ctx) {
    const { wd, page, pageSize, sort = 'createdAt', order = 'asc' } = ctx.query
    const options = { page, pageSize, orderBy: { [sort || 'createdAt']: order || 'asc' } }

    if (wd) {
      const where: UserWhereInput = {
        OR: [{ nickname: { contains: wd } }, { mobile: { contains: wd } }],
      }
      ctx.json(await getUserListByPaging(where, options))
    } else {
      ctx.json(await getUserListByPaging({}, options))
    }
  },
} as Record<string, Middleware>
