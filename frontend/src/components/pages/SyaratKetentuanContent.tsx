"use client";

import { motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const termsSections = [
  {
    title: "1. Penerimaan Ketentuan Layanan",
    content: "Dengan mengakses, menelusuri, atau menggunakan platform AmanKlik AI, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan penggunaan ini. Jika Anda tidak menyetujui salah satu poin dalam dokumen ini, harap segera menghentikan penggunaan layanan kami.",
  },
  {
    title: "2. Deskripsi Layanan",
    content: "AmanKlik AI adalah layanan analisis pesan penipuan berbasis AI yang membantu pengguna memeriksa teks, tautan, dan screenshot mencurigakan. Layanan memberikan skor risiko, kategori, ringkasan, tanda bahaya, rekomendasi langkah aman, riwayat pemindaian untuk pengguna login, dan kanal laporan melalui formulir Hubungi Kami.",
  },
  {
    title: "3. Batasan Akurasi dan Tanggung Jawab",
    content: "AmanKlik AI memberikan analisis indikasi risiko berbasis kecerdasan buatan dan pola penipuan yang tersedia. Hasil analisis bersifat informatif sebagai pertimbangan pencegahan dini dan tidak dijamin 100% akurat, tidak menggantikan nasihat hukum, dan bukan jaminan keamanan mutlak. Keputusan akhir untuk bertransaksi, mengeklik tautan, atau mengirim data pribadi tetap menjadi tanggung jawab pengguna.",
  },
  {
    title: "4. Penggunaan yang Diizinkan",
    content: "Anda boleh menggunakan layanan untuk memeriksa pesan pribadi, membantu keluarga mengenali modus penipuan, mempelajari edukasi keamanan digital, dan melaporkan pesan mencurigakan secara wajar. Anda dilarang menyalahgunakan layanan untuk spam, pengujian otomatis berlebihan, serangan API, reverse engineering, scraping tanpa izin, atau mengunggah konten yang melanggar hukum.",
  },
  {
    title: "5. Ketentuan Akun",
    content: "Login Google digunakan untuk menghubungkan pemindaian dengan akun Anda dan menampilkan riwayat. Anda bertanggung jawab menjaga keamanan akun Google dan perangkat yang digunakan. Jika Anda menghapus item riwayat melalui aplikasi, data tersebut tidak lagi ditampilkan di akun Anda sesuai kemampuan sistem yang tersedia.",
  },
  {
    title: "6. Hak Kekayaan Intelektual",
    content: "Seluruh elemen visual, logo, merek dagang 'AmanKlik AI', kode pemrograman, arsitektur data, ilustrasi, serta teks pendukung yang terdapat dalam situs ini merupakan hak cipta eksklusif milik tim AmanKlik AI dan dilindungi oleh Undang-Undang Republik Indonesia Nomor 28 Tahun 2014 tentang Hak Cipta. Penggunaan, penyalinan, atau modifikasi komersial tanpa izin tertulis dari kami adalah pelanggaran hukum.",
  },
  {
    title: "7. Batasan Akses & Pembaruan Layanan",
    content: "Kami berhak memperbarui sistem pendeteksian, membatasi akses ke fitur tertentu, atau menangguhkan sementara layanan demi pemeliharaan keamanan tanpa pemberitahuan sebelumnya. Kami tidak menjamin platform akan selalu bebas dari gangguan koneksi pihak ketiga, bug teknis, atau kelambatan respons server.",
  },
  {
    title: "8. Hukum yang Mengatur",
    content: "Syarat dan ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di wilayah Negara Kesatuan Republik Indonesia. Setiap perselisihan yang timbul dari atau terkait dengan penggunaan layanan ini akan diselesaikan secara musyawarah mufakat terlebih dahulu.",
  },
];

export default function SyaratKetentuanContent() {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-8 overflow-hidden min-h-screen">
      {/* Dynamic Hexagon Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none">
        <ShapeGrid
          shape="hexagon"
          borderColor="#1e293b"
          hoverFillColor="rgba(34, 211, 238, 0.05)"
          squareSize={70}
          speed={0.2}
          direction="right"
          hoverTrailAmount={5}
          gradientColor="#0B1120"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label shiny-text">
            SYARAT & KETENTUAN
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8"
          >
            Syarat & Ketentuan<br />
            <span className="text-gradient-trust">Penggunaan Layanan.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Harap baca dengan saksama seluruh aturan dan ketentuan penggunaan platform sebelum menggunakan layanan deteksi scam kami.
          </motion.p>
        </motion.div>

        {/* Content Box */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="liquid-glass rounded-2xl p-6 md:p-10 border border-slate-800/40"
        >
          <div className="space-y-10">
            {termsSections.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <h2 className="text-lg md:text-xl font-[Sora,sans-serif] font-semibold text-white tracking-wide">
                  {section.title}
                </h2>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-400 font-medium">
            <span>Terakhir Diperbarui: 22 Mei 2026</span>
            <span>AmanKlik AI — Komunitas Aman Transaksi Digital</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

