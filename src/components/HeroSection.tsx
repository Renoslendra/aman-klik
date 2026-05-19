"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Clock, Heart, ChevronDown, ShieldCheck, AlertTriangle, Search } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: (delay: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rightY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(circle at 20% 10%, hsl(189 100% 50% / 0.12), transparent 35%), radial-gradient(circle at 80% 30%, hsl(217 91% 60% / 0.15), transparent 40%)" }} />
      <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <motion.div style={{ y: orbY }} className="absolute top-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[120px] z-[2] animate-float" />
      <motion.div style={{ y: orbY }} className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[120px] z-[2] animate-float" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div style={{ y: leftY, opacity: leftOpacity }} className="lg:w-[55%] flex flex-col gap-6">
            <motion.div custom={0.1} variants={fadeUp} initial="hidden" animate="visible" className="liquid-glass rounded-full px-4 py-2 inline-flex items-center gap-2 w-fit">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">Anti-Scam untuk Keluarga</span>
            </motion.div>
            <motion.div custom={0.25} variants={fadeUp} initial="hidden" animate="visible">
              <h1 className="font-[Sora,sans-serif] text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white hero-title">
                Cek dulu<br /><span className="text-gradient-trust">sebelum klik.</span>
              </h1>
              <p className="font-[Sora,sans-serif] text-xl md:text-2xl font-light text-slate-300 leading-relaxed mt-3">Lindungi keluarga dari chat penipuan.</p>
            </motion.div>
            <motion.p custom={0.4} variants={fadeUp} initial="hidden" animate="visible" className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
              Upload screenshot atau tempel pesan mencurigakan. AmanKlik akan menjelaskan risikonya dengan bahasa sederhana.
            </motion.p>
            <motion.div custom={0.55} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-3 mt-2">
              <a href="#demo" className="bg-cyan-500 text-slate-950 font-semibold rounded-xl px-7 py-3.5 text-base hover:brightness-110 active:scale-[0.97] transition-all text-center" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>Cek Pesan Sekarang</a>
              <a href="#cara-kerja" className="text-white text-base font-medium border-b border-cyan-500/60 pb-1 hover:border-cyan-400 transition-colors inline-flex items-center gap-1 w-fit">Lihat Cara Kerja <ChevronDown className="w-4 h-4" /></a>
            </motion.div>
            <motion.div custom={0.7} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-800">
              {[{ icon: Zap, text: "30 detik analisis" }, { icon: Clock, text: "Bahasa keluarga" }, { icon: Heart, text: "Langkah aman" }].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm text-slate-500">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: rightY }} custom={0.5} variants={fadeUp} initial="hidden" animate="visible" className="lg:w-[45%] relative min-h-[420px] md:min-h-[520px]">
            <div className="absolute -top-6 -left-6 w-[120px] h-[140px] opacity-30 animate-float" style={{ animationDuration: "8s" }}>
              <svg viewBox="0 0 120 140" fill="none"><path d="M60 5L10 30V70C10 100 60 135 60 135C60 135 110 100 110 70V30L60 5Z" stroke="hsl(189 100% 50%)" strokeWidth="1.5" /></svg>
            </div>
            <div className="absolute top-4 -left-4 liquid-glass rounded-xl px-3 py-1.5 animate-float" style={{ animationDelay: "2s" }}>
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-green-400" /><span className="text-xs text-green-400">OTP aman</span></div>
            </div>
            <div className="absolute top-12 -right-4 liquid-glass rounded-xl px-3 py-1.5 animate-float" style={{ animationDelay: "4s" }}>
              <div className="flex items-center gap-1.5"><AlertTriangle className="w-3 h-3 text-red-400" /><span className="text-xs text-red-400">Link palsu</span></div>
            </div>
            <div className="absolute bottom-20 -left-8 liquid-glass rounded-xl px-3 py-1.5 animate-float" style={{ animationDelay: "6s" }}>
              <div className="flex items-center gap-1.5"><Search className="w-3 h-3 text-cyan-400" /><span className="text-xs text-cyan-400">Cek dulu</span></div>
            </div>
            <div className="relative w-[260px] md:w-[300px] mx-auto" style={{ perspective: "1000px" }}>
              <div className="animate-float rounded-[2.5rem] bg-slate-900 p-3 border border-slate-700/50 shadow-2xl" style={{ transform: "rotateY(-8deg) rotateX(4deg)", transformStyle: "preserve-3d" }}>
                <div className="rounded-[2rem] overflow-hidden bg-slate-950 aspect-[9/19.5] relative">
                  <div className="p-4 flex flex-col gap-3 h-full justify-center">
                    <div className="bg-slate-800 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]"><p className="text-xs text-slate-300">Selamat! Paket Anda tertahan...</p></div>
                    <div className="bg-slate-800 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]"><p className="text-xs text-red-400 underline">Klik link ini: bit.ly/...</p></div>
                    <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl px-3 py-1.5 mx-auto"><p className="text-xs text-cyan-400 animate-pulse">Sedang dianalisis...</p></div>
                  </div>
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 md:-right-12 liquid-glass rounded-2xl p-4 w-[160px]">
              <div className="flex flex-col items-center">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(222 50% 12%)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(0 84% 60%)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * 0.18}`} transform="rotate(-90 40 40)" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center -mt-2">
                  <span className="text-2xl font-[Sora,sans-serif] font-bold text-red-400">82</span>
                  <span className="text-sm text-slate-500">/100</span>
                </div>
                <span className="text-xs font-medium text-red-400 text-center mt-1">Risiko Tinggi</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(222_60%_7%)] to-transparent pointer-events-none z-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
