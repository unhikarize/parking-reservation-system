/**
 * バックエンドで使用するエラーコードの定義
 *
 * フロントエンドはこのコードを受け取り、
 * UI 表示用の文言に変換します。
 */
export const ERROR_CODE = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  INVALID_PASSWORD: "INVALID_PASSWORD",
} as const;

/**
 * ERROR_CODE の値を型として使用するための型エイリアス
 */
export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
