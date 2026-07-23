import { Router } from "express";
import { ContactController } from "../controllers/contact.controller.js";
import { optionalAuth } from "../middlewares/auth.js";

const router = Router();

// POST /api/v1/contact — Kirim pesan formulir kontak
// Menggunakan optionalAuth agar bisa mencatat userId jika pengirim sudah login
router.post("/", optionalAuth as any, ContactController.submit);

export default router;

