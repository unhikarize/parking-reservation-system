import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";

/**
 * JWT認証を行うミドルウェア
 *
 * AuthorizationヘッダのBearerトークンを検証し、
 * 正常な場合は次の処理へ進める
 *
 * @param req HTTPリクエスト
 * @param res HTTPレスポンス
 * @param next 次のミドルウェア
 *
 * @throws 401 トークンが存在しない、または不正な場合
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  next();
};
