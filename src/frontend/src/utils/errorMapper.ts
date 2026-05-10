import {
  API_ERROR_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
} from "@/constants/messages";
import { ApiError } from "@/utils/ApiError";

/**
 * バックエンド API のエラーコードを、
 * フロントエンドで表示するメッセージに変換する
 *
 * @param code API から返却されたエラーコード
 * @returns 表示用メッセージ、該当コードがなければ undefined
 */
export const mapApiErrorCodeToMessage = (code: string): string | undefined => {
  return API_ERROR_MESSAGES[code];
};

/**
 * 受け取った例外をユーザー向けメッセージに変換する
 *
 * @param error 取得したエラーオブジェクト
 * @returns ユーザー向けのエラーメッセージ
 */
export const toUserFacingErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    const mapped = mapApiErrorCodeToMessage(error.code);
    if (mapped) {
      return mapped;
    }
  }
  if (error instanceof Error) {
    const mapped = mapApiErrorCodeToMessage(error.message);
    if (mapped) {
      return mapped;
    }
    return error.message;
  }
  return DEFAULT_ERROR_MESSAGE;
};
