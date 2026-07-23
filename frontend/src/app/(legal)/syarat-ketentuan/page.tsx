import type { Metadata } from "next";
import SyaratKetentuanContent from "@/components/pages/SyaratKetentuanContent";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan — AmanKlik AI",
  description:
    "Pelajari syarat dan ketentuan penggunaan layanan AmanKlik AI serta batasan tanggung jawab hasil analisis berbasis kecerdasan buatan.",
};

export default function SyaratKetentuanPage() {
  return (
    <main className="pt-28">
      <SyaratKetentuanContent />
    </main>
  );
}


