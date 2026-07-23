import prisma from "../client.js";
import type { Prisma } from "@prisma/client";

/**
 * ReportRepository — Data access layer untuk tabel `reports`.
 * Semua query database terkait laporan penipuan ada di sini.
 */
export class ReportRepository {
  /**
   * Buat laporan baru dari pengguna.
   */
  static async create(data: Prisma.ReportCreateInput) {
    return prisma.report.create({ data });
  }

  /**
   * Ambil semua laporan (admin dashboard, paginated).
   */
  static async findAll(options: { page?: number; limit?: number; status?: string } = {}) {
    const { page = 1, limit = 20, status } = options;
    const skip = (page - 1) * limit;

    const where: Prisma.ReportWhereInput = status
      ? { status: status as "PENDING" | "REVIEWED" | "RESOLVED" | "DISMISSED" }
      : {};

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true, email: true } },
          scan: { select: { id: true, inputText: true, score: true, riskLevel: true, category: true } },
        },
      }),
      prisma.report.count({ where }),
    ]);

    return {
      data: reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Update status laporan (admin review flow).
   */
  static async updateStatus(id: string, status: "PENDING" | "REVIEWED" | "RESOLVED" | "DISMISSED") {
    return prisma.report.update({
      where: { id },
      data: { status },
    });
  }
}


