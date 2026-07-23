import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopMount from "@/components/layout/ScrollToTopMount";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://amanklik.vercel.app"),
  title: "AmanKlik AI — Cek dulu sebelum klik",
  description:
    "AmanKlik AI membantu keluarga Indonesia mengenali chat, link, screenshot, dan pesan penipuan digital sebelum klik, transfer, atau kirim data pribadi.",
  openGraph: {
    title: "AmanKlik AI — Cek dulu sebelum klik",
    description:
      "Lindungi keluarga dari penipuan digital. Tempel pesan atau screenshot mencurigakan, biarkan AI menganalisis risikonya.",
    type: "website",
    siteName: "AmanKlik AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmanKlik AI — Cek dulu sebelum klik",
    description:
      "Lindungi keluarga dari penipuan digital. Tempel pesan atau screenshot mencurigakan, biarkan AI menganalisis risikonya.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-[Inter,sans-serif]">
        <AuthProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-500 focus:text-slate-950 focus:font-semibold focus:text-sm"
          >
            Langsung ke konten
          </a>
          <ScrollProgress />
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
          <ScrollToTopMount />
          <div className="noise-overlay" />
        </AuthProvider>
      </body>
    </html>
  );
}

