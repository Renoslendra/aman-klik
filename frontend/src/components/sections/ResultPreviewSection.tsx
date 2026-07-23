"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";
// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function RedTriangleAlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="alertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M12 3L2 20H22L12 3Z" fill="url(#alertGrad)" stroke="#ef4444" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8V13" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#fca5a5" />
    </svg>
  );
}

function YellowShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldAlertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#854d0e" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M12 22C17 21 21 17.5 21 12V6L12 2L3 6V12C3 17.5 7 21 12 22Z" fill="url(#shieldAlertGrad)" stroke="#eab308" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 6V13" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.2" fill="#fef08a" />
    </svg>
  );
}

function PremiumCheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.8" />
      <path d="M8.5 12.5L11 15L15.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumMessageSquareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="msgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M21 15C21 16.1046 20.1046 17 19 17H7L3 21V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15Z" fill="url(#msgGrad)" stroke="#06b6d4" strokeWidth="1.8" strokeLinejoin="round" />
      <line x1="7" y1="8" x2="17" y2="8" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7" y1="12" x2="13" y2="12" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PremiumCopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="8" width="12" height="12" rx="2" ry="2" stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

const redFlags = ['Menggunakan kata mendesak seperti "segera"', "Link tidak terlihat seperti domain resmi", "Meminta konfirmasi data pribadi", "Memberi ancaman akun/paket akan diblokir"];
const safeActions = ["Jangan klik link di pesan tersebut", "Cek aplikasi resmi atau hubungi layanan resmi", "Jangan kirim OTP, PIN, atau password", "Bagikan peringatan ini ke keluarga"];
const safeReply = "Terima kasih infonya. Saya akan cek langsung melalui aplikasi atau kontak resmi dulu ya. Untuk keamanan, saya tidak akan membuka link dari pesan ini.";

export default function ResultPreviewSection() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(safeReply); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <ShapeGrid
          shape="square"
          borderColor="#1e293b"
          hoverFillColor="rgba(6, 182, 212, 0.08)"
          squareSize={75}
          speed={0.2}
          direction="diagonal"
          hoverTrailAmount={5}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">HASIL ANALISIS</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Hasilnya jelas:<br /><span className="text-gradient-trust">risiko, alasan, dan langkah aman.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-4">
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="34" fill="none" stroke="hsl(222 50% 12%)" strokeWidth="6" /><circle cx="40" cy="40" r="34" fill="none" stroke="hsl(0 84% 60%)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 34}`} strokeDashoffset={`${2 * Math.PI * 34 * 0.18}`} transform="rotate(-90 40 40)" /></svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-xl font-[Sora,sans-serif] font-bold text-red-400">82</span><span className="text-[10px] text-slate-500">/100</span></div>
                </div>
                <div><p className="text-sm font-medium text-red-400">Risiko Tinggi</p><p className="text-xs text-slate-500 mt-1">Skor risiko tinggi — hati-hati</p></div>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 group">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 shrink-0">
                  {/* Premium ambient glow */}
                  <div className="absolute inset-0 rounded-xl bg-red-500/20 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  {/* Dark glass outline badge */}
                  <div className="relative w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                    <RedTriangleAlertIcon className="w-5 h-5" />
                  </div>
                </div>
                <div><p className="text-sm font-medium text-white">Phishing / Link Palsu</p><p className="text-xs text-slate-500 mt-0.5">Jenis penipuan terdeteksi</p></div>
              </div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 shrink-0">
                  {/* Premium ambient glow */}
                  <div className="absolute inset-0 rounded-xl bg-yellow-500/20 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                  {/* Dark glass outline badge */}
                  <div className="relative w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                    <YellowShieldAlertIcon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm font-medium text-white">Ancaman Utama</p>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">Pesan mencoba membuat pengguna klik link dan mengisi data pribadi.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-4">
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Tanda Bahaya</p>
              <div className="space-y-3">{redFlags.map((flag, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />{flag}</motion.div>))}</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Langkah Aman</p>
              <div className="space-y-3">{safeActions.map((action, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-300"><PremiumCheckCircleIcon className="w-4 h-4 mt-0.5 shrink-0" />{action}</motion.div>))}</div>
            </div>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3"><PremiumMessageSquareIcon className="w-4 h-4" /><p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Balasan Aman</p></div>
              <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-sm text-slate-300 italic">{safeReply}</div>
              <button onClick={handleCopy} className="mt-3 flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">{copied ? <><PremiumCheckCircleIcon className="w-3.5 h-3.5" />Tersalin</> : <><PremiumCopyIcon className="w-3.5 h-3.5" />Salin balasan</>}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


