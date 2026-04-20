import { Router } from "express";
import { AuthController } from "@/presentation/controllers/authController";
import { LoginUseCase } from "@/application/useCases/loginUseCase";
import { userRepository } from "@/infrastructure/repositories/userRepository";

const router = Router();

// 依存関係組み立て
const loginUseCase = new LoginUseCase(userRepository);
const authController = new AuthController(loginUseCase);

router.post("/login", authController.login.bind(authController));

export default router;
