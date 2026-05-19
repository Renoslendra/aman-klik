import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmanKlik AI — Cek dulu sebelum klik",
  description:
    "AmanKlik AI membantu keluarga Indonesia mengenali chat, link, dan pesan penipuan digital sebelum klik, transfer, atau kirim data pribadi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-[Inter,sans-serif]">
        {children}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
