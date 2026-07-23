import { Router } from "express";
import { AnalysisController } from "../controllers/analysis.controller.js";
import { optionalAuth } from "../middlewares/auth.js";
import rateLimiter from "../middlewares/rateLimiter.js";

const router = Router();

// Apply rate limiter and optional authentication to scan requests
router.post("/scan", rateLimiter, optionalAuth as any, AnalysisController.analyze);

export default router;


