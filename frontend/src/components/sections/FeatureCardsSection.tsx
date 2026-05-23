"use client";

import { motion } from "framer-motion";
import { Particles, ShapeGrid } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const scaleUp = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function CyberShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer shield */}
      <path d="M12 2L4 5V11C4 16.55 7.38 21.74 12 23C16.62 21.74 20 16.55 20 11V5L12 2Z" fill="url(#shieldGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Inner neon cyber-tick */}
      <path d="M9 11.5L11 13.5L15 9.5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RiskGaugeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer dial ring */}
      <path d="M18.364 5.63604C21.8787 9.15076 21.8787 14.8492 18.364 18.364C14.8492 21.8787 9.15076 21.8787 5.63604 18.364C2.12132 14.8492 2.12132 9.15076 5.63604 5.63604" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      {/* Risk dial pointer */}
      <path d="M12 12L16.5 8.5" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="#fde047" />
    </svg>
  );
}

function RedFlagsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Hazard triangle */}
      <path d="M12 3L2 21H22L12 3Z" fill="url(#alertGrad)" stroke="#ef4444" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Inner alert mark */}
      <line x1="12" y1="9" x2="12" y2="14" stroke="#fca5a5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="1.2" fill="#fca5a5" />
    </svg>
  );
}

function SafeReplyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Chat bubble */}
      <path d="M21 15C21 16.1 20.1 17 19 17H7L3 21V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V15Z" fill="url(#msgGrad)" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Neon safe chat checklines */}
      <path d="M8 9H16" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13H13" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EmergencySirenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sirenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Siren dome */}
      <path d="M12 2C8.13 2 5 5.13 5 9V14H19V9C19 5.13 15.87 2 12 2Z" fill="url(#sirenGrad)" stroke="#f87171" strokeWidth="1.8" />
      {/* Base */}
      <rect x="3" y="14" width="18" height="4" rx="1.5" fill="#991b1b" stroke="#f87171" strokeWidth="1.8" />
      {/* Radiant light vectors */}
      <line x1="12" y1="2" x2="12" y2="0" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="9" x2="1" y2="9" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="9" x2="23" y2="9" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FamilyEducationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Cap plate */}
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Cap body */}
      <path d="M6 10.5V16C6 18.2 8.7 20 12 20C15.3 20 18 18.2 18 16V10.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      {/* Tassel */}
      <path d="M20 7.5V12.5" stroke="#0891b2" strokeWidth="1.5" />
      <circle cx="20" cy="13.5" r="1" fill="#22d3ee" />
    </svg>
  );
}

// -------------------------------------------------------------

const features = [
  { icon: CyberShieldIcon, title: "Deteksi Scam AI", description: "Analisis chat, screenshot, atau link untuk menemukan pola phishing, OTP palsu, hadiah palsu, dan modus lainnya.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", spotlightColor: "34, 211, 238" },
  { icon: RiskGaugeIcon, title: "Risk Score 0–100", description: "Skor visual membantu pengguna memahami apakah pesan terlihat aman, mencurigakan, atau sangat berisiko.", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400", spotlightColor: "234, 179, 8" },
  { icon: RedFlagsIcon, title: "Red Flag Detector", description: "AmanKlik menandai bagian pesan yang berbahaya, seperti link palsu, desakan, dan permintaan OTP.", iconBg: "bg-red-500/10", iconColor: "text-red-400", spotlightColor: "239, 68, 68" },
  { icon: SafeReplyIcon, title: "Balasan Aman", description: "Buat balasan sopan yang bisa langsung dikirim ke keluarga atau pengirim pesan tanpa terdengar menggurui.", iconBg: "bg-green-500/10", iconColor: "text-green-400", spotlightColor: "34, 197, 94" },
  { icon: EmergencySirenIcon, title: "Mode Darurat", description: "Checklist cepat jika pengguna sudah terlanjur klik link, transfer uang, atau membagikan kode OTP.", iconBg: "bg-red-500/10", iconColor: "text-red-400", spotlightColor: "239, 68, 68" },
  { icon: FamilyEducationIcon, title: "Edukasi Keluarga", description: "Tips singkat dan mudah dipahami agar keluarga semakin peka terhadap modus penipuan digital.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", spotlightColor: "34, 211, 238" },
];

export default function FeatureCardsSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="fitur" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        <ShapeGrid
          shape="hexagon"
          borderColor="#223b3b"
          hoverFillColor="rgba(16, 185, 129, 0.08)"
          squareSize={65}
          speed={0.3}
          direction="right"
          hoverTrailAmount={6}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.28] pointer-events-none">
        <Particles 
          particleCount={35} 
          particleSpread={9}
          speed={0.05}
          particleColors={['#10b981', '#059669', '#34d399']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.7}
          cameraDistance={20}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">FITUR</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Semua yang keluarga butuhkan<br /><span className="text-gradient-trust">untuk tetap aman.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto mt-6">Dari deteksi risiko sampai balasan sopan, AmanKlik membantu pengguna mengambil keputusan tanpa panik.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <motion.div 
              key={feature.title} 
              variants={scaleUp} 
              whileHover={{ y: -6, transition: { duration: 0.2 } }} 
              onMouseMove={handleMouseMove}
              className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col gap-4 border border-transparent hover:border-cyan-500/10 transition-colors group overflow-hidden"
            >
              {/* Spotlight background layer */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" 
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(${feature.spotlightColor}, 0.12), transparent 80%)`
                }}
              />
              
              <div className="relative w-12 h-12 shrink-0 z-10">
                {/* Premium ambient colored glow */}
                <div className={`absolute inset-0 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${feature.iconBg}`} />
                {/* Dark glass minimalist container */}
                <div className="relative w-12 h-12 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center group-hover:border-slate-700/50 transition-colors shadow-md">
                  <feature.icon className="w-6.5 h-6.5" />
                </div>
              </div>
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white z-10">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed z-10">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
