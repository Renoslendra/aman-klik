"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Fitur", href: "#fitur" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Mode Darurat", href: "#darurat" },
  { label: "Edukasi", href: "#edukasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
        <div className={`max-w-[1200px] mx-auto transition-all duration-300 ${scrolled ? "mx-4 md:mx-6 liquid-glass rounded-2xl px-4 md:px-6 py-3" : "mx-4 md:mx-6 px-4 md:px-6 py-3"}`}>
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2.5 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-cyan-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-[Sora,sans-serif] font-semibold tracking-tight text-white">AmanKlik</span>
              <span className="text-cyan-400 font-semibold font-[Sora,sans-serif]">.AI</span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-slate-400 px-4 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-200">{link.label}</a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a href="#demo" className="border border-slate-700 text-white text-sm font-medium rounded-xl px-5 py-2.5 hover:border-cyan-400/40 transition-colors">Lihat Demo</a>
              <a href="#demo" className="bg-cyan-500 text-slate-950 text-sm font-semibold rounded-xl px-5 py-2.5 hover:brightness-110 active:scale-[0.97] transition-all animate-pulse-glow">Cek Pesan</a>
            </div>
            <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 liquid-glass-strong flex flex-col items-center justify-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-lg text-white hover:text-cyan-400 transition-colors" onClick={() => setMobileOpen(false)}>{link.label}</a>
            ))}
            <a href="#demo" className="bg-cyan-500 text-slate-950 font-semibold rounded-xl px-8 py-3 mt-4" onClick={() => setMobileOpen(false)}>Cek Pesan Sekarang</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
