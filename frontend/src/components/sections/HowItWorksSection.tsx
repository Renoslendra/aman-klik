"use client";

import { motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const slideInRight = { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function PaperAirplaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M3 20L10 13" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M6 17L12 11" stroke="#0891b2" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 2L3 9L11 13L15 21L22 2Z" fill="url(#planeGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 13L22 2" stroke="#e0f7fa" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CyberEyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M2 8V5C2 3.89543 2.89543 3 3.99999 3H7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 8V5C22 3.89543 21.1046 3 20 3H17" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 16V19C2 20.1046 2.89543 21 3.99999 21H7" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 16V19C22 20.1046 21.1046 21 20 21H17" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      
      <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" fill="url(#eyeGrad)" stroke="#3b82f6" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4.5" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#93c5fd" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function ArmoredShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 2L3 6V12C3 17.5 7 21 12 22C17 21 21 17.5 21 12V6L12 2Z" stroke="#22c55e" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4L5 7V12C5 16 8.5 19.2 12 20.1C15.5 19.2 19 16 19 12V7L12 4Z" fill="url(#shieldGrad)" />
      <path d="M9 11.5L11 13.5L15 9" stroke="#bbf7d0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const steps = [
  { number: "1", icon: PaperAirplaneIcon, title: "Kirim Pesan", description: "Tempel teks/link atau upload screenshot yang mencurigakan.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", orbColor: "from-cyan-500/20 to-cyan-500/0" },
  { number: "2", icon: CyberEyeIcon, title: "Baca Risiko", description: "AmanKlik menampilkan skor risiko, tanda bahaya, dan alasan sederhana.", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", orbColor: "from-blue-500/20 to-blue-500/0" },
  { number: "3", icon: ArmoredShieldIcon, title: "Ambil Langkah Aman", description: "Salin balasan aman, buka mode darurat, atau bagikan edukasi ke keluarga.", iconBg: "bg-green-500/10", iconColor: "text-green-400", orbColor: "from-green-500/20 to-green-500/0" },
];

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <ShapeGrid
          shape="circle"
          borderColor="#2b3b3b"
          hoverFillColor="rgba(20, 184, 166, 0.08)"
          squareSize={65}
          speed={0.25}
          direction="up"
          hoverTrailAmount={4}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">CARA KERJA</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Tiga langkah sederhana<br /><span className="text-gradient-trust">sebelum mengambil keputusan.</span></motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20" />
          {steps.map((step) => (
            <motion.div key={step.number} variants={slideInRight} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                {/* Back glow wrapper */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.orbColor} blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-300`} />
                {/* Core glass container */}
                <div className="relative w-16 h-16 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-center z-10 group-hover:border-slate-700/50 group-hover:scale-105 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[hsl(222_50%_11%)] border border-slate-700/50 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <span className="text-xs font-bold text-white">{step.number}</span>
                </div>
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
