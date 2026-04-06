import { prisma } from '@/infrastructure/prisma/client'
import { IUserRepository } from '@/domain/repositories/UserRepository'
import { UserRole } from '@/domain/entities/User'
/**
 * ユーザーリポジトリ（Prisma実装）
 */
export const userRepository: IUserRepository = {
  /**
   * 建物番号と部屋番号でユーザーを検索する
   * @param buildingNumber 建物番号
   * @param roomNumber 部屋番号
   * @returns ユーザーまたはnull
   */
  findByBuildingAndRoom: async (buildingNumber, roomNumber) => {
    const user = await prisma.user.findUnique({
      where: {
        buildingNumber_roomNumber: {
          buildingNumber: buildingNumber,
          roomNumber: roomNumber,
        },
      },
    })

    if (!user) {
        return null
    }

    return {
      id: Number(user.id),
      buildingNumber: user.buildingNumber,
      roomNumber: user.roomNumber,
      name: user.name,
      passwordHash: user.passwordHash,
      role: user.role as UserRole,
    }
  },

  /**
   * ユーザーを作成する
   * @param data ユーザーデータ
   * @returns 作成されたユーザー
   */
  create: async (data) => {
    const user = await prisma.user.create({
      data: {
        buildingNumber: data.buildingNumber,
        roomNumber: data.roomNumber,
        name: data.name,
        passwordHash: data.passwordHash,
        role: UserRole.USER,
        isFirstLogin: true,
      },
    })

    return {
      id: Number(user.id),
      buildingNumber: user.buildingNumber,
      roomNumber: user.roomNumber,
      name: user.name,
      passwordHash: user.passwordHash,
      role: user.role as UserRole,
    }
  },
}