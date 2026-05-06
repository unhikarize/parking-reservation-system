import { UserRole } from "@/domain/entities/User";

/**
 * ログインDTO
 */
export interface LoginDto {
  buildingNumber: number;
  roomNumber: number;
  password: string;
}

/**
 * ログイン成功時のユーザー情報
 */
export interface LoginResponseUserDto {
  id: number;
  buildingNumber: number;
  roomNumber: number;
  name: string;
  role: UserRole;
  isFirstLogin: boolean;
}

/**
 * ログイン成功時のレスポンスDTO
 */
export interface LoginResponseDto {
  token: string;
  user: LoginResponseUserDto;
}
