"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Link, KeyRound, Banknote, UserX, Share2, CheckCircle, ArrowRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };

const checklistItems = [
  { id: "link", icon: Link, label: "Saya sudah klik link", steps: ["Ganti password akun terkait", "Cek aktivitas login terbaru", "Aktifkan 2FA jika tersedia"] },
  { id: "otp", icon: KeyRound, label: "Saya sudah kirim OTP", steps: ["Hubungi bank segera", "Blokir kartu jika perlu", "Ganti password dan OTP"] },
  { id: "transfer", icon: Banknote, label: "Saya sudah transfer uang", steps: ["Hubungi bank untuk blokir transfer", "Laporkan ke pihak berwajib", "Simpan bukti transaksi"] },
  { id: "akun", icon: UserX, label: "Akun saya diambil alih", steps: ["Reset password segera", "Cabut akses perangkat lain", "Hubungi layanan platform"] },
  { id: "keluarga", icon: Share2, label: "Saya ingin memberi tahu keluarga", steps: ["Bagikan peringatan ini", "Ajak mereka cek pesan di AmanKlik", "Edukasi tentang modus penipuan"] },
];

export default function EmergencyModeSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const toggleCheck = (id: string) => { const n = new Set(checked); if (n.has(id)) { n.delete(id); setActiveItem(null); } else { n.add(id); setActiveItem(id); } setChecked(n); };

  return (
    <section id="darurat" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">BANTUAN DARURAT</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Sudah terlanjur klik atau transfer?<br /><span className="text-gradient-trust">Tetap tenang, ikuti langkah darurat.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-6">Pilih kondisi yang sesuai</h3>
              <div className="flex flex-col gap-3">
                {checklistItems.map((item, i) => (
                  <motion.button key={item.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left w-full ${checked.has(item.id) ? "bg-green-500/5 border-green-500/20" : "bg-slate-900/30 border-slate-700/30 hover:border-slate-600/50"}`}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${checked.has(item.id) ? "bg-green-500 border-green-500" : "border-slate-600"}`}>{checked.has(item.id) && <CheckCircle className="w-3.5 h-3.5 text-white" />}</div>
                    <item.icon className={`w-4 h-4 shrink-0 ${checked.has(item.id) ? "text-green-400" : "text-slate-500"}`} />
                    <span className={`text-sm ${checked.has(item.id) ? "text-green-400" : "text-slate-300"}`}>{item.label}</span>
                    {checked.has(item.id) && <span className="ml-auto text-xs text-green-400/70">Langkah berikutnya siap</span>}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }} className="flex flex-col gap-6">
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-cyan-400" /></div><h3 className="text-lg font-[Sora,sans-serif] font-medium text-white">Jangan panik</h3></div>
              <p className="text-sm text-slate-400 leading-relaxed">Banyak kasus penipuan bisa ditangani jika langkah yang tepat diambil dengan cepat. AmanKlik akan membantu kamu langkah demi langkah.</p>
            </div>
            {activeItem && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="liquid-glass rounded-2xl p-6 md:p-8">
                <h4 className="text-sm font-medium text-white mb-4">Langkah darurat:</h4>
                <div className="flex flex-col gap-3">{checklistItems.find((item) => item.id === activeItem)?.steps.map((step, i) => (
                  <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-center gap-3 text-sm text-slate-300"><div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-xs text-cyan-400 font-medium">{i + 1}</div>{step}</motion.div>
                ))}</div>
              </motion.div>
            )}
            <a href="#" className="bg-cyan-500 text-slate-950 font-semibold rounded-xl px-7 py-3.5 text-base hover:brightness-110 active:scale-[0.97] transition-all text-center flex items-center justify-center gap-2" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>Buka Mode Darurat <ArrowRight className="w-4 h-4" /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
