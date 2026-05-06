/**
 * ロガーオブジェクト
 */
export const logger = {
  /**
   * 情報ログを出力する
   * @param message ログメッセージ
   * @returns void
   */
  info: (message: string) => console.info(message),

  /**
   * エラーログを出力する
   * @param error エラーオブジェクト
   * @returns void
   */
  error: (error: unknown) => {
    if (error instanceof Error) {
      console.error(error.stack ?? error.message);
    } else {
      console.error(error);
    }
  },
};
