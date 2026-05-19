"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Copy, Shield, MessageSquare } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

const redFlags = ['Menggunakan kata mendesak seperti "segera"', "Link tidak terlihat seperti domain resmi", "Meminta konfirmasi data pribadi", "Memberi ancaman akun/paket akan diblokir"];
const safeActions = ["Jangan klik link di pesan tersebut", "Cek aplikasi resmi atau hubungi layanan resmi", "Jangan kirim OTP, PIN, atau password", "Bagikan peringatan ini ke keluarga"];
const safeReply = "Terima kasih infonya. Saya akan cek langsung melalui aplikasi atau kontak resmi dulu ya. Untuk keamanan, saya tidak akan membuka link dari pesan ini.";

export default function ResultPreviewSection() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(safeReply); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">HASIL ANALISIS</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Hasilnya jelas:<br /><span className="text-gradient-trust">risiko, alasan, dan langkah aman.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-4">
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="hsl(222 50% 12%)" strokeWidth="6" /><circle cx="40" cy="40" r="34" fill="none" stroke="hsl(0 84% 60%)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * 0.18}`} transform="rotate(-90 40 40)" /></svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-[Sora,sans-serif] font-bold text-red-400">82</span><span className="text-[10px] text-slate-500">/100</span></div>
                </div>
                <div><p className="text-sm font-medium text-red-400">Risiko Tinggi</p><p className="text-xs text-slate-500 mt-1">Skor risiko tinggi — hati-hati</p></div>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-400" /></div><div><p className="text-sm font-medium text-white">Phishing / Link Palsu</p><p className="text-xs text-slate-500 mt-0.5">Jenis penipuan terdeteksi</p></div></div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center"><Shield className="w-5 h-5 text-yellow-400" /></div><p className="text-sm font-medium text-white">Ancaman Utama</p></div>
              <p className="text-sm text-slate-400 leading-relaxed">Pesan mencoba membuat pengguna klik link dan mengisi data pribadi.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-4">
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Tanda Bahaya</p>
              <div className="space-y-3">{redFlags.map((flag, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />{flag}</motion.div>))}</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Langkah Aman</p>
              <div className="space-y-3">{safeActions.map((action, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{action}</motion.div>))}</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><MessageSquare className="w-4 h-4 text-cyan-400" /><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Balasan Aman</p></div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-sm text-slate-300 italic">{safeReply}</div>
              <button onClick={handleCopy} className="mt-3 flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">{copied ? <><CheckCircle className="w-3.5 h-3.5" />Tersalin</> : <><Copy className="w-3.5 h-3.5" />Salin balasan</>}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
