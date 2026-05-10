import { apiClient } from "@/api/client";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/messages";
import { ApiError } from "@/utils/ApiError";
import axios from "axios";

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
 * @throws Error エラーメッセージ
 */
export const loginApi = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      payload,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const responseData = error.response.data as {
        code?: string;
        message?: string;
      };
      if (responseData.code) {
        throw new ApiError(responseData.code, responseData.message);
      }
      if (responseData.message) {
        throw new Error(responseData.message);
      }
    }
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};
