import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const UserEntity = prisma.user

export default prisma
