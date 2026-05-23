"use client";

import { motion } from "framer-motion";

const chips = [
  { label: "Phishing Detect", type: "danger" },
  { label: "OTP Palsu", type: "danger" },
  { label: "Link Mencurigakan", type: "warning" },
  { label: "Paket Palsu", type: "warning" },
  { label: "Hadiah Palsu", type: "warning" },
  { label: "Lowongan Palsu", type: "warning" },
  { label: "Pinjol Ilegal", type: "danger" },
  { label: "Investment Scam", type: "danger" }
];

const typeStyles = {
  danger: {
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse",
    chip: "hover:text-rose-300 hover:border-rose-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.18)]"
  },
  warning: {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    chip: "hover:text-amber-300 hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
  }
};

export default function TrustStrip() {
  // Duplicate 4 times to ensure it covers very wide screens (4K+) flawlessly without seams
  const quadrupleChips = [...chips, ...chips, ...chips, ...chips];

  return (
    <section className="py-5 md:py-6 border-y border-slate-800/40 bg-[#0B1120]/20 backdrop-blur-sm overflow-hidden relative w-full">
      {/* Subtle fade overlay on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[hsl(222_60%_7%)] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[hsl(222_60%_7%)] to-transparent z-10 pointer-events-none"></div>
      
      <div className="overflow-hidden w-full">
        <motion.div 
          className="flex gap-5 w-max"
          style={{ willChange: "transform" }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 45, // Slower duration for buttery smooth, premium movement
            repeat: Infinity,
          }}
        >
          {quadrupleChips.map((chip, i) => {
            const styles = typeStyles[chip.type as keyof typeof typeStyles];
            return (
              <div 
                key={`${chip.label}-${i}`} 
                className={`liquid-glass rounded-full px-5 py-2.5 text-xs md:text-sm text-slate-400 font-semibold whitespace-nowrap transition-all duration-300 hover:scale-105 flex items-center gap-2.5 cursor-default ${styles.chip}`}
              >
                {/* Status indicator dot */}
                <span className={`w-2 h-2 rounded-full shrink-0 ${styles.dot}`} />
                {chip.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
