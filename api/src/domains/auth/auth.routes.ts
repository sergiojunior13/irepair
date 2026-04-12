import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.get("/me", authMiddleware, authController.me.bind(authController));
authRoutes.post("/register", authController.register.bind(authController));
authRoutes.post("/login", authController.login.bind(authController));
authRoutes.post("/logout", authController.logout.bind(authController));

export { authRoutes };
