import { Router } from "express";
import { EmergencyController } from "../controllers/emergency.controller.js";
import { optionalAuth } from "../middlewares/auth.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/diagnose", rateLimiter, optionalAuth as any, EmergencyController.diagnose);

export default router;


