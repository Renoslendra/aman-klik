"use client";

import { motion } from "framer-motion";
import { Shield, Gauge, AlertTriangle, MessageSquare, Siren, GraduationCap } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

const features = [
  { icon: Shield, title: "Deteksi Scam AI", description: "Analisis chat, screenshot, atau link untuk menemukan pola phishing, OTP palsu, hadiah palsu, dan modus lainnya.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
  { icon: Gauge, title: "Risk Score 0–100", description: "Skor visual membantu pengguna memahami apakah pesan terlihat aman, mencurigakan, atau sangat berisiko.", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400" },
  { icon: AlertTriangle, title: "Red Flag Detector", description: "AmanKlik menandai bagian pesan yang berbahaya, seperti link palsu, desakan, dan permintaan OTP.", iconBg: "bg-red-500/10", iconColor: "text-red-400" },
  { icon: MessageSquare, title: "Balasan Aman", description: "Buat balasan sopan yang bisa langsung dikirim ke keluarga atau pengirim pesan tanpa terdengar menggurui.", iconBg: "bg-green-500/10", iconColor: "text-green-400" },
  { icon: Siren, title: "Mode Darurat", description: "Checklist cepat jika pengguna sudah terlanjur klik link, transfer uang, atau membagikan kode OTP.", iconBg: "bg-red-500/10", iconColor: "text-red-400" },
  { icon: GraduationCap, title: "Edukasi Keluarga", description: "Tips singkat dan mudah dipahami agar keluarga semakin peka terhadap modus penipuan digital.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400" },
];

export default function FeatureCardsSection() {
  return (
    <section id="fitur" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">FITUR</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Semua yang keluarga butuhkan<br /><span className="text-gradient-trust">untuk tetap aman.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto mt-6">Dari deteksi risiko sampai balasan sopan, AmanKlik membantu pengguna mengambil keputusan tanpa panik.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.2 } }} className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-transparent hover:border-cyan-500/10 transition-colors group">
              <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}><feature.icon className={`w-6 h-6 ${feature.iconColor}`} /></div>
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
