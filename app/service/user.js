const omit = require('lodash/omit')

const { UserSecurityExcludeFields } = require('../contract/response/user')

const { toPage, toPageSize } = require('../db/helpers/pagination')
const client = require('../db/client')

async function getUserById(id, excludeFields = []) {
  return omit(await client.user.findOne({ where: { id } }), [...UserSecurityExcludeFields, ...excludeFields])
}

async function getUserListByPaging(query, orderBy, page, pageSize, include) {
  const where = { ...query, inactive: false, isAdmin: false }
  const current = toPage(page)
  const size = toPageSize(pageSize)

  const [items, total] = await Promise.all([
    client.user.findMany({ where, include, orderBy, skip: (current - 1) * size, take: size, }),
    client.user.count({ where }),
  ])

  return { items: items.map(item => omit(item, UserSecurityExcludeFields)), page: current, pageSize: size, total }
}

module.exports = {
  getUserById,
  getUserListByPaging
}
