import type { Metadata } from "next";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

export const metadata: Metadata = {
  title: "Cara Kerja — AmanKlik AI",
  description:
    "Pelajari bagaimana AmanKlik AI bekerja menganalisis pesan, link, dan pola penipuan digital untuk melindungi Anda dan keluarga.",
};

export default function CaraKerjaPage() {
  return (
    <main className="pt-28">
      <HowItWorksSection />
    </main>
  );
}
