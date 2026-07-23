"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };
// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function CyberBookOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M12 21V7C12 4.5 10 3 6 3H2V19H6C9 19 11 20 12 21Z" fill="url(#bookGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 21V7C12 4.5 14 3 18 3H22V19H18C15 19 13 20 12 21Z" fill="url(#bookGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function CyberUsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="usersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="8" r="3" fill="url(#usersGrad)" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.8" />
      <path d="M12 18C12 15.2 13.8 13.5 16 13.5C18.2 13.5 20 15.2 20 18" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
      
      <circle cx="8" cy="8" r="4" fill="url(#usersGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M3 18C3 14.7 5.7 13 9 13C12.3 13 15 14.7 15 18" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EducationShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eduShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 22C17 21 21 17.5 21 12V6L12 2L3 6V12C3 17.5 7 21 12 22Z" fill="url(#eduShieldGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="#e0f7fa" strokeWidth="1.5" />
      <path d="M12 10.5V13.5" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="15" r="0.5" fill="#e0f7fa" />
    </svg>
  );
}

function CyberLightbulbIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M9 21H15" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 18H14" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 2C7.5 2 4 5.5 4 10C4 12.5 5.2 14.7 7 16.1V18H17V16.1C18.8 14.7 20 12.5 20 10C20 5.5 16.5 2 12 2Z" fill="url(#bulbGrad)" stroke="#fde047" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10C10.5 8.5 13.5 8.5 15 10" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const modes = [{ id: "biasa", label: "Mode Biasa", icon: CyberBookOpenIcon }, { id: "ortu", label: "Mode Orang Tua", icon: CyberUsersIcon }];
const examples = {
  biasa: { text: "Pesan ini memiliki indikasi phishing karena meminta data pribadi melalui link tidak resmi. Domain yang digunakan tidak sesuai dengan domain resmi layanan yang disebutkan, dan terdapat desakan waktu yang tidak wajar.", tips: ["Phishing adalah trik untuk membuat kita mengisi data penting di halaman palsu.", "Cek domain link sebelum mengklik — yang mirip belum tentu asli.", "Bank dan ekspedisi resmi tidak akan meminta data melalui chat pribadi."] },
  ortu: { text: "Pesan ini sebaiknya jangan dibuka. Link-nya belum tentu resmi, dan bisa meminta data penting seperti OTP atau password. Lebih baik cek langsung melalui aplikasi resmi atau hubungi nomor resmi.", tips: ["Jangan buka link dari pesan yang tidak jelas asalnya.", "Kalau ragu, cek langsung di aplikasi resmi atau telepon nomor resmi.", "Kode OTP tidak boleh dibagikan ke siapa pun, termasuk orang yang mengaku dari bank."] },
};

export default function EducationSection() {
  const [activeMode, setActiveMode] = useState<"biasa" | "ortu">("biasa");

  return (
    <section id="edukasi" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none">
        <ShapeGrid
          shape="hexagon"
          borderColor="#1f2f3f"
          hoverFillColor="rgba(59, 130, 246, 0.08)"
          squareSize={70}
          speed={0.3}
          direction="right"
          hoverTrailAmount={6}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">EDUKASI</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Bahasa sederhana untuk semua<br /><span className="text-gradient-trust">anggota keluarga.</span></motion.h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="liquid-glass rounded-xl p-1 flex items-center gap-1 relative">
              {modes.map((mode) => (
                <button key={mode.id} onClick={() => setActiveMode(mode.id as "biasa" | "ortu")} className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeMode === mode.id ? "text-slate-950" : "text-slate-400 hover:text-white"}`}>
                  {activeMode === mode.id && <motion.div layoutId="mode-pill" className="absolute inset-0 bg-cyan-500 rounded-lg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <mode.icon className="w-4 h-4 relative z-10" /><span className="relative z-10">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
              <div className="flex items-start gap-3 group">
                <div className="relative w-10 h-10 shrink-0">
                  {/* Premium ambient glow */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md opacity-45 group-hover:opacity-65 transition-opacity duration-300" />
                  {/* Dark glass container */}
                  <div className="relative w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 group-hover:scale-105 transition-all duration-300">
                    <EducationShieldIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="liquid-glass rounded-2xl p-5 flex-1"><p className="text-xs text-cyan-400 font-medium mb-2">Tips Kliko</p><p className="text-sm text-slate-300 leading-relaxed">{examples[activeMode].text}</p></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {examples[activeMode].tips.map((tip, i) => (
                  <motion.div key={tip} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="liquid-glass rounded-xl p-4"><CyberLightbulbIcon className="w-4 h-4 mb-2" /><p className="text-xs text-slate-400 leading-relaxed">{tip}</p></motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

