import { createUserUseCase } from "@/application/useCases/createUserUseCase";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";
import { logger } from "@/shared/utils/logger";
import { Request, Response } from "express";

/**
 * ユーザー作成コントローラー
 *
 * @param req Express Request
 * @param res Express Response
 * @returns void
 */
export const createUserController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await createUserUseCase.execute(req.body);
    res.status(HTTP_STATUS.CREATED).json(result);
  } catch (error: unknown) {
    logger.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message });
  }
};
