import { Router } from "express";
import { ScanController } from "../controllers/scan.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// Semua route di sini membutuhkan otentikasi JWT wajib
router.use(requireAuth as any);

// GET /api/v1/scans — Ambil riwayat scan paginated
router.get("/", ScanController.getHistory);

// GET /api/v1/scans/stats — Ambil statistik scan
router.get("/stats", ScanController.getStats);

// DELETE /api/v1/scans/:id — Hapus item scan tertentu
router.delete("/:id", ScanController.deleteScan);

export default router;
