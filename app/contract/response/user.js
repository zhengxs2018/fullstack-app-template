/**
 * 用户输出排除字段
 */
const UserSecurityExcludeFields = ['password', 'reason', 'inactive']

/**
 * 用户输出排除字段
 */
const UserFriendExcludeFields = ['realname', 'createdBy', 'updatedBy', 'updatedAt']

module.exports = {
  UserSecurityExcludeFields,
  UserFriendExcludeFields,
}
