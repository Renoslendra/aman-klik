import type { Metadata } from "next";
import LiveDemoSection from "@/components/sections/LiveDemoSection";

export const metadata: Metadata = {
  title: "Cek Pesan Mencurigakan - AmanKlik AI",
  description:
    "Tempel pesan atau upload screenshot mencurigakan dari SMS, WhatsApp, atau email. Biarkan AI Gemini menganalisis risikonya secara instan dan gratis.",
};

export default function CekPesanPage() {
  return (
    <main className="pt-28">
      <LiveDemoSection />
    </main>
  );
}

