import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { logger } from "@/shared/utils/logger";

/**
 * グローバルエラーハンドラーミドルウェア
 *
 * アプリケーション全体で発生したエラーをキャッチし、
 * 適切なHTTPステータスコードとメッセージを返す
 *
 * @param err エラーオブジェクト
 * @param req HTTPリクエスト
 * @param res HTTPレスポンス
 * @param next 次のミドルウェア
 * @returns void
 */
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  logger.error(err);

  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: err.message });
    return;
  }

  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};
