"use client";

import { Shield } from "lucide-react";

const links = [{ label: "Fitur", href: "#fitur" }, { label: "Cara Kerja", href: "#cara-kerja" }, { label: "Mode Darurat", href: "#darurat" }, { label: "Edukasi", href: "#edukasi" }, { label: "Privasi", href: "#" }];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/30 py-12 md:py-16 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4"><div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div><span className="text-lg font-[Sora,sans-serif] font-semibold tracking-tight text-white">AmanKlik</span><span className="text-cyan-400 font-semibold font-[Sora,sans-serif]">.AI</span></div>
            <p className="text-sm text-slate-500 max-w-md leading-relaxed">AmanKlik AI membantu keluarga Indonesia mengenali chat, link, dan pesan penipuan digital sebelum klik, transfer, atau kirim data pribadi.</p>
          </div>
          <div><h4 className="text-sm font-medium text-white mb-4">Navigasi</h4><div className="flex flex-col gap-2">{links.map((link) => (<a key={link.label} href={link.href} className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">{link.label}</a>))}</div></div>
        </div>
        <div className="border-t border-slate-800/30 pt-8">
          <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">AmanKlik AI membantu memberi indikasi risiko dan saran keamanan. Untuk kasus serius, segera hubungi bank, platform resmi, atau pihak berwenang terkait.</p>
          <p className="text-xs text-slate-700 mt-4">&copy; 2024 AmanKlik AI. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
