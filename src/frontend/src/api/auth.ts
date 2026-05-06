import { apiClient } from "@/api/client";

/**
 * ログインリクエストDTO
 */
export interface LoginRequest {
  buildingNumber: number;
  roomNumber: number;
  password: string;
}

/**
 * ログイン成功時のユーザー情報
 */
export interface LoginResponseUser {
  id: number;
  buildingNumber: number;
  roomNumber: number;
  name: string;
  role: string;
  isFirstLogin: boolean;
}

/**
 * ログイン成功時のレスポンスDTO
 */
export interface LoginResponse {
  token: string;
  user: LoginResponseUser;
}

/**
 * 認証APIにログインリクエストを送信する
 * @param payload ログインリクエスト
 * @returns ログインレスポンス
 */
export const loginApi = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/api/auth/login",
    payload,
  );
  return response.data;
};
