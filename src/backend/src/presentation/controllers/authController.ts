import { LoginUseCase } from "@/application/useCases/loginUseCase";
import { HTTP_STATUS } from "@/shared/constants/httpStatus";
import { Request, Response } from "express";

/**
 * 認証関連のHTTPリクエストを処理するコントローラ
 */
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  /**
   * ログインAPI
   *
   * リクエストボディの認証情報をもとにログイン処理を実行し、
   * JWTトークンを返却する
   *
   * @param req HTTPリクエスト
   * @param res HTTPレスポンス
   */
  async login(req: Request, res: Response): Promise<void> {
    const result = await this.loginUseCase.execute(req.body);
    res.status(HTTP_STATUS.OK).json(result);
  }
}
