"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";
import { api } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

type ContactResponse = {
  success: boolean;
  message?: string;
};

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function CyberEnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#mailGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M22 7L12 13L2 7" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CyberInstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#instaGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="#22d3ee" strokeWidth="1.8" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CyberGithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        fill="url(#gitGrad)"
        stroke="#22d3ee"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CyberEmergencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="emerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="url(#emerGrad)" stroke="#ef4444" strokeWidth="1.8" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.2" fill="#ef4444" />
    </svg>
  );
}

export default function HubungiKamiContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Scam Baru",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Mohon lengkapi seluruh kolom formulir.");
      return;
    }
    setErrorMsg("");
    setSubmitting(true);

    try {
      const response = await api.post<ContactResponse>("/contact", {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        message: formData.message,
      });

      if (response.success) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          category: "Scam Baru",
          message: "",
        });
      } else {
        setErrorMsg(response.message || "Gagal mengirimkan pesan. Silakan coba lagi nanti.");
      }
    } catch (error: unknown) {
      console.error("Submit contact error:", error);
      setErrorMsg(error instanceof Error ? error.message : "Gagal menghubungi server. Pastikan koneksi internet Anda aktif.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 px-6 md:px-8 overflow-hidden min-h-screen">
      {/* Dynamic Hexagon Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none">
        <ShapeGrid
          shape="hexagon"
          borderColor="#1e293b"
          hoverFillColor="rgba(34, 211, 238, 0.05)"
          squareSize={70}
          speed={0.2}
          direction="right"
          hoverTrailAmount={5}
          gradientColor="#0B1120"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="section-label shiny-text">
            HUBUNGI KAMI
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8"
          >
            Ada Pertanyaan atau Masukan?<br />
            <span className="text-gradient-trust">Kami Siap Membantu Anda.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Kirimkan pesan kepada tim AmanKlik AI untuk berkolaborasi, melaporkan modus penipuan baru, atau sekadar memberikan kritik membangun.
          </motion.p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-7"
          >
            <div className="liquid-glass rounded-2xl p-6 md:p-8 border border-slate-800/40 relative overflow-hidden min-h-[460px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8 flex flex-col items-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-[Sora,sans-serif] font-semibold text-white">Pesan Berhasil Terkirim!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Terima kasih atas laporan atau masukan berharga Anda. Tim kami akan meninjau pesan ini secepatnya demi memperkuat keamanan digital keluarga Indonesia.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white px-5 py-2.5 text-xs font-semibold text-slate-300 transition-all duration-200"
                    >
                      Kirim Pesan Lain
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <h2 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-2">Formulir Pesan</h2>
                    
                    {errorMsg && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold text-slate-400">Nama Lengkap</label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama Anda"
                          className="bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold text-slate-400">Surel (Email)</label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alamat@surel.com"
                          className="bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="category" className="text-xs font-semibold text-slate-400">Kategori Pesan</label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
                      >
                        <option value="Scam Baru">Laporkan Modus Scam Baru</option>
                        <option value="Kritik & Saran">Kritik & Saran Fitur</option>
                        <option value="Kemitraan">Kerja Sama / Kemitraan</option>
                        <option value="Pertanyaan">Pertanyaan Umum</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold text-slate-400">Isi Pesan</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tulis pesan Anda secara detail..."
                        className="bg-slate-950/60 border border-slate-800 focus:border-cyan-500/50 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/20 h-32 resize-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold rounded-xl py-3.5 px-6 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full disabled:opacity-50"
                      style={{ boxShadow: "0 0 25px hsl(189 100% 50% / 0.18)" }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-slate-950" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Mengirim Pesan...</span>
                        </>
                      ) : (
                        <span>Kirim Pesan</span>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Email Card */}
            <div className="liquid-glass rounded-2xl p-6 border border-slate-800/40 flex items-center gap-5 hover:border-cyan-500/10 transition-colors group">
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-12 h-12 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-md">
                  <CyberEnvelopeIcon className="w-5.5 h-5.5" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">Kirim Surel</h3>
                <a href="mailto:renoslendra@gmail.com" className="text-sm md:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5">
                  renoslendra@gmail.com
                </a>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="liquid-glass rounded-2xl p-6 border border-slate-800/40 flex items-center gap-5 hover:border-cyan-500/10 transition-colors group">
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-12 h-12 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-md">
                  <CyberGithubIcon className="w-5.5 h-5.5" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">GitHub Developer</h3>
                <a href="https://github.com/Renoslendra" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5">
                  github.com/Renoslendra
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="liquid-glass rounded-2xl p-6 border border-slate-800/40 flex items-center gap-5 hover:border-cyan-500/10 transition-colors group">
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-lg opacity-25 group-hover:opacity-40 transition-opacity" />
                <div className="relative w-12 h-12 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-md">
                  <CyberInstagramIcon className="w-5.5 h-5.5" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">Instagram</h3>
                <a href="https://www.instagram.com/renorenoss/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-semibold text-white hover:text-cyan-400 transition-colors block mt-0.5">
                  @renorenoss
                </a>
              </div>
            </div>

            {/* Emergency Info Card */}
            <div className="liquid-glass rounded-2xl p-6 border border-red-500/10 flex flex-col gap-4 relative overflow-hidden group">
              {/* Emergency indicator ambient glow */}
              <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-red-500/5 blur-2xl group-hover:bg-red-500/10 transition-colors pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <CyberEmergencyIcon className="w-5 h-5" />
                <h3 className="text-sm font-[Sora,sans-serif] font-semibold text-red-400">Butuh Bantuan Darurat?</h3>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                Jika Anda sudah terlanjur mentransfer dana, membagikan OTP, atau mengeklik tautan berbahaya, segera kunjungi <strong>Mode Darurat</strong> untuk panduan taktis pemblokiran rekening dan penyelamatan akun.
              </p>
              <Link
                href="/darurat"
                className="mt-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/30 font-semibold rounded-xl py-2.5 text-center text-xs transition-all active:scale-[0.98]"
              >
                Buka Panduan Darurat
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


