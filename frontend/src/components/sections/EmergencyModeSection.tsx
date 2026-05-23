"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Particles, ShapeGrid } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function CyberLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="url(#linkGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberKeyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="16" r="5" fill="url(#keyGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="8" cy="16" r="2" fill="#0891b2" />
      <path d="M11.5 12.5L20 4" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 8L18.5 10.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.5 5.5L21 8" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberBanknoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bankGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="2" y="5" width="20" height="14" rx="2" fill="url(#bankGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="#e0f7fa" strokeWidth="1.5" />
      <path d="M6 12H6.01" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 12H18.01" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CyberUserXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="7" r="4" fill="url(#userGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M3 20C3 16.7 5.7 15 9 15C10.5 15 11.8 15.4 12.8 16.1" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 14L22 20" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 14L16 20" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CyberShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="5" r="3" fill="url(#shareGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" fill="url(#shareGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" fill="url(#shareGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberAlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="alertTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M12 3L2 20H22L12 3Z" fill="url(#alertTriGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8V13" stroke="#e0f7fa" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#e0f7fa" />
    </svg>
  );
}

function SimpleCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CyberArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const checklistItems = [
  { id: "link", icon: CyberLinkIcon, label: "Saya sudah klik link", steps: ["Ganti password akun terkait", "Cek aktivitas login terbaru", "Aktifkan 2FA jika tersedia"] },
  { id: "otp", icon: CyberKeyIcon, label: "Saya sudah kirim OTP", steps: ["Hubungi bank segera", "Blokir kartu jika perlu", "Ganti password dan OTP"] },
  { id: "transfer", icon: CyberBanknoteIcon, label: "Saya sudah transfer uang", steps: ["Hubungi bank untuk blokir transfer", "Laporkan ke pihak berwajib", "Simpan bukti transaksi"] },
  { id: "akun", icon: CyberUserXIcon, label: "Akun saya diambil alih", steps: ["Reset password segera", "Cabut akses perangkat lain", "Hubungi layanan platform"] },
  { id: "keluarga", icon: CyberShareIcon, label: "Saya ingin memberi tahu keluarga", steps: ["Bagikan peringatan ini", "Ajak mereka cek pesan di AmanKlik", "Edukasi tentang modus penipuan"] },
];

export default function EmergencyModeSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const toggleCheck = (id: string) => { const n = new Set(checked); if (n.has(id)) { n.delete(id); setActiveItem(null); } else { n.add(id); setActiveItem(id); } setChecked(n); };

  return (
    <section id="darurat" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.18] pointer-events-none">
        <ShapeGrid
          shape="triangle"
          borderColor="#3f1f1f"
          hoverFillColor="rgba(239, 68, 68, 0.08)"
          squareSize={70}
          speed={0.35}
          direction="down"
          hoverTrailAmount={5}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        <Particles 
          particleCount={35} 
          particleSpread={8}
          speed={0.06}
          particleColors={['#ef4444', '#fca5a5', '#dc2626']}
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
          <motion.span variants={fadeUp} className="section-label shiny-text">BANTUAN DARURAT</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Sudah terlanjur klik atau transfer?<br /><span className="text-gradient-trust">Tetap tenang, ikuti langkah darurat.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-6">Pilih kondisi yang sesuai</h3>
              <div className="flex flex-col gap-3">
                {checklistItems.map((item, i) => (
                  <motion.button key={item.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left w-full ${checked.has(item.id) ? "bg-green-500/5 border-green-500/20" : "bg-slate-900/30 border-slate-700/30 hover:border-slate-600/50"}`}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked.has(item.id) ? "bg-green-500 border-green-500" : "border-slate-600"}`}>{checked.has(item.id) && <SimpleCheckIcon className="w-3.5 h-3.5 text-white" />}</div>
                    <item.icon className={`w-4 h-4 shrink-0 ${checked.has(item.id) ? "text-green-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${checked.has(item.id) ? "text-green-400" : "text-slate-300"}`}>{item.label}</span>
                    {checked.has(item.id) && <span className="ml-auto text-xs text-green-400/70">Langkah berikutnya siap</span>}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-6">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 shrink-0">
                  {/* Premium ambient glow */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-md opacity-45 group-hover:opacity-65 transition-opacity duration-300" />
                  {/* Dark glass container */}
                  <div className="relative w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                    <CyberAlertTriangleIcon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white">Jangan panik</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Banyak kasus penipuan bisa ditangani jika langkah yang tepat diambil dengan cepat. AmanKlik akan membantu kamu langkah demi langkah.</p>
            </div>
            {activeItem && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass rounded-2xl p-6 md:p-8">
                <h4 className="text-sm font-medium text-white mb-4">Langkah darurat:</h4>
                <div className="flex flex-col gap-3">{checklistItems.find((item) => item.id === activeItem)?.steps.map((step, i) => (
                  <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="flex items-center gap-3 text-sm text-slate-300"><div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-xs text-cyan-400 font-medium">{i + 1}</div>{step}</motion.div>
                ))}</div>
              </motion.div>
            )}
            <a href="#" className="bg-cyan-500 text-slate-950 font-semibold rounded-xl px-7 py-3.5 text-base hover:brightness-110 active:scale-[0.97] transition-all text-center flex items-center justify-center gap-2" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>Buka Mode Darurat <CyberArrowRightIcon className="w-4 h-4" /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
