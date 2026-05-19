"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "500K+", label: "pesan dianalisis" },
  { value: "30dtk", label: "rata-rata analisis" },
  { value: "92%", label: "akurasi deteksi" },
];

const chips = ["Phishing", "OTP Palsu", "Link Mencurigakan", "Paket Palsu", "Hadiah Palsu", "Lowongan Palsu", "Pinjol Ilegal", "Investment Scam"];

export default function TrustStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-8 md:py-12 border-y border-slate-800/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(222_60%_7%)] bg-gradient-to-br from-cyan-400 to-blue-600" />
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(222_60%_7%)] bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(222_60%_7%)] bg-gradient-to-br from-cyan-500 to-teal-500" />
            </div>
            <span className="text-sm text-slate-400">5.000+ keluarga sudah mencoba</span>
          </div>
          <div className="flex items-center gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8 md:gap-12">
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-3xl font-[Sora,sans-serif] font-semibold text-white tracking-tight">{stat.value}</span>
                  <span className="text-xs text-slate-500 mt-1">{stat.label}</span>
                </div>
                {i < stats.length - 1 && <div className="w-px h-8 bg-slate-800" />}
              </div>
            ))}
          </div>
        </motion.div>
        <div className="overflow-hidden w-full mt-6">
          <div className="flex gap-3 animate-marquee">
            {[...chips, ...chips].map((chip, i) => (
              <div key={`${chip}-${i}`} className="liquid-glass rounded-full px-4 py-1.5 text-xs text-slate-400 whitespace-nowrap hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">{chip}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
