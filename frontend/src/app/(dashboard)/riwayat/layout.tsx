import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Pemindaian - AmanKlik AI",
  description:
    "Lihat riwayat pemindaian pesan mencurigakan Anda. Pantau statistik keamanan digital dan kelola hasil analisis AI.",
};

export default function RiwayatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


