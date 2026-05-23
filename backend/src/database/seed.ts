import prisma from "./client.js";
import logger from "../utils/logger.js";

async function main() {
  logger.info("🌱 Seeding database...");

  // ── Scam Patterns ─────────────────────────────────────────
  const scamPatterns = [
    {
      pattern: "undian|hadiah|menang|selamat anda",
      patternType: "keyword",
      category: "Penipuan Undian Berhadiah",
      severity: "high",
      description:
        "Pesan yang mengklaim penerima memenangkan undian atau hadiah besar, biasanya meminta biaya administrasi atau data pribadi.",
    },
    {
      pattern: "\\.apk$|\\.APK$",
      patternType: "regex",
      category: "Modus Kurir APK",
      severity: "high",
      description:
        "Pengiriman file APK berkedok foto paket, resi pengiriman, atau undangan pernikahan. Jika diinstal, malware dapat mencuri data OTP dan SMS.",
    },
    {
      pattern: "bit\\.ly|tinyurl|t\\.me|s\\.id",
      patternType: "regex",
      category: "Tautan Mencurigakan (Phishing)",
      severity: "high",
      description:
        "Penggunaan URL shortener untuk menyembunyikan domain tujuan sebenarnya. Sering dipakai dalam phishing banking dan media sosial.",
    },
    {
      pattern: "transfer.*bukti|verifikasi.*akun|konfirmasi.*data",
      patternType: "regex",
      category: "Social Engineering",
      severity: "medium",
      description:
        "Meminta korban mengirim bukti transfer, data pribadi, atau verifikasi akun melalui kanal tidak resmi.",
    },
    {
      pattern: "OTP|kode verifikasi|PIN|password",
      patternType: "keyword",
      category: "Pencurian Kode OTP",
      severity: "high",
      description:
        "Meminta korban membagikan kode OTP atau PIN yang diterima melalui SMS. Bank dan layanan resmi tidak pernah meminta OTP.",
    },
    {
      pattern: "pinjaman.*online|pinjol|dana.*cair|limit.*naik",
      patternType: "keyword",
      category: "Penipuan Pinjaman Online",
      severity: "medium",
      description:
        "Penawaran pinjaman online ilegal atau klaim pencairan dana palsu yang meminta biaya admin di muka.",
    },
    {
      pattern: "investasi.*untung|profit.*pasti|trading.*mudah|crypto.*gratis",
      patternType: "keyword",
      category: "Penipuan Investasi Bodong",
      severity: "high",
      description:
        "Penawaran investasi dengan janji keuntungan pasti atau tidak realistis. Sering menggunakan skema Ponzi atau money game.",
    },
  ];

  for (const pattern of scamPatterns) {
    await prisma.scamPattern.upsert({
      where: {
        id: `seed-${pattern.category.toLowerCase().replace(/\s+/g, "-")}`,
      },
      update: { ...pattern },
      create: {
        id: `seed-${pattern.category.toLowerCase().replace(/\s+/g, "-")}`,
        ...pattern,
      },
    });
  }

  logger.info(`  ✅ ${scamPatterns.length} scam patterns seeded`);
  logger.info("🌱 Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
