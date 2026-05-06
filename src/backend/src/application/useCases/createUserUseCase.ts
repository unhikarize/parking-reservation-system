import {
  CreateUserDto,
  CreateUserResponseDto,
  createUserSchema,
} from "@/application/dto/CreateUserDto";
import { userRepository } from "@/infrastructure/repositories/userRepository";
import bcrypt from "bcrypt";

/**
 * ユーザー作成ユースケース
 *
 * 処理内容：
 * - 入力値バリデーション
 * - 重複ユーザーチェック
 * - パスワードハッシュ化
 * - ユーザー登録
 *
 * @param dto ユーザー作成DTO
 * @returns 作成されたユーザー（パスワード除外）
 * @throws Error バリデーションエラー / 重複エラー
 */
export const createUserUseCase = {
  execute: async (dto: CreateUserDto): Promise<CreateUserResponseDto> => {
    // バリデーション
    const parsed = createUserSchema.safeParse(dto);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const { buildingNumber, roomNumber, name, password } = parsed.data;

    // 重複チェック
    const existing = await userRepository.findUserByBuildingAndRoom(
      buildingNumber,
      roomNumber,
    );

    if (existing) {
      throw new Error("既に存在するユーザーです");
    }

    // パスワードハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);

    // 作成
    const user = await userRepository.createUser({
      buildingNumber,
      roomNumber,
      name,
      passwordHash,
    });

    return {
      id: user.id,
      buildingNumber: user.buildingNumber,
      roomNumber: user.roomNumber,
      name: user.name,
    };
  },
};
