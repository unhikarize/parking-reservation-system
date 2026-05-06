import "@/config/env";
import adminUserRoutes from "@/presentation/routes/adminUserRoutes";
import authRoutes from "@/presentation/routes/authRoutes";
import { errorHandler } from "@/presentation/middlewares/errorHandler";
import { logger } from "@/shared/utils/logger";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminUserRoutes);

app.use("/api/auth", authRoutes);

// グローバルエラーハンドラーミドルウェア（最後に登録）
app.use(errorHandler);

app.listen(3000, () => {
  logger.info("Server running on http://localhost:3000");
});
