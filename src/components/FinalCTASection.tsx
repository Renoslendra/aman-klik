"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
const sparkleDelays = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5];

export default function FinalCTASection() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden border-t border-slate-800/30">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, hsl(189 100% 50% / 0.08), transparent 60%)" }} />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[160px] animate-float" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[160px] animate-float" style={{ animationDelay: "3s" }} />
      {sparkleDelays.map((delay, i) => (<div key={i} className="absolute w-1 h-1 rounded-full bg-cyan-400" style={{ top: `${15 + Math.random() * 70}%`, left: `${10 + Math.random() * 80}%`, animation: `sparkle 2s ease-in-out ${delay}s infinite` }} />))}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
          <motion.span variants={fadeUp} className="section-label">MULAI SEKARANG</motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-[Sora,sans-serif] font-medium tracking-[-0.03em] leading-[1.05] text-white mt-8">Satu klik kecil bisa mencegah<br /><span className="text-gradient-trust">keputusan yang berisiko.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 mt-6 mb-10">Sebelum membuka link, transfer uang, atau mengirim data pribadi, cek dulu di AmanKlik AI.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#demo" className="bg-cyan-500 text-slate-950 font-semibold rounded-xl px-8 py-4 text-base hover:brightness-110 active:scale-[0.97] transition-all animate-pulse-glow" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>Cek Pesan Sekarang</a>
            <a href="#edukasi" className="relative rounded-xl p-[1.5px] group" style={{ background: "linear-gradient(90deg, hsl(189 100% 50%), hsl(217 91% 60%))" }}><span className="block rounded-xl bg-[hsl(222_60%_7%)] px-8 py-4 text-white text-base font-medium group-hover:bg-[hsl(222_50%_9%)] transition-colors">Pelajari Modus Penipuan</span></a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
