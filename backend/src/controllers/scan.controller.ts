import { Response, NextFunction } from "express";
import { ScanRepository } from "../database/repositories/scan.repository.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import logger from "../utils/logger.js";

export class ScanController {
  /**
   * Get User Scan History (Paginated)
   */
  public static async getHistory(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: "Akses ditolak. Silakan login terlebih dahulu." },
        });
        return;
      }

      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const riskLevel = req.query.riskLevel as string; // Optional filter

      logger.info(`Fetching history for user: ${userId}, page: ${page}, limit: ${limit}, riskLevel: ${riskLevel || "all"}`);

      const result = await ScanRepository.findByUserId(userId, {
        page,
        limit,
        riskLevel,
      });

      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      logger.error("Get Scan History Error:", error);
      next(error);
    }
  }

  /**
   * Get User Scan Statistics
   */
  public static async getStats(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: "Akses ditolak. Silakan login terlebih dahulu." },
        });
        return;
      }

      logger.info(`Fetching scan statistics for user: ${userId}`);

      const stats = await ScanRepository.getStatsByUserId(userId);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      logger.error("Get Scan Stats Error:", error);
      next(error);
    }
  }

  /**
   * Delete specific scan from history
   */
  public static async deleteScan(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: { message: "Akses ditolak. Silakan login terlebih dahulu." },
        });
        return;
      }

      if (!id) {
        res.status(400).json({
          success: false,
          error: { message: "ID pemindaian harus ditentukan." },
        });
        return;
      }

      logger.info(`User ${userId} attempting to delete scan: ${id}`);

      const deleteResult = await ScanRepository.deleteByIdAndUserId(id, userId);

      if (deleteResult.count === 0) {
        res.status(404).json({
          success: false,
          error: { message: "Data pemindaian tidak ditemukan atau Anda tidak memiliki akses untuk menghapusnya." },
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Riwayat pemindaian berhasil dihapus.",
      });
    } catch (error) {
      logger.error("Delete Scan Error:", error);
      next(error);
    }
  }
}


