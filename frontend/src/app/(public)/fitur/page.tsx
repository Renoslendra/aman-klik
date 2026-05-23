import type { Metadata } from "next";
import FeatureCardsSection from "@/components/sections/FeatureCardsSection";
import ScamFlowSection from "@/components/sections/ScamFlowSection";
import ResultPreviewSection from "@/components/sections/ResultPreviewSection";

export const metadata: Metadata = {
  title: "Fitur Utama — AmanKlik AI",
  description:
    "Jelajahi fitur-fitur canggih AmanKlik AI untuk mendeteksi penipuan digital, menganalisis pola scam, dan melindungi data keluarga Anda.",
};

export default function FiturPage() {
  return (
    <main className="pt-28">
      <FeatureCardsSection />
      <div className="section-glow-divider" />
      <ScamFlowSection />
      <div className="section-glow-divider" />
      <ResultPreviewSection />
    </main>
  );
}
