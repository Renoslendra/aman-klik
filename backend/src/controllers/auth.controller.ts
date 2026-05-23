import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { UserRepository } from "../database/repositories/user.repository.js";
import config from "../config/env.js";
import logger from "../utils/logger.js";

// Inisialisasi Google Auth Client
// Jika GOOGLE_CLIENT_ID kosong, kita tidak menghentikan aplikasi, tapi menggunakan mode mock
const client = config.GOOGLE_CLIENT_ID ? new OAuth2Client(config.GOOGLE_CLIENT_ID) : null;

export class AuthController {
  /**
   * Post Google OAuth Token verification
   */
  public static async googleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { token, isMock } = req.body;
      const mockAuthAllowed = config.NODE_ENV !== "production";

      // 1. Fallback Mock Login (sangat berguna untuk pengembangan lokal/offline atau testing)
      if (isMock) {
        if (!mockAuthAllowed) {
          res.status(400).json({
            success: false,
            error: {
              message: "Mock login tidak diizinkan pada mode production.",
            },
          });
          return;
        }

        logger.info("Using Mock Authentication fallback for development");
        
        // Buat mock user info
        const mockUser = {
          googleId: "mock-google-id-12345",
          email: req.body.email || "renoslendra@gmail.com",
          name: req.body.name || "Renoslendra",
          avatar: req.body.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=Renoslendra",
        };

        const user = await UserRepository.upsertByGoogleId(mockUser);

        // Generate JWT
        const sessionToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          config.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.status(200).json({
          success: true,
          data: {
            token: sessionToken,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              role: user.role,
            },
          },
        });
        return;
      }

      if (!token) {
        res.status(400).json({
          success: false,
          error: {
            message: "Token Google wajib dikirim untuk login.",
          },
        });
        return;
      }

      if (!client) {
        res.status(503).json({
          success: false,
          error: {
            message: "Google OAuth belum dikonfigurasi di server.",
          },
        });
        return;
      }

      // 2. Real Google OAuth Verification
      try {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: config.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload || !payload.sub || !payload.email || !payload.name) {
          res.status(400).json({
            success: false,
            error: {
              message: "Verifikasi Google gagal. Token tidak mengandung informasi profil lengkap.",
            },
          });
          return;
        }

        // Simpan atau update user di database
        const user = await UserRepository.upsertByGoogleId({
          googleId: payload.sub,
          email: payload.email,
          name: payload.name,
          avatar: payload.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(payload.name)}`,
        });

        // Generate JWT
        const sessionToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          config.JWT_SECRET,
          { expiresIn: "7d" }
        );

        res.status(200).json({
          success: true,
          data: {
            token: sessionToken,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              avatar: user.avatar,
              role: user.role,
            },
          },
        });
      } catch (googleError: any) {
        logger.error("Google Token Verification Error:", googleError);
        res.status(401).json({
          success: false,
          error: {
            message: "Token Google tidak valid atau telah kedaluwarsa.",
            details: googleError.message,
          },
        });
      }
    } catch (error) {
      logger.error("Auth Controller Error:", error);
      next(error);
    }
  }

  /**
   * Get Current Authenticated User Profile
   */
  public static async getProfile(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: {
            message: "Tidak terautentikasi.",
          },
        });
        return;
      }

      const user = await UserRepository.findById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          error: {
            message: "Pengguna tidak ditemukan.",
          },
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      logger.error("Auth Profile Error:", error);
      next(error);
    }
  }
}
