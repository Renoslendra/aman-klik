"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Upload, Search, Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } } };
const scanSteps = [{ icon: Search, text: "Membaca pesan" }, { icon: AlertTriangle, text: "Mendeteksi link" }, { icon: Shield, text: "Mencari red flags" }, { icon: CheckCircle, text: "Membuat saran aman" }];

export default function LiveDemoSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true); setShowResult(false); setCurrentStep(0);
    [0, 800, 1600, 2400].forEach((delay, i) => setTimeout(() => setCurrentStep(i), delay));
    setTimeout(() => { setIsAnalyzing(false); setShowResult(true); }, 3200);
  };

  return (
    <section id="demo" className="py-24 md:py-32 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label">COBA LANGSUNG</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-[-0.02em] leading-[1.1] text-white mt-8">Tempel pesan. Biarkan AmanKlik<br /><span className="text-gradient-trust">membaca tandanya.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-4">Pesan Mencurigakan</h3>
              <textarea className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none h-32" placeholder='Contoh: "Selamat! Paket Anda tertahan..."' defaultValue="Selamat! Paket Anda tertahan di gudang. Klik link ini segera untuk konfirmasi data pengiriman: bit.ly/paket-amn2024. Jika tidak dikonfirmasi dalam 24 jam, paket akan dikembalikan." />
              <div className="mt-4 border-2 border-dashed border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors cursor-pointer group">
                <Upload className="w-8 h-8 text-slate-500 mx-auto group-hover:text-cyan-400 transition-colors" />
                <p className="text-sm text-slate-500 mt-2">Upload screenshot chat, SMS, email, atau link mencurigakan</p>
              </div>
              <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full mt-4 bg-cyan-500 text-slate-950 font-semibold rounded-xl px-6 py-3.5 text-base hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>
                {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" />Menganalisis...</> : "Analisis Risiko"}
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {!isAnalyzing && !showResult && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-[350px] text-center">
                    <Shield className="w-12 h-12 text-slate-700 mb-4" />
                    <p className="text-slate-500 text-sm">Klik &ldquo;Analisis Risiko&rdquo; untuk melihat hasil</p>
                  </motion.div>
                )}
                {isAnalyzing && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4 py-8">
                    <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /><span className="text-sm text-cyan-400">Kliko sedang membaca tanda-tandanya...</span></div>
                    {scanSteps.map((step, i) => (
                      <div key={step.text} className={`flex items-center gap-3 transition-all duration-500 ${i <= currentStep ? "opacity-100 translate-x-0" : "opacity-20 translate-x-[-10px]"}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${i < currentStep ? "bg-green-500/10" : i === currentStep ? "bg-cyan-500/10" : "bg-slate-800/50"}`}>
                          {i < currentStep ? <CheckCircle className="w-4 h-4 text-green-400" /> : <step.icon className={`w-4 h-4 ${i === currentStep ? "text-cyan-400" : "text-slate-600"}`} />}
                        </div>
                        <span className={`text-sm ${i <= currentStep ? "text-slate-300" : "text-slate-600"}`}>{step.text}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {showResult && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
                      <div><p className="text-sm font-medium text-red-400">Risiko Tinggi</p><p className="text-xs text-slate-500">Phishing / Link Palsu</p></div>
                      <div className="ml-auto text-2xl font-[Sora,sans-serif] font-bold text-red-400">82/100</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30"><p className="text-sm text-slate-300">Pesan mencoba membuat pengguna klik link dan mengisi data pribadi.</p></div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tanda Bahaya</p>
                      {['Menggunakan kata mendesak seperti "segera"', "Link tidak terlihat seperti domain resmi", "Meminta konfirmasi data pribadi", "Memberi ancaman paket akan dikembalikan"].map((flag, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />{flag}
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-2 mt-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Langkah Aman</p>
                      {["Jangan klik link di pesan tersebut", "Cek aplikasi resmi atau hubungi layanan resmi", "Jangan kirim OTP, PIN, atau password"].map((action, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{action}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
