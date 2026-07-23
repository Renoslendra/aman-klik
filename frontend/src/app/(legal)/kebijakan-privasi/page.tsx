import type { Metadata } from "next";
import KebijakanPrivasiContent from "@/components/pages/KebijakanPrivasiContent";

export const metadata: Metadata = {
  title: "Kebijakan Privasi - AmanKlik AI",
  description:
    "Pelajari bagaimana AmanKlik AI memproses, menyimpan, dan melindungi data analisis pesan, akun, riwayat pemindaian, serta laporan pengguna.",
};

export default function KebijakanPrivasiPage() {
  return (
    <main className="pt-28">
      <KebijakanPrivasiContent />
    </main>
  );
}

