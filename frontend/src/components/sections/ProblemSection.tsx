"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const slideInLeft = { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.08 } } };

function AnimatedWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const color = useTransform(progress, [start, end], ["#475569", "#F8FAFC"]);

  return (
    <motion.span
      style={{ opacity, color }}
      className="font-[Sora,sans-serif] text-3xl md:text-5xl lg:text-6xl font-medium tracking-normal leading-[1.1]"
    >
      {word}
    </motion.span>
  );
}

function WordReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap justify-center gap-x-[0.3em]">
      {words.map((word, i) => (
        <AnimatedWord key={`${word}-${i}`} word={word} index={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function UrgencyClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer Dial Rim */}
      <circle cx="12" cy="12" r="10" stroke="url(#clockGrad)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Hour Hand */}
      <path d="M12 12H15.5" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" />
      {/* Glowing Neon Red Second Hand */}
      <path d="M12 12L9.5 8" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
      {/* Center cap */}
      <circle cx="12" cy="12" r="1.5" fill="#fca5a5" />
    </svg>
  );
}

function SecurityLockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Shackle */}
      <path d="M7 10V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 10V10" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
      {/* Lock Body */}
      <rect x="4" y="10" width="16" height="12" rx="3" fill="url(#lockGrad)" stroke="#fde047" strokeWidth="1.8" />
      {/* Keyhole */}
      <circle cx="12" cy="15" r="2" fill="#ca8a04" stroke="#fde047" strokeWidth="1.2" />
      <path d="M12 17V19" stroke="#fde047" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="linkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="linkGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Left link loop */}
      <rect x="3.5" y="10.5" width="11" height="6" rx="3" transform="rotate(-45 3.5 10.5)" stroke="url(#linkGrad1)" strokeWidth="2" />
      {/* Right link loop */}
      <rect x="9.5" y="16.5" width="11" height="6" rx="3" transform="rotate(-45 9.5 16.5)" stroke="url(#linkGrad2)" strokeWidth="2" />
      {/* Cybernetic connector line */}
      <path d="M9.5 14.5L14.5 9.5" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// -------------------------------------------------------------

const cards = [
  { icon: UrgencyClockIcon, title: "Pesan dibuat mendesak", description: "Penipu sering membuat korban merasa harus segera bertindak tanpa berpikir panjang.", quote: "Segera klik sebelum akun diblokir.", iconBg: "bg-red-500/10", iconColor: "text-red-400", quoteBorder: "border-red-500/30", quoteColor: "text-red-400/70", hoverBorder: "hover:border-red-500/30", spotlightColor: "239, 68, 68" },
  { icon: SecurityLockIcon, title: "Meminta data pribadi", description: "OTP, PIN, nomor kartu, password — data sensitif yang seharusnya tidak dibagikan lewat chat.", quote: "OTP, PIN, nomor kartu, password.", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400", quoteBorder: "border-yellow-500/30", quoteColor: "text-yellow-400/70", hoverBorder: "hover:border-yellow-500/30", spotlightColor: "234, 179, 8" },
  { icon: CyberLinkIcon, title: "Link terlihat meyakinkan", description: "Domain mirip bank atau ekspedisi resmi, tapi sebenarnya mengarah ke halaman palsu.", quote: "Domain mirip bank/ekspedisi resmi.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", quoteBorder: "border-cyan-500/30", quoteColor: "text-cyan-400/70", hoverBorder: "hover:border-cyan-500/30", spotlightColor: "34, 211, 238" },
];

export default function ProblemSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <ShapeGrid
          shape="triangle"
          borderColor="#3b2b2b"
          hoverFillColor="rgba(239, 68, 68, 0.08)"
          squareSize={70}
          speed={0.3}
          direction="up"
          hoverTrailAmount={4}
          gradientColor="#060B18"
        />
      </div>

      {/* Isolated WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center">
          <motion.div variants={fadeUp}><span className="section-label shiny-text">MASALAH</span><div className="w-full h-px bg-slate-800/30 mt-8 mb-12" /></motion.div>
          <motion.div variants={fadeUp}><WordReveal text="Penipuan digital sering terlihat seperti pesan biasa." /></motion.div>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto mt-6">AmanKlik membantu keluarga berhenti sebentar, membaca tanda bahayanya, lalu mengambil langkah yang aman.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {cards.map((card) => (
            <motion.div key={card.title} variants={slideInLeft}>
              <motion.div 
                onMouseMove={handleMouseMove}
                whileHover={{ y: -6, transition: { duration: 0.2 } }} 
                className={`liquid-glass rounded-2xl p-6 md:p-8 h-[280px] md:h-[320px] flex flex-col border border-transparent transition-colors ${card.hoverBorder} group overflow-hidden`}
              >
                {/* Spotlight background layer */}
                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" 
                  style={{
                    background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(${card.spotlightColor}, 0.12), transparent 80%)`
                  }}
                />
                
                <div className="relative mb-6 w-14 h-14 shrink-0 z-10">
                  {/* Premium ambient colored glow */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 ${card.iconBg}`} />
                  {/* Dark glass minimalist container */}
                  <div className="relative w-14 h-14 rounded-2xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center group-hover:border-slate-700/50 transition-colors shadow-lg">
                    <card.icon className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-xl font-[Sora,sans-serif] font-medium text-white z-10">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed z-10">{card.description}</p>
                <p className={`mt-auto text-xs italic ${card.quoteColor} border-l-2 ${card.quoteBorder} pl-3 z-10`}>&ldquo;{card.quote}&rdquo;</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

