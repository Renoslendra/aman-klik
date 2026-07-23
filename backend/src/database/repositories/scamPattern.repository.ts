import prisma from "../client.js";

/**
 * ScamPatternRepository — Data access layer untuk tabel `scam_patterns`.
 * Berisi pola-pola penipuan yang sudah diketahui untuk enrichment analisis.
 */
export class ScamPatternRepository {
  /**
   * Ambil semua pola aktif (untuk digunakan saat analisis pesan).
   */
  static async findAllActive() {
    return prisma.scamPattern.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Cari pola berdasarkan kategori tertentu.
   */
  static async findByCategory(category: string) {
    return prisma.scamPattern.findMany({
      where: { category, isActive: true },
    });
  }

  /**
   * Tambah pola penipuan baru (admin only).
   */
  static async create(data: {
    pattern: string;
    patternType: string;
    category: string;
    severity?: string;
    description: string;
  }) {
    return prisma.scamPattern.create({ data });
  }

  /**
   * Nonaktifkan pola tertentu (soft delete).
   */
  static async deactivate(id: string) {
    return prisma.scamPattern.update({
      where: { id },
      data: { isActive: false },
    });
  }
}

