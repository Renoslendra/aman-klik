import prisma from "../client.js";
import type { Prisma } from "@prisma/client";

/**
 * ScanRepository — Data access layer untuk tabel `scans`.
 * Semua query database terkait riwayat pemindaian pesan ada di sini.
 */
export class ScanRepository {
  /**
   * Simpan hasil analisis scan baru ke database.
   */
  static async create(data: Prisma.ScanCreateInput) {
    return prisma.scan.create({ data });
  }

  /**
   * Ambil satu scan berdasarkan ID.
   */
  static async findById(id: string) {
    return prisma.scan.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  /**
   * Ambil semua scan milik user tertentu (dengan pagination).
   */
  static async findByUserId(
    userId: string,
    options: { page?: number; limit?: number; riskLevel?: string } = {}
  ) {
    const { page = 1, limit = 20, riskLevel } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.ScanWhereInput = {
      userId,
      ...(riskLevel ? { riskLevel: riskLevel as "safe" | "medium" | "high" } : {}),
    };

    const [scans, total] = await Promise.all([
      prisma.scan.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.scan.count({ where }),
    ]);

    return {
      data: scans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Ambil statistik scan untuk user tertentu.
   */
  static async getStatsByUserId(userId: string) {
    const [total, highRisk, mediumRisk, safe] = await Promise.all([
      prisma.scan.count({ where: { userId } }),
      prisma.scan.count({ where: { userId, riskLevel: "high" } }),
      prisma.scan.count({ where: { userId, riskLevel: "medium" } }),
      prisma.scan.count({ where: { userId, riskLevel: "safe" } }),
    ]);

    return { total, highRisk, mediumRisk, safe };
  }

  /**
   * Hapus scan berdasarkan ID (hanya jika milik user yang bersangkutan).
   */
  static async deleteByIdAndUserId(id: string, userId: string) {
    return prisma.scan.deleteMany({
      where: { id, userId },
    });
  }
}


