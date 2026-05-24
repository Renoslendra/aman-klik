"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";

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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const faqItems = [
  {
    question: "Apakah data pesan saya disimpan?",
    answer:
      "Tidak. AmanKlik menganalisis pesan secara real-time dan tidak menyimpan data Anda di server manapun. Privasi Anda adalah prioritas utama.",
  },
  {
    question: "Bagaimana cara AmanKlik mendeteksi penipuan?",
    answer:
      "AmanKlik menggunakan AI untuk menganalisis pola bahasa, URL mencurigakan, permintaan data sensitif, dan teknik social engineering yang umum digunakan penipu.",
  },
  {
    question: "Apakah AmanKlik gratis?",
    answer:
      "Ya, AmanKlik sepenuhnya gratis untuk digunakan. Misi kami adalah melindungi keluarga Indonesia dari penipuan digital.",
  },
  {
    question: "Jenis penipuan apa saja yang bisa dideteksi?",
    answer:
      "Phishing link, penipuan undian/hadiah, permintaan OTP, impersonasi bank/marketplace, dan social engineering melalui chat, SMS, atau email.",
  },
  {
    question: "Bisakah AmanKlik mengecek link atau URL?",
    answer:
      "Ya. Tempel link mencurigakan ke kolom input dan AmanKlik akan menganalisis reputasi domain, pola URL, dan keaslian situs tersebut.",
  },
  {
    question: "Bagaimana jika saya sudah terlanjur klik link berbahaya?",
    answer:
      "Segera kunjungi halaman Mode Darurat kami untuk panduan langkah demi langkah menyelamatkan akun dan data Anda.",
  },
];

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faqChevronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path
        d="M6 9L12 15L18 9"
        stroke="url(#faqChevronGrad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.16] pointer-events-none">
        <ShapeGrid
          shape="circle"
          borderColor="#1e2d3d"
          hoverFillColor="rgba(6, 182, 212, 0.08)"
          squareSize={80}
          speed={0.25}
          direction="left"
          hoverTrailAmount={5}
          gradientColor="#060B18"
        />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.16] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="text-center">
            <motion.span variants={fadeUp} className="section-label shiny-text">
              PERTANYAAN UMUM
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8"
            >
              Ada pertanyaan?
              <br />
              <span className="text-gradient-trust">Kami punya jawabannya.</span>
            </motion.h2>
          </div>

          <motion.div variants={staggerContainer} className="mx-auto mt-12 md:mt-16 max-w-3xl space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  variants={fadeUp}
                  className="liquid-glass rounded-2xl cursor-pointer overflow-hidden"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between p-5 md:p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-[Sora,sans-serif] font-medium text-white pr-4">
                      {item.question}
                    </span>
                    <ChevronIcon
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-400 leading-relaxed px-5 md:px-6 pb-5 md:pb-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
