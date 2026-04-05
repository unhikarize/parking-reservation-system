import { User } from '@/domain/entities/User'

/**
 * ユーザーリポジトリインターフェース
 */
export interface IUserRepository {
  /**
   * 建物番号と部屋番号でユーザーを検索する
   * @param buildingNumber 建物番号
   * @param roomNumber 部屋番号
   * @returns ユーザーまたはnull
   */
  findByBuildingAndRoom(
    buildingNumber: number,
    roomNumber: number
  ): Promise<User | null>

  /**
   * ユーザーを作成する
   * @param data ユーザーデータ
   * @returns 作成されたユーザー
   */
  create(data: {
    buildingNumber: number
    roomNumber: number
    name: string
    passwordHash: string
  }): Promise<User>
}