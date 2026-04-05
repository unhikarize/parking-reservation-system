import { Request, Response } from 'express'
import { createUserUseCase } from '@/application/useCases/createUserUseCase'

/**
 * ユーザー作成コントローラー
 *
 * @param req Express Request
 * @param res Express Response
 * @returns HTTPレスポンス
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await createUserUseCase.execute(req.body)
    res.status(201).json(result)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}