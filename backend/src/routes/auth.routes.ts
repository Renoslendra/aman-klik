import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// Endpoint untuk login via Google ID Token
router.post("/google", AuthController.googleLogin);

// Endpoint untuk mengambil profile pengguna saat ini (terautentikasi)
router.get("/profile", requireAuth as any, AuthController.getProfile);

export default router;


