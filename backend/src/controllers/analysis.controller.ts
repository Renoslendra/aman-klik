import { Response, NextFunction } from "express";
import { GeminiService } from "../services/gemini.service.js";
import { ScanRepository } from "../database/repositories/scan.repository.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import config from "../config/env.js";
import logger from "../utils/logger.js";

export class AnalysisController {
  /**
   * Post analysis request handler
   */
  public static async analyze(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { text, image } = req.body;
      const normalizedText = typeof text === "string" ? text.trim() : "";
      let normalizedImage:
        | {
            data: string;
            mimeType: string;
            fileName?: string;
          }
        | undefined;

      if (image) {
        const rawData = typeof image.data === "string" ? image.data : "";
        const mimeType = typeof image.mimeType === "string" ? image.mimeType : "";
        const fileName = typeof image.fileName === "string" ? image.fileName : undefined;
        const base64Data = rawData.includes(",") ? rawData.split(",").pop() || "" : rawData;
        const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedMimeTypes.includes(mimeType)) {
          res.status(400).json({
            success: false,
            error: {
              message: "Format screenshot harus PNG, JPG, JPEG, atau WebP.",
            },
          });
          return;
        }

        const imageBytes = Buffer.byteLength(base64Data, "base64");
        if (imageBytes > 4 * 1024 * 1024) {
          res.status(400).json({
            success: false,
            error: {
              message: "Ukuran screenshot maksimal 4 MB.",
            },
          });
          return;
        }

        if (!base64Data || imageBytes === 0) {
          res.status(400).json({
            success: false,
            error: {
              message: "Data screenshot tidak valid.",
            },
          });
          return;
        }

        normalizedImage = {
          data: base64Data,
          mimeType,
          fileName,
        };
      }

      if (!normalizedText && !normalizedImage) {
        res.status(400).json({
          success: false,
          error: {
            message: "Teks pesan atau screenshot harus dikirim dan tidak boleh kosong.",
          },
        });
        return;
      }

      const userId = req.user?.id;
      logger.info(`Analyzing input text length: ${normalizedText.length}, image: ${normalizedImage ? "yes" : "no"} (Authenticated User ID: ${userId || "Guest/Anonymous"})`);
      
      const startTime = Date.now();
      const analysisResult = await GeminiService.analyzeInput({
        text: normalizedText,
        image: normalizedImage
          ? {
              data: normalizedImage.data,
              mimeType: normalizedImage.mimeType,
            }
          : undefined,
      });
      const responseTimeMs = Date.now() - startTime;

      // Persist scan result to the database
      const scanData: any = {
        inputText: normalizedText || `[Screenshot gambar: ${normalizedImage?.fileName || "tanpa nama"}]`,
        inputType: normalizedImage ? "IMAGE" : normalizedText.startsWith("http") ? "URL" : "TEXT",
        score: analysisResult.score,
        riskLevel: analysisResult.riskLevel,
        category: analysisResult.category,
        summary: analysisResult.summary,
        redFlags: analysisResult.redFlags || [],
        recommendations: analysisResult.recommendations || [],
        modelUsed: config.GEMINI_API_KEY ? "gemini-2.5-flash" : "mock-model",
        responseTimeMs,
      };

      if (userId) {
        scanData.user = { connect: { id: userId } };
      }

      const savedScan = await ScanRepository.create(scanData);

      res.status(200).json({
        success: true,
        data: {
          id: savedScan.id,
          ...analysisResult,
          createdAt: savedScan.createdAt,
        },
      });
    } catch (error) {
      logger.error("Analysis Controller Error:", error);
      next(error);
    }
  }
}

