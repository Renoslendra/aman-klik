import { Response, NextFunction } from "express";
import { ReportRepository } from "../database/repositories/report.repository.js";
import { UserRepository } from "../database/repositories/user.repository.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import logger from "../utils/logger.js";

export class ContactController {
  /**
   * Submit Contact Form (Simpan sebagai Report)
   */
  public static async submit(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, category, message } = req.body;

      if (!name || !email || !message) {
        res.status(400).json({
          success: false,
          error: {
            message: "Nama, surel (email), dan pesan tidak boleh kosong.",
          },
        });
        return;
      }

      logger.info(`Received contact form submission from: ${name} (${email}), category: ${category}`);

      // 1. Tentukan user ID untuk relasi Report
      let userId = req.user?.id;

      if (!userId) {
        // Jika anonim/guest, gunakan atau buat akun khusus "Guest System"
        const guestUser = await UserRepository.upsertByGoogleId({
          googleId: "system-guest-oauth-id",
          email: "guest@amanklik.ai",
          name: "Sistem Tamu AmanKlik",
          avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Guest",
        });
        userId = guestUser.id;
      }

      // 2. Simpan pesan sebagai Report di database
      const reasonText = `[Kategori: ${category || "Pesan Umum"}]\nPengirim: ${name} (${email})\n\nPesan:\n${message}`;
      
      const newReport = await ReportRepository.create({
        user: { connect: { id: userId } },
        reason: reasonText,
        status: "PENDING",
      });

      res.status(200).json({
        success: true,
        message: "Pesan Anda berhasil terkirim dan disimpan di sistem.",
        data: {
          id: newReport.id,
          createdAt: newReport.createdAt,
        },
      });
    } catch (error) {
      logger.error("Contact Form Submit Error:", error);
      next(error);
    }
  }
}
