import type { Metadata } from "next";
import EmergencyModeSection from "@/components/sections/EmergencyModeSection";

export const metadata: Metadata = {
  title: "Mode Darurat — AmanKlik AI",
  description:
    "Akses mode darurat AmanKlik AI untuk tindakan cepat saat Anda atau keluarga menjadi korban penipuan digital.",
};

export default function DaruratPage() {
  return (
    <main className="pt-28">
      <EmergencyModeSection />
    </main>
  );
}

