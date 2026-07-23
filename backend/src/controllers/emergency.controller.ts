import { Response, NextFunction } from "express";
import { GeminiService } from "../services/gemini.service.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import logger from "../utils/logger.js";

export class EmergencyController {
  public static async diagnose(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { description, category } = req.body;
      const normalizedDesc = typeof description === "string" ? description.trim() : "";

      if (!normalizedDesc || normalizedDesc.length < 10) {
        res.status(400).json({
          success: false,
          error: {
            message: "Deskripsi insiden harus diisi minimal 10 karakter.",
          },
        });
        return;
      }

      const validCategories = ["transfer", "otp", "hack", "link", "apk", "other"];
      const normalizedCategory =
        typeof category === "string" && validCategories.includes(category) ? category : undefined;

      logger.info(
        `Emergency diagnosis request. Category: ${normalizedCategory || "auto"}, Description length: ${normalizedDesc.length}`
      );

      const result = await GeminiService.diagnoseEmergency(normalizedDesc, normalizedCategory);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error("Emergency Controller Error:", error);
      next(error);
    }
  }
}


