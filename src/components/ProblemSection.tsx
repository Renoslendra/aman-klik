"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Clock, Lock, Link } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

function WordReveal({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.4"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="flex flex-wrap gap-x-[0.3em]">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        const color = useTransform(scrollYProgress, [start, end], ["#475569", "#F8FAFC"]);
        return <motion.span key={i} style={{ opacity, color }} className="font-[Sora,sans-serif] text-3xl md:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.1]">{word}</motion.span>;
      })}
    </p>
  );
}

const cards = [
  { icon: Clock, title: "Pesan dibuat mendesak", description: "Penipu sering membuat korban merasa harus segera bertindak tanpa berpikir panjang.", quote: "Segera klik sebelum akun diblokir.", iconBg: "bg-red-500/10", iconColor: "text-red-400", quoteBorder: "border-red-500/30", quoteColor: "text-red-400/70", hoverBorder: "hover:border-red-500/30" },
  { icon: Lock, title: "Meminta data pribadi", description: "OTP, PIN, nomor kartu, password — data sensitif yang seharusnya tidak dibagikan lewat chat.", quote: "OTP, PIN, nomor kartu, password.", iconBg: "bg-yellow-500/10", iconColor: "text-yellow-400", quoteBorder: "border-yellow-500/30", quoteColor: "text-yellow-400/70", hoverBorder: "hover:border-yellow-500/30" },
  { icon: Link, title: "Link terlihat meyakinkan", description: "Domain mirip bank atau ekspedisi resmi, tapi sebenarnya mengarah ke halaman palsu.", quote: "Domain mirip bank/ekspedisi resmi.", iconBg: "bg-cyan-500/10", iconColor: "text-cyan-400", quoteBorder: "border-cyan-500/30", quoteColor: "text-cyan-400/70", hoverBorder: "hover:border-cyan-500/30" },
];

export default function ProblemSection() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
          <motion.div variants={fadeUp}><span className="section-label">MASALAH</span><div className="w-full h-px bg-slate-800/30 mt-8 mb-12" /></motion.div>
          <motion.div variants={fadeUp}><WordReveal text="Penipuan digital sering terlihat seperti pesan biasa." /></motion.div>
          <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mt-6">AmanKlik membantu keluarga berhenti sebentar, membaca tanda bahayanya, lalu mengambil langkah yang aman.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {cards.map((card) => (
            <motion.div key={card.title} variants={fadeUp}>
              <motion.div whileHover={{ y: -6, transition: { duration: 0.2 } }} className={`liquid-glass rounded-2xl p-6 md:p-8 h-[280px] md:h-[320px] flex flex-col border border-transparent transition-colors ${card.hoverBorder}`}>
                <div className={`w-14 h-14 rounded-xl ${card.iconBg} flex items-center justify-center`}><card.icon className={`w-10 h-10 ${card.iconColor}`} /></div>
                <h3 className="text-xl font-[Sora,sans-serif] font-medium text-white mt-6">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">{card.description}</p>
                <p className={`mt-auto text-xs italic ${card.quoteColor} border-l-2 ${card.quoteBorder} pl-3`}>&ldquo;{card.quote}&rdquo;</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
