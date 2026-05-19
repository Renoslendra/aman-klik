"use client";

import { motion } from "framer-motion";
import { MessageSquare, ScanSearch, Gauge, ShieldCheck, Heart } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

const nodes = [
  { icon: MessageSquare, label: "Pesan Masuk", description: "Chat atau link mencurigakan", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", glowColor: "shadow-[0_0_30px_rgba(0,213,255,0.15)]" },
  { icon: ScanSearch, label: "Scan AI", description: "Membaca tanda bahaya", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", glowColor: "shadow-[0_0_30px_rgba(37,99,235,0.15)]" },
  { icon: Gauge, label: "Risk Score", description: "Skor risiko 0–100", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400", glowColor: "shadow-[0_0_30px_rgba(250,204,21,0.15)]" },
  { icon: ShieldCheck, label: "Saran Aman", description: "Langkah dan balasan aman", iconBg: "bg-green-500/10", iconColor: "text-green-400", glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.15)]" },
  { icon: Heart, label: "Keluarga Terlindungi", description: "Keputusan tanpa panik", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", glowColor: "shadow-[0_0_30px_rgba(0,213,255,0.15)]" },
];

export default function ScamFlowSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">PROSES</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">AmanKlik memecah pesan mencurigakan<br /><span className="text-gradient-trust">menjadi tanda yang mudah dipahami.</span></motion.h2>
        </motion.div>
        <div className="hidden lg:block">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20 -translate-y-1/2" />
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }} className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/60 via-blue-500/60 to-green-500/60 -translate-y-1/2 origin-left" />
            {nodes.map((node, i) => (
              <motion.div key={node.label} variants={fadeUp} className="relative z-10 flex flex-col items-center">
                <div className={`liquid-glass rounded-2xl p-5 w-[160px] flex flex-col items-center gap-3 ${node.glowColor} animate-float`} style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className={`w-12 h-12 rounded-xl ${node.iconBg} flex items-center justify-center`}><node.icon className={`w-6 h-6 ${node.iconColor}`} /></div>
                  <span className="text-sm font-[Sora,sans-serif] font-medium text-white text-center">{node.label}</span>
                  <span className="text-xs text-slate-500 text-center">{node.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="lg:hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="flex flex-col gap-6 relative">
            <div className="absolute top-0 bottom-0 left-6 w-[2px] bg-gradient-to-b from-cyan-500/20 via-blue-500/20 to-green-500/20" />
            {nodes.map((node) => (
              <motion.div key={node.label} variants={fadeUp} className="flex items-start gap-4 relative">
                <div className={`w-12 h-12 rounded-xl ${node.iconBg} flex items-center justify-center shrink-0 z-10`}><node.icon className={`w-6 h-6 ${node.iconColor}`} /></div>
                <div className="liquid-glass rounded-xl p-4 flex-1"><span className="text-sm font-[Sora,sans-serif] font-medium text-white">{node.label}</span><p className="text-xs text-slate-500 mt-1">{node.description}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
