import { ErrorCode } from "@/shared/constants/errorCodes";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";

/**
 * 認可エラーを表すカスタムエラークラス
 */
export class UnauthorizedError extends Error {
  /**
   * HTTPステータスコード
   */
  statusCode: number;

  /**
   * エラーコード
   */
  code: ErrorCode;

  /**
   * UnauthorizedErrorのコンストラクタ
   * @param code エラーコード
   * @param message エラーメッセージ（デフォルト: "Unauthorized"）
   */
  constructor(code: ErrorCode, message: string = "Unauthorized") {
    super(message);
    this.code = code;
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}
