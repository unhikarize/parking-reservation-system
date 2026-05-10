import { HTTP_STATUS } from "@/shared/constants/httpStatus";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import { logger } from "@/shared/utils/logger";
import { NextFunction, Request, Response } from "express";

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

  // TODO: Prismaのエラーなど、特定のエラータイプに応じた処理を追加する
  // 現状だと、Prismaエラーの場合、Errorオブジェクトとして処理されるが、
  // メッセージがわかりづらく、ユーザにとっては不利益な情報となる

  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).json({ code: err.code, message: err.message });
    return;
  }

  if (err instanceof Error) {
    const body: Record<string, unknown> = { message: err.message };
    if ("code" in err) {
      body.code = (err as { code?: string }).code;
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json(body);
    return;
  }

  res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal Server Error" });
};
