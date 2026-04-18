import "@/config/env";
import adminUserRoutes from "@/presentation/routes/adminUserRoutes";
import authRoutes from "@/presentation/routes/authRoutes";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminUserRoutes);

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
