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
   * UnauthorizedErrorのコンストラクタ
   * @param message エラーメッセージ（デフォルト: "Unauthorized"）
   */
  constructor(message: string = "Unauthorized") {
    super(message);
    this.statusCode = HTTP_STATUS.UNAUTHORIZED;
  }
}
