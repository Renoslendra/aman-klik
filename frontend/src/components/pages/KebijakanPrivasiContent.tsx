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

const policySections = [
  {
    title: "1. Data yang Diproses",
    content: "AmanKlik AI memproses data yang Anda kirimkan secara sukarela, termasuk teks pesan, tautan mencurigakan, screenshot chat/gambar, hasil analisis AI, serta informasi akun Google saat Anda masuk seperti nama, email, dan foto profil. Data ini digunakan untuk memberikan skor risiko, tanda bahaya, rekomendasi keamanan, dan riwayat pemindaian.",
  },
  {
    title: "2. Penyimpanan Data",
    content: "Data akun, laporan kontak, dan riwayat pemindaian disimpan pada database Supabase PostgreSQL yang digunakan oleh backend AmanKlik AI. Jika Anda masuk dengan Google, pesan yang dianalisis disimpan agar dapat ditampilkan kembali pada halaman Riwayat beserta skor risiko, kategori, ringkasan, tanda bahaya, rekomendasi, waktu pemindaian, dan relasi ke akun Anda.",
  },
  {
    title: "3. Penggunaan Data untuk Analisis",
    content: "Teks atau gambar yang Anda kirim diproses oleh sistem backend dan layanan AI untuk menghasilkan analisis risiko penipuan. AmanKlik AI tidak meminta kata sandi, PIN, OTP, nomor kartu, atau data finansial rahasia; jangan masukkan data sensitif tersebut saat menggunakan fitur cek pesan.",
  },
  {
    title: "4. Data Tidak Dijual",
    content: "AmanKlik AI tidak menjual, menyewakan, atau memperdagangkan data pribadi pengguna kepada pihak ketiga. Data hanya digunakan untuk menjalankan layanan, menjaga keamanan sistem, menampilkan riwayat milik pengguna, menindaklanjuti laporan, dan meningkatkan kualitas deteksi penipuan.",
  },
  {
    title: "5. Pemindaian Tanpa Login",
    content: "Anda dapat memakai fitur cek pesan tanpa login. Pemindaian tamu dapat tersimpan tanpa relasi akun pengguna untuk kebutuhan operasional, keamanan sistem, dan peningkatan kualitas deteksi. Data tamu tidak muncul sebagai riwayat akun karena tidak terhubung ke identitas pengguna.",
  },
  {
    title: "6. Data Formulir Kontak dan Laporan",
    content: "Saat Anda mengirim formulir Hubungi Kami, AmanKlik AI menyimpan nama, email, kategori, dan isi pesan sebagai laporan agar tim dapat meninjau masukan atau laporan modus penipuan baru. Jika Anda sedang login, laporan dapat dikaitkan dengan akun Anda.",
  },
  {
    title: "7. Kontrol Pengguna",
    content: "Pengguna yang login dapat melihat dan menghapus item riwayat pemindaian miliknya sendiri melalui halaman Riwayat. Token sesi disimpan di browser untuk mempertahankan status login, dan Anda dapat keluar kapan saja melalui tombol Keluar Akun.",
  },
  {
    title: "8. Keamanan Informasi",
    content: "Transmisi data antara browser, backend AmanKlik AI, database, dan layanan AI wajib dilindungi dengan HTTPS/TLS pada production. Akses riwayat menggunakan token JWT, dan backend membatasi akses agar pengguna hanya dapat melihat atau menghapus data miliknya sendiri.",
  },
  {
    title: "9. Kontak Privasi dan Perubahan Kebijakan",
    content: "Untuk pertanyaan tentang privasi, penghapusan data, atau penggunaan data pribadi, hubungi kami melalui halaman Hubungi Kami. Kami dapat memperbarui kebijakan privasi ini sewaktu-waktu, dan setiap perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru.",
  },
];

export default function KebijakanPrivasiContent() {
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
            KEBIJAKAN PRIVASI
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8"
          >
            Kerahasiaan Data Anda adalah<br />
            <span className="text-gradient-trust">Prioritas Utama Kami.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            AmanKlik AI beroperasi dengan prinsip keamanan siber modern demi melindungi data pribadi Anda dan keluarga dari penyalahgunaan.
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
            {policySections.map((section, idx) => (
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

