import prisma from "../client.js";
import type { Prisma } from "@prisma/client";

/**
 * UserRepository — Data access layer untuk tabel `users`.
 * Semua query database terkait pengguna ada di sini.
 */
export class UserRepository {
  /**
   * Cari user berdasarkan Google ID (untuk OAuth login flow).
   */
  static async findByGoogleId(googleId: string) {
    return prisma.user.findUnique({
      where: { googleId },
    });
  }

  /**
   * Cari user berdasarkan email.
   */
  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Cari user berdasarkan ID internal.
   */
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        googleId: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * Buat user baru atau perbarui jika Google ID sudah ada (upsert).
   * Digunakan saat proses login OAuth.
   */
  static async upsertByGoogleId(data: {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
  }) {
    return prisma.user.upsert({
      where: { googleId: data.googleId },
      update: {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
      },
      create: {
        googleId: data.googleId,
        email: data.email,
        name: data.name,
        avatar: data.avatar,
      },
    });
  }

  /**
   * Ambil daftar semua user (admin only, paginated).
   */
  static async findAll(options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          createdAt: true,
          _count: { select: { scans: true } },
        },
      }),
      prisma.user.count(),
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

