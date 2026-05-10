/**
 * アプリケーションで使用する UI 表示用文言の定義
 *
 * ここでは画面タイトル、ボタン文言、プレースホルダ、
 * ログイン成功・失敗メッセージなどを一元管理します。
 */
export const UI_MESSAGES = {
  /** タイトル */
  APP_TITLE: "駐車場予約システム",
  LOGIN_TITLE: "ログイン",

  /** プレースホルダ */
  BUILDING_PLACEHOLDER: "号棟",
  ROOM_PLACEHOLDER: "部屋番号",
  PASSWORD_PLACEHOLDER: "パスワード",

  /** ボタン */
  LOGIN_BUTTON: "ログイン",

  /** メッセージ */
  REQUIRED_FIELDS: "すべての項目を入力してください",
  LOGIN_SUCCESS: "ログイン成功！",
  FIRST_LOGIN_SUCCESS: "初回ログイン成功！パスワードを変更してください。",
  LOGIN_FAILED: "ログインに失敗しました",
};

/**
 * バックエンド API で返却されるエラーコードと
 * フロントエンドで表示するメッセージの対応表
 */
export const API_ERROR_MESSAGES: Record<string, string> = {
  USER_NOT_FOUND: "ユーザーが存在しません",
  INVALID_PASSWORD: "パスワードが不正です",
};

/**
 * API からのエラーコードに該当しない場合のデフォルトメッセージ
 */
export const DEFAULT_ERROR_MESSAGE = UI_MESSAGES.LOGIN_FAILED;
