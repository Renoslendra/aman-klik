import { Router } from "express";
import analysisRoutes from "./analysis.routes.js";
import authRoutes from "./auth.routes.js";
import scanRoutes from "./scan.routes.js";
import contactRoutes from "./contact.routes.js";
import emergencyRoutes from "./emergency.routes.js";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "up",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// API Routes
router.use("/analysis", analysisRoutes);
router.use("/auth", authRoutes);
router.use("/scans", scanRoutes);
router.use("/contact", contactRoutes);
router.use("/emergency", emergencyRoutes);

export default router;

