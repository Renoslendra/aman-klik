"use client";

import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";
import AICyberMedic from "./emergency/AICyberMedic";
import EmergencyContacts from "./emergency/EmergencyContacts";
import EmergencyGuide from "./emergency/EmergencyGuide";
import ReportGenerator from "./emergency/ReportGenerator";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

type TabId = "guide" | "medic" | "report";

function GuideTabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="emergencyGuideTabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M5 4.5H19C20.1 4.5 21 5.4 21 6.5V19.5L17.5 17.5H5C3.9 17.5 3 16.6 3 15.5V6.5C3 5.4 3.9 4.5 5 4.5Z" fill="url(#emergencyGuideTabGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7.5 9H16.5M7.5 12H14" stroke="#e0f7fa" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MedicTabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="emergencyMedicTabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M12 3L5 6V11.5C5 16.5 8.3 20 12 21C15.7 20 19 16.5 19 11.5V6L12 3Z" fill="url(#emergencyMedicTabGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8V15M8.5 11.5H15.5" stroke="#fecaca" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ReportTabIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="emergencyReportTabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M6 3.5H15L20 8.5V20.5H6C4.9 20.5 4 19.6 4 18.5V5.5C4 4.4 4.9 3.5 6 3.5Z" fill="url(#emergencyReportTabGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 3.5V8.5H20M8 12H16M8 15H16M8 18H13" stroke="#e0f7fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tabs: Array<{ id: TabId; label: string; description: string; icon: ComponentType<{ className?: string }> }> = [
  { id: "guide", label: "Panduan Darurat", description: "Checklist interaktif", icon: GuideTabIcon },
  { id: "medic", label: "AI Cyber Medic", description: "Diagnosis insiden", icon: MedicTabIcon },
  { id: "report", label: "Generator Surat", description: "Kronologi siap cetak", icon: ReportTabIcon },
];

export default function EmergencyModeSection() {
  const [activeTab, setActiveTab] = useState<TabId>("guide");

  return (
    <section id="darurat" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
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

      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none">
        
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-12 md:mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">BANTUAN DARURAT</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">
            Sudah terlanjur klik atau transfer?
            <br />
            <span className="text-gradient-trust">Tetap tenang, ikuti langkah darurat.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-8 md:mb-10"
        >
          <div className="liquid-glass rounded-2xl p-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                      isActive
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
                        : "bg-slate-900/30 border-slate-700/30 text-slate-400 hover:border-slate-600/60 hover:text-slate-200"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isActive ? "border-cyan-500/30 bg-cyan-500/10" : "border-slate-700/50 bg-slate-950/40"}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{tab.label}</span>
                      <span className="block truncate text-xs text-slate-500">{tab.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "guide" && <EmergencyGuide key="guide" />}
          {activeTab === "medic" && <AICyberMedic key="medic" />}
          {activeTab === "report" && <ReportGenerator key="report" />}
        </AnimatePresence>

        <EmergencyContacts />
      </div>
    </section>
  );
}
