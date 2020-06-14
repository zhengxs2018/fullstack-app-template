const UserService = require('../../../service/user')

/**
 * @swagger
 *
 * tags:
 *   Me:
 *     name: Me
 *     description: 当前登录用户
 */

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
async function getUser(ctx) {
  const userId = ctx.session.userId
  ctx.json(await UserService.getUserById(userId))
}

module.exports = {
  getUser
}
