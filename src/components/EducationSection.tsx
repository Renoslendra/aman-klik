"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Lightbulb, Shield } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

const modes = [{ id: "biasa", label: "Mode Biasa", icon: BookOpen }, { id: "ortu", label: "Mode Orang Tua", icon: Users }];
const examples = {
  biasa: { text: "Pesan ini memiliki indikasi phishing karena meminta data pribadi melalui link tidak resmi. Domain yang digunakan tidak sesuai dengan domain resmi layanan yang disebutkan, dan terdapat desakan waktu yang tidak wajar.", tips: ["Phishing adalah trik untuk membuat kita mengisi data penting di halaman palsu.", "Cek domain link sebelum mengklik — yang mirip belum tentu asli.", "Bank dan ekspedisi resmi tidak akan meminta data melalui chat pribadi."] },
  ortu: { text: "Pesan ini sebaiknya jangan dibuka. Link-nya belum tentu resmi, dan bisa meminta data penting seperti OTP atau password. Lebih baik cek langsung melalui aplikasi resmi atau hubungi nomor resmi.", tips: ["Jangan buka link dari pesan yang tidak jelas asalnya.", "Kalau ragu, cek langsung di aplikasi resmi atau telepon nomor resmi.", "Kode OTP tidak boleh dibagikan ke siapa pun, termasuk orang yang mengaku dari bank."] },
};

export default function EducationSection() {
  const [activeMode, setActiveMode] = useState<"biasa" | "ortu">("biasa");

  return (
    <section id="edukasi" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">EDUKASI</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Bahasa sederhana untuk semua<br /><span className="text-gradient-trust">anggota keluarga.</span></motion.h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="liquid-glass rounded-xl p-1 flex items-center gap-1 relative">
              {modes.map((mode) => (
                <button key={mode.id} onClick={() => setActiveMode(mode.id as "biasa" | "ortu")} className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMode === mode.id ? "text-slate-950" : "text-slate-400 hover:text-white"}`}>
                  {activeMode === mode.id && <motion.div layoutId="mode-pill" className="absolute inset-0 bg-cyan-500 rounded-lg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <mode.icon className="w-4 h-4 relative z-10" /><span className="relative z-10">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-cyan-400" /></div>
                <div className="liquid-glass rounded-2xl p-5 flex-1"><p className="text-xs text-cyan-400 font-medium mb-2">Tips Kliko</p><p className="text-sm text-slate-300 leading-relaxed">{examples[activeMode].text}</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {examples[activeMode].tips.map((tip, i) => (
                  <motion.div key={tip} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="liquid-glass rounded-xl p-4"><Lightbulb className="w-4 h-4 text-yellow-400 mb-2" /><p className="text-xs text-slate-400 leading-relaxed">{tip}</p></motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
