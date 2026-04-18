/**
 * 環境変数チェック
 * 必須の値がなければ起動を止める
 */
const requiredEnv = ["JWT_SECRET"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
}

/**
 * 本番環境では弱いJWT_SECRETを禁止
 */
if (process.env.NODE_ENV === "production") {
  const secret = process.env.JWT_SECRET!;

  if (secret.length < 32) {
    throw new Error(
      "❌ JWT_SECRET must be at least 32 characters in production",
    );
  }

  if (secret === "super_secret_key") {
    throw new Error("❌ Weak JWT_SECRET is not allowed in production");
  }
}

export const env = {
  JWT_SECRET: process.env.JWT_SECRET!,
};
