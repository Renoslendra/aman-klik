"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Particles, ShapeGrid } from "@/components/effects/LazyVisuals";

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

const stats = [
  {
    value: "1.000+",
    label: "Laporan penipuan digital per hari",
  },
  {
    value: "Rp 18,7T",
    label: "Kerugian fraud digital 2023",
  },
  {
    value: "68%",
    label: "Korban tidak sadar tanda penipuan",
  },
];

export default function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.14] pointer-events-none">
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
      <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none">
        <Particles
          particleCount={28}
          particleSpread={10}
          speed={0.05}
          particleColors={["#22d3ee", "#0891b2", "#06b6d4"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
          alphaParticles={true}
          particleBaseSize={85}
          sizeRandomness={0.75}
          cameraDistance={20}
        />
      </div>
      <div className="absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 z-0 h-[220px] w-[680px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.span variants={fadeUp} className="section-label shiny-text">
            LINDUNGI KELUARGA
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8"
          >
            Jangan tunggu jadi korban.
            <br />
            <span className="text-gradient-trust">Cek pesanmu sekarang.</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-16"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.value}
                variants={fadeUp}
                className="liquid-glass rounded-2xl p-6 text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient-trust font-[Sora,sans-serif]">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center gap-4">
            <Link
              href="/cek-pesan"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}
            >
              Cek Pesan Sekarang
            </Link>
            <p className="text-xs text-slate-500">Gratis. Tanpa registrasi. Langsung cek.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
