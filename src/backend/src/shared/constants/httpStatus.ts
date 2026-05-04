/**
 * HTTPステータスコードの定数
 */
export const HTTP_STATUS = {
  /** 成功 */
  OK: 200,
  /** 作成成功 */
  CREATED: 201,
  /** コンテンツなし */
  NO_CONTENT: 204,

  /** バッドリクエスト */
  BAD_REQUEST: 400,
  /** 認証が必要 */
  UNAUTHORIZED: 401,
  /** アクセス禁止 */
  FORBIDDEN: 403,
  /** 見つからない */
  NOT_FOUND: 404,
  /** 競合 */
  CONFLICT: 409,

  /** 内部サーバーエラー */
  INTERNAL_SERVER_ERROR: 500,
} as const;
