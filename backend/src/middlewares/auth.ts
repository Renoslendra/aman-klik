import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/env.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

/**
 * Middleware untuk memverifikasi JWT secara wajib (Required Auth)
 */
export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: {
          message: "Akses ditolak. Token autentikasi tidak ditemukan.",
        },
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET) as {
      id: string;
      email: string;
      name: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: {
        message: "Token tidak valid atau telah kedaluwarsa.",
      },
    });
  }
};

/**
 * Middleware untuk memverifikasi JWT secara opsional (Optional Auth)
 * Jika token ada dan valid, user disimpan di req.user. Jika tidak ada, request tetap dilanjutkan.
 */
export const optionalAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, config.JWT_SECRET) as {
        id: string;
        email: string;
        name: string;
        role: string;
      };
      req.user = decoded;
    }
    next();
  } catch (error) {
    // Abaikan error dan lanjutkan sebagai anonymous
    next();
  }
};


