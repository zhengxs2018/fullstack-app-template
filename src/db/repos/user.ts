import { UserWhereInput, FindManyUserArgs, User } from '@prisma/client'

import omit from 'lodash/omit'

import { toPage, toPageSize } from '../../shared/utils'

import { UserEntity } from '../client'

export type ExcludableUserFields = Extract<keyof Omit<User, 'password'>, string>[]

function clean(user: User, exclude?: ExcludableUserFields) {
  return omit(user, ([] as Array<keyof User>).concat(exclude || [], 'password'))
}

export async function getUserById(id: number, exclude?: ExcludableUserFields) {
  const user = await UserEntity.findOne({ where: { id } })
  return user === null ? null : clean(user, exclude)
}

export interface UserListOptions extends Omit<FindManyUserArgs, 'where' | 'skip' | 'take'> {
  page?: string | number
  pageSize?: string | number
  exclude?: ExcludableUserFields
}

export async function getUserList(where: Omit<UserWhereInput, 'isAdmin'>, options?: UserListOptions) {
  const page = toPage(options?.page)
  const pageSize = toPageSize(options?.pageSize)
  const args = omit(options, ['page', 'pageSize', 'exclude'])
  const items = await UserEntity.findMany({ where, ...args, skip: (page - 1) * pageSize, take: pageSize })
  const exclude = options?.exclude || []
  return { page, pageSize, items: items.map((item) => clean(item, exclude)) }
}

export async function getUserListByPaging(query: Omit<UserWhereInput, 'isAdmin'>, options?: UserListOptions) {
  const where: UserWhereInput = { ...query, isAdmin: false }

  const [result, total] = await Promise.all([getUserList(where, options), UserEntity.count({ where })])

  return { ...result, total }
}
