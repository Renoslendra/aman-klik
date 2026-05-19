"use client";

import { motion } from "framer-motion";
import { Send, Eye, ShieldCheck } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

const steps = [
  { number: "1", icon: Send, title: "Kirim Pesan", description: "Upload screenshot atau tempel teks/link yang mencurigakan.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", orbColor: "from-cyan-500/20 to-cyan-500/0" },
  { number: "2", icon: Eye, title: "Baca Risiko", description: "AmanKlik menampilkan skor risiko, tanda bahaya, dan alasan sederhana.", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", orbColor: "from-blue-500/20 to-blue-500/0" },
  { number: "3", icon: ShieldCheck, title: "Ambil Langkah Aman", description: "Salin balasan aman, buka mode darurat, atau bagikan edukasi ke keluarga.", iconBg: "bg-green-500/10", iconColor: "text-green-400", orbColor: "from-green-500/20 to-green-500/0" },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">CARA KERJA</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Tiga langkah sederhana<br /><span className="text-gradient-trust">sebelum mengambil keputusan.</span></motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20" />
          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl ${step.iconBg} flex items-center justify-center relative z-10`}><step.icon className={`w-7 h-7 ${step.iconColor}`} /></div>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.orbColor} blur-xl`} />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[hsl(222_50%_11%)] border border-slate-700/50 flex items-center justify-center z-20"><span className="text-xs font-bold text-white">{step.number}</span></div>
              </div>
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-[280px]">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
