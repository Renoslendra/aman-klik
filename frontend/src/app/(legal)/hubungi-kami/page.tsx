import type { Metadata } from "next";
import HubungiKamiContent from "@/components/pages/HubungiKamiContent";

export const metadata: Metadata = {
  title: "Hubungi Kami - AmanKlik AI",
  description:
    "Kirim pesan, saran, atau laporkan penipuan digital kepada tim AmanKlik AI. Kami siap membantu melindungi keluarga Indonesia.",
};

export default function HubungiKamiPage() {
  return (
    <main className="pt-28">
      <HubungiKamiContent />
    </main>
  );
}
