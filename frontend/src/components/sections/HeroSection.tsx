"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import { LetterGlitch } from "@/components/effects/LazyVisuals";

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS (Self-Contained to avoid Lucide problems)
// -------------------------------------------------------------

function CyberShieldLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ak-grad-hero" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ak-body-hero" x1="18" y1="28" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Outer Shield (filled) */}
      <path d="M32 4C20 4 10 8 8 10V34C8 48 18 56 32 60C46 56 56 48 56 34V10C54 8 44 4 32 4Z" fill="url(#ak-grad-hero)" fillOpacity="0.15" stroke="url(#ak-grad-hero)" strokeWidth="3" strokeLinejoin="round" />
      {/* Padlock Shackle */}
      <path d="M23 28V20C23 14 27 10 32 10C37 10 41 14 41 20V28" stroke="url(#ak-grad-hero)" strokeWidth="5" strokeLinecap="round" />
      {/* Padlock Body */}
      <rect x="19" y="28" width="26" height="22" rx="4" fill="url(#ak-body-hero)" />
      {/* Checkmark */}
      <path d="M25.5 39L30 43.5L39 34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Click Loop */}
      <path d="M20 46C14 52 8 48 6 42" stroke="url(#ak-grad-hero)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="6" cy="38" r="3" fill="url(#ak-grad-hero)" />
    </svg>
  );
}

function CyberChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17 21 21 17.5 21 12V6L12 2L3 6V12C3 17.5 7 21 12 22Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M9 11.5L11 13.5L15 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumAlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 20H22L12 3Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12 8V13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const cipherChars = "OTP#PIN@HTTP://BIT.LY?=+$%01<>[]{}";

