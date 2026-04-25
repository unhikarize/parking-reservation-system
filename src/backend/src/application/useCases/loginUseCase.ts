import { IUserRepository } from "@/domain/repositories/UserRepository";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * ログイン処理を担当するユースケース
 *
 * 認証情報（号棟・部屋番号・パスワード）をもとにユーザーを検証し、
 * 成功時はJWTトークンを発行する
 */
export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * ログイン処理を実行する
   *
   * @param input ログイン情報
   * @param input.buildingNumber 号棟番号
   * @param input.roomNumber 部屋番号
   * @param input.password パスワード
   *
   * @returns 認証トークンとユーザー情報
   *
   * @throws UnauthorizedError 認証に失敗した場合
   */
  async execute(input: {
    buildingNumber: number;
    roomNumber: number;
    password: string;
  }) {
    const user = await this.userRepository.findByBuildingAndRoom(
      input.buildingNumber,
      input.roomNumber,
    );

    if (!user) {
      throw new UnauthorizedError("ユーザーが存在しません");
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedError("パスワードが不正です");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user.id,
        buildingNumber: user.buildingNumber,
        roomNumber: user.roomNumber,
        name: user.name,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
      },
    };
  }
}
