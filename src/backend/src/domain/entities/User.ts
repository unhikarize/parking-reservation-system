/**
 * ユーザーエンティティ
 */
export type User = {
  id: number
  buildingNumber: number
  roomNumber: number
  name: string
  passwordHash: string
  role: UserRole
}

/**
 * ユーザーロール
 */
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

