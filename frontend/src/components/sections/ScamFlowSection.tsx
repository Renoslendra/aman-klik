"use client";

import { motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const tiltReveal = { hidden: { opacity: 0, y: 32, rotateX: 12 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function IncomingMessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Envelope */}
      <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="url(#msgGrad2)" stroke="#22d3ee" strokeWidth="1.8" />
      {/* flap */}
      <path d="M2 6L12 13L22 6" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Accent glow dot */}
      <circle cx="20" cy="6" r="1.5" fill="#ef4444" />
    </svg>
  );
}

function ScanRadarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Lens body */}
      <circle cx="10" cy="10" r="7" fill="url(#scanGrad)" stroke="#60a5fa" strokeWidth="1.8" />
      {/* Handle */}
      <path d="M21 21L15 15" stroke="#60a5fa" strokeWidth="2.2" strokeLinecap="round" />
      {/* Scan line */}
      <line x1="6" y1="10" x2="14" y2="10" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function RiskDialIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Dial Rim */}
      <path d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      {/* Risk dial pointer */}
      <path d="M12 12L16.5 8.5" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#fde047" />
    </svg>
  );
}

function ActiveShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldCheckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Shield frame */}
      <path d="M12 2L4 5V11C4 16.55 7.38 21.74 12 23C16.62 21.74 20 16.55 20 11V5L12 2Z" fill="url(#shieldCheckGrad)" stroke="#4ade80" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Check mark */}
      <path d="M9 11.5L11 13.5L15 9.5" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProtectHeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Heart */}
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="url(#heartGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Protection ring segment */}
      <path d="M12 6C13.5 8 13.5 11 12 13" stroke="#22d3ee" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

// -------------------------------------------------------------

const nodes = [
  { icon: IncomingMessageIcon, label: "Pesan Masuk", description: "Chat atau link mencurigakan", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", glowColor: "shadow-[0_0_30px_rgba(0,213,255,0.15)]" },
  { icon: ScanRadarIcon, label: "Scan AI", description: "Membaca tanda bahaya", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", glowColor: "shadow-[0_0_30px_rgba(37,99,235,0.15)]" },
  { icon: RiskDialIcon, label: "Risk Score", description: "Skor risiko 0–100", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400", glowColor: "shadow-[0_0_30px_rgba(250,204,21,0.15)]" },
  { icon: ActiveShieldCheckIcon, label: "Saran Aman", description: "Langkah dan balasan aman", iconBg: "bg-green-500/10", iconColor: "text-green-400", glowColor: "shadow-[0_0_30px_rgba(34,197,94,0.15)]" },
  { icon: ProtectHeartIcon, label: "Keluarga Terlindungi", description: "Keputusan tanpa panik", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", glowColor: "shadow-[0_0_30px_rgba(0,213,255,0.15)]" },
];

export default function ScamFlowSection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.16] pointer-events-none">
        <ShapeGrid
          shape="triangle"
          borderColor="#2d233c"
          hoverFillColor="rgba(139, 92, 246, 0.08)"
          squareSize={60}
          speed={0.25}
          direction="down"
          hoverTrailAmount={4}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">PROSES</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">AmanKlik memecah pesan mencurigakan<br /><span className="text-gradient-trust">menjadi tanda yang mudah dipahami.</span></motion.h2>
        </motion.div>
        <div className="hidden lg:block">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20 -translate-y-1/2" />
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }} className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-cyan-500/60 via-blue-500/60 to-green-500/60 -translate-y-1/2 origin-left" />
            {nodes.map((node, i) => (
              <motion.div key={node.label} variants={tiltReveal} className="relative z-10 flex flex-col items-center">
                <div className={`liquid-glass rounded-2xl p-5 w-[160px] flex flex-col items-center gap-3 ${node.glowColor} animate-float group`} style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="relative w-12 h-12 shrink-0">
                    {/* Premium ambient colored circular glow */}
                    <div className={`absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-45 transition-opacity duration-300 ${node.iconBg}`} />
                    {/* Circular dark glass container */}
                    <div className="relative w-12 h-12 rounded-full bg-slate-950/50 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                      <node.icon className="w-6.5 h-6.5" />
                    </div>
                  </div>
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
              <motion.div key={node.label} variants={tiltReveal} className="flex items-start gap-4 relative group">
                <div className="relative w-12 h-12 shrink-0 z-10">
                  {/* Premium ambient colored circular glow */}
                  <div className={`absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-45 transition-opacity duration-300 ${node.iconBg}`} />
                  {/* Circular dark glass container */}
                  <div className="relative w-12 h-12 rounded-full bg-slate-950/50 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                    <node.icon className="w-6.5 h-6.5" />
                  </div>
                </div>
                <div className="liquid-glass rounded-xl p-4 flex-1"><span className="text-sm font-[Sora,sans-serif] font-medium text-white">{node.label}</span><p className="text-xs text-slate-500 mt-1">{node.description}</p></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