function CipherHeadlineLine({
  target,
  delay = 0,
  className = "",
}: {
  target: string;
  delay?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const settleWindow = 4;
    const frameMs = 58;
    const loopMs = 4200;
    let intervalId: number | undefined;
    let cycleTimeoutId: number | undefined;
    let tick = 0;

    const randomCipherChar = () => cipherChars[Math.floor(Math.random() * cipherChars.length)];
    const clearTypingInterval = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const renderFrame = () => {
      tick += 1;
      const visibleLength = Math.min(target.length, tick);

      if (tick > target.length + settleWindow) {
        setDisplayText(target);
        clearTypingInterval();
        return;
      }

      let nextText = "";
      for (let index = 0; index < visibleLength; index += 1) {
        const char = target[index];
        const settled = tick - index > settleWindow;
        nextText += settled || char === " " ? char : randomCipherChar();
      }

      setDisplayText(nextText);
    };

    const runCycle = () => {
      clearTypingInterval();
      tick = 0;
      setDisplayText("");
      renderFrame();
      intervalId = window.setInterval(renderFrame, frameMs);
      cycleTimeoutId = window.setTimeout(runCycle, loopMs);
    };

    const startTimeoutId = window.setTimeout(runCycle, delay);

    return () => {
      window.clearTimeout(startTimeoutId);
      if (cycleTimeoutId !== undefined) {
        window.clearTimeout(cycleTimeoutId);
      }
      clearTypingInterval();
    };
  }, [delay, target]);

  return (
    <span className={`hero-cipher-line ${className}`} data-final={target} aria-hidden="true">
      <span className="hero-cipher-output">{displayText}{displayText !== target ? "|" : ""}</span>
    </span>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [previewStep, setPreviewStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const leftY = useTransform(scrollYProgress, [0, 0.5], [0, -130]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rightY = useTransform(scrollYProgress, [0, 0.5], [0, -170]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPreviewStep((step) => (step + 1) % 3);
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      {/* Premium Multi-Layered Cyber Background */}
      <div className="absolute inset-0 z-0 bg-[#060B18]">
        {/* Animated Letter Glitch Background */}
        <div className="absolute inset-0 z-0 opacity-[0.55] pointer-events-none">
          <LetterGlitch
            glitchColors={['#0ea5e9', '#06b6d4', '#10b981', '#1e293b']}
            glitchSpeed={50}
            smooth={true}
            outerVignette={true}
          />
        </div>

        {/* Animated ambient mesh-glow nebulas */}
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-cyan-500/12 blur-[130px] animate-[pulse_10s_infinite_alternate]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/16 blur-[150px] animate-[pulse_14s_infinite_alternate]" />
        <div className="absolute top-[25%] left-[35%] w-[45%] h-[45%] rounded-full bg-indigo-500/8 blur-[120px] animate-[pulse_12s_infinite_alternate]" />



        {/* Fading overlay to keep text ultra-readable */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#060B18]/50 via-transparent to-[#060B18]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1296px] px-6 pb-20 pt-36 md:px-8 md:pb-28 md:pt-40">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
          <motion.div style={{ y: leftY, opacity: leftOpacity }} className="flex w-full flex-col items-center lg:items-start text-center lg:text-left gap-8 lg:w-[52%] justify-center">
            <motion.div custom={0.25} variants={fadeUp} initial="hidden" animate="visible">
              <h1 className="font-[Sora,sans-serif] text-[2.75rem] md:text-[3.5rem] lg:text-[4.85rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white hero-title hero-cipher-title" aria-label="Cek dulu sebelum klik.">
                <CipherHeadlineLine target="Cek dulu" className="hero-cipher-line-light" />
                <br />
                <CipherHeadlineLine target="sebelum klik." delay={420} className="hero-cipher-line-gradient" />
              </h1>
              <p className="font-[Sora,sans-serif] text-xl md:text-[1.65rem] font-light text-slate-300 leading-relaxed mt-3">Lindungi keluarga dari chat penipuan.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4 sm:flex-row items-center justify-center lg:items-start lg:justify-start"
            >
              <MagneticButton>
                <Link href="/cek-pesan" className="inline-block rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-7 py-3.5 text-center text-base font-semibold text-slate-950 transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>
                  Cek Pesan Sekarang
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/cara-kerja" className="liquid-glass rounded-xl px-7 py-3.5 flex items-center justify-center gap-2 text-base font-semibold text-white border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-950/20 active:scale-[0.97] transition-all">
                  Lihat Cara Kerja <CyberChevronDown className="h-4 w-4" />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: rightY }} custom={0.5} variants={fadeUp} initial="hidden" animate="visible" className="relative min-h-[560px] w-full lg:min-h-[620px] lg:w-[48%]">
            <div className="hero-showcase relative mx-auto h-[560px] w-full max-w-[650px] md:h-[620px] lg:h-[640px]">
              <div className="hero-premium-halo" />
              <div className="hero-luxury-orbit" />

              <div className="hero-phone-anchor">
                <div className="phone-lux-float">
                  <div className="phone-lux-shell">
                    <div className="phone-lux-reflection" />
                    <div className="phone-lux-screen">
                      <div className="phone-speaker" />
                      <div className="phone-screen-glow" />
                      <div className="phone-preview-video">

                        {/* ─── STAGE 0: Paste Message ─── */}
                        <div className={`phone-stage phone-stage-compose ${previewStep === 0 ? "phone-stage-active" : ""}`}>
                          {/* App Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CyberShieldLogo className="h-6 w-6 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]" />
                              <div>
                                <span className="text-[11px] font-bold text-white leading-none">Aman</span>
                                <span className="text-[11px] font-bold text-cyan-400 leading-none">Klik</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[8px] text-emerald-400 font-medium">Online</span>
                            </div>
                          </div>

                          {/* Chat bubble (incoming scam) */}
                          <div className="mt-5 flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[8px] font-bold text-slate-400">S</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-[8px] text-slate-500 mb-1 ml-0.5">+62 812-xxxx-xxxx · baru saja</p>
                              <div className="rounded-2xl rounded-tl-md bg-slate-800/80 border border-slate-700/50 px-3 py-2.5 text-[10px] text-slate-200 leading-[1.55] shadow-md">
                                Selamat! Anda mendapat hadiah Rp15jt dari Shopee. Konfirmasi data di: <span className="text-cyan-400 underline font-medium">bit.ly/shope-id77</span>
                              </div>
                            </div>
                          </div>

                          {/* Paste / upload area */}
                          <div className="mt-3 rounded-xl border border-dashed border-slate-700/60 bg-slate-900/30 p-2.5 text-center">
                            <p className="text-[9px] text-slate-500 leading-snug">Tempel teks, link, atau screenshot</p>
                          </div>

                          {/* CTA button */}
                          <div className="phone-primary-action">
                            <span className="flex items-center gap-1.5">
                              <PremiumShieldCheckIcon className="h-3.5 w-3.5 text-slate-900" />
                              Cek Keamanan
                            </span>
                          </div>
                        </div>

                        {/* ─── STAGE 1: Scanning ─── */}
                        <div className={`phone-stage phone-stage-scan ${previewStep === 1 ? "phone-stage-active" : ""}`}>
                          {/* Scan ring */}
                          <div className="phone-scan-circle">
                            <PremiumShieldCheckIcon className="h-8 w-8 text-cyan-200" />
                            <span />
                          </div>

                          <p className="text-center text-[12px] font-semibold text-white mt-1">Menganalisis pesan...</p>
                          <p className="mx-auto mt-1.5 max-w-[200px] text-center text-[10px] leading-relaxed text-slate-500">
                            Memeriksa link, pola desakan, dan permintaan data sensitif
                          </p>

                          {/* Checklist */}
                          <div className="w-full mt-5 space-y-2.5 px-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0"><svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                              <span className="text-[10px] text-slate-300">Shortlink terdeteksi</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /></div>
                              <span className="text-[10px] text-cyan-300">Memeriksa reputasi domain...</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-slate-800/60 border border-slate-700/50 flex items-center justify-center shrink-0"><span className="w-1.5 h-1.5 rounded-full bg-slate-600" /></div>
                              <span className="text-[10px] text-slate-600">Menyusun rekomendasi</span>
                            </div>
                          </div>
                        </div>

                        {/* ─── STAGE 2: Result ─── */}
                        <div className={`phone-stage phone-stage-result ${previewStep === 2 ? "phone-stage-active" : ""}`}>
                          {/* Score header */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="phone-risk-ring">
                              <span>82</span>
                            </div>
                            <div>
                              <p className="text-[10px] font-medium text-slate-400">Skor Risiko</p>
                              <p className="text-[15px] font-bold text-white leading-tight">Sangat Berbahaya</p>
                              <p className="text-[9px] text-red-400/80 mt-0.5 font-medium">Phishing · Penipuan Link</p>
                            </div>
                          </div>

                          {/* Danger flags */}
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2 rounded-xl bg-red-500/8 border border-red-500/15 px-3 py-2 text-[10px] leading-snug text-red-200">
                              <PremiumAlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                              <span>Domain <b className="text-red-300">bit.ly/shope-id77</b> bukan situs resmi Shopee</span>
                            </div>
                            <div className="flex items-start gap-2 rounded-xl bg-amber-500/8 border border-amber-500/15 px-3 py-2 text-[10px] leading-snug text-amber-200">
                              <PremiumAlertTriangleIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                              <span>Permintaan &quot;konfirmasi data&quot; tanpa verifikasi resmi</span>
                            </div>
                          </div>

                          {/* Recommendation */}
                          <div className="mt-3 rounded-xl bg-cyan-500/8 border border-cyan-500/15 px-3 py-2.5">
                            <p className="text-[8px] uppercase tracking-wider text-cyan-400/70 font-bold mb-1">Rekomendasi</p>
                            <p className="text-[10px] text-cyan-100 leading-snug">Jangan klik link. Blokir pengirim dan laporkan ke pihak berwajib.</p>
                          </div>

                          {/* Action button */}
                          <div className="mt-3 flex gap-2">
                            <div className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-cyan-400 py-2 text-[10px] font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                              Salin Balasan Aman
                            </div>
                            <div className="w-10 flex items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/50">
                              <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={`phone-scan-beam ${previewStep === 1 ? "phone-scan-beam-active" : ""}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
