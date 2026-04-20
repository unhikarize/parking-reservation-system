import { createUserUseCase } from "@/application/useCases/createUserUseCase";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";
import { Request, Response } from "express";

/**
 * ユーザー作成コントローラー
 *
 * @param req Express Request
 * @param res Express Response
 * @returns HTTPレスポンス
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const result = await createUserUseCase.execute(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (e: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message });
  }
};
