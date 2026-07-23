"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Fitur Utama", href: "/fitur" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Mode Darurat", href: "/darurat" },
  { label: "Pusat Edukasi", href: "/edukasi" },
];

const legalLinks = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat Ketentuan", href: "/syarat-ketentuan" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
];

function CyberShieldLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ak-grad-footer" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ak-body-footer" x1="18" y1="28" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Outer Shield (filled) */}
      <path d="M32 4C20 4 10 8 8 10V34C8 48 18 56 32 60C46 56 56 48 56 34V10C54 8 44 4 32 4Z" fill="url(#ak-grad-footer)" fillOpacity="0.15" stroke="url(#ak-grad-footer)" strokeWidth="3" strokeLinejoin="round" />
      {/* Padlock Shackle */}
      <path d="M23 28V20C23 14 27 10 32 10C37 10 41 14 41 20V28" stroke="url(#ak-grad-footer)" strokeWidth="5" strokeLinecap="round" />
      {/* Padlock Body */}
      <rect x="19" y="28" width="26" height="22" rx="4" fill="url(#ak-body-footer)" />
      {/* Checkmark */}
      <path d="M25.5 39L30 43.5L39 34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Click Loop */}
      <path d="M20 46C14 52 8 48 6 42" stroke="url(#ak-grad-footer)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="6" cy="38" r="3" fill="url(#ak-grad-footer)" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/50 bg-[#0B1120]/80 backdrop-blur-xl py-16 md:py-20 px-6 md:px-8 overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Brand & Description */}
          <div className="md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <CyberShieldLogo className="w-10 h-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]" />
              <span className="text-xl font-[Sora,sans-serif] font-bold tracking-tight text-white">
                Aman<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Klik</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium max-w-sm leading-relaxed mb-8">
              AmanKlik membantu keluarga Indonesia mengenali chat, link, dan pesan penipuan digital sebelum klik, transfer, atau kirim data pribadi.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/renorenoss/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/Renoslendra" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              {/* Mail */}
              <a 
                href="mailto:renoslendra@gmail.com" 
                className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 border border-slate-700/50 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-6 lg:col-span-2 lg:col-start-8">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Navigasi</h4>
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-slate-300 font-semibold hover:text-cyan-300 transition-colors inline-flex items-center gap-2.5 group w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-6 lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Legal</h4>
            <div className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-slate-300 font-semibold hover:text-cyan-300 transition-colors inline-flex items-center gap-2.5 group w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-300"></span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pt-8 border-t border-slate-800/50 gap-6">
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-2xl">
            <span className="text-slate-200 font-bold">Disclaimer:</span> AmanKlik AI memberikan indikasi risiko berbasis AI. Keputusan akhir tetap di tangan pengguna. Untuk kasus darurat, segera hubungi bank, platform resmi, atau pihak berwenang terkait.
          </p>
          <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
            &copy; {new Date().getFullYear()} AmanKlik AI. Hak cipta dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}


