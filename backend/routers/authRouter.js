import { Router } from "express";
import AuthController from "../controllers/authController";
import auth from "../middleware/auth";

const authController = new AuthController();
const router = Router();

router.post("/auth/login", authController.login);

router.post("/auth/logout", authController.logout);

router.get("/auth/check-login", auth, authController.checkLogin);

export default router;
