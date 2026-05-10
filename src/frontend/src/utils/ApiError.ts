/**
 * API から返却されたエラーを表すカスタムエラークラス
 *
 * コード（USER_NOT_FOUND など）とメッセージを明確に区別して保持する
 */
export class ApiError extends Error {
  /**
   * エラーコード（USER_NOT_FOUND など）
   */
  code: string;

  /**
   * ApiError のコンストラクタ
   *
   * @param code エラーコード
   * @param message エラーメッセージ（デフォルト: コード値）
   */
  constructor(code: string, message: string = code) {
    super(message);
    this.code = code;
    this.name = "ApiError";
  }
}
