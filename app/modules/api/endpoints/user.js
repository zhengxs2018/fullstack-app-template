const { UserFriendExcludeFields } = require('../../../contract/response/user')

const UserService = require('../../../service/user')

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
async function getUser(ctx) {
  const userId = ctx.params.userId
  ctx.json(await UserService.getUserById(userId, UserFriendExcludeFields))
}

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
async function getUserListByPaging(ctx) {
  const { wd, page = 1, pageSize = 10, sort = 'createdAt', order = 'asc' } = ctx.query
  const query = { }

  if (wd) {
    query.OR = [
      { nickname: { contains: wd } },
      { mobile: { contains: wd } }
    ]
  }

  ctx.json(await UserService.getUserListByPaging(query, { [sort]: order }, page, pageSize ))
}

module.exports = {
  getUser,
  getUserListByPaging
}
