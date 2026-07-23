import type { Metadata } from "next";
import EducationSection from "@/components/sections/EducationSection";

export const metadata: Metadata = {
  title: "Pusat Edukasi — AmanKlik AI",
  description:
    "Pusat edukasi AmanKlik AI — pelajari cara mengenali penipuan online, phishing, dan lindungi diri dari ancaman siber.",
};

export default function EdukasiPage() {
  return (
    <main className="pt-28">
      <EducationSection />
    </main>
  );
}

