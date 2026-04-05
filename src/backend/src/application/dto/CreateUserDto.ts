import { z } from 'zod'

/**
 * ユーザー作成DTOスキーマ
 */
export const createUserSchema = z.object({
  buildingNumber: z.number().int().positive(),
  roomNumber: z.number().int().positive(),
  name: z.string().min(1).max(50),
  password: z.string().min(6),
})

/**
 * ユーザー作成DTO
 */
export type CreateUserDto = z.infer<typeof createUserSchema>