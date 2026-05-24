"use client";

import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShapeGrid  } from "@/components/effects/LazyVisuals";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { ApiError, api } from "@/lib/api";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function PremiumUploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="17 8 12 3 7 8" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PremiumSearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="6" stroke="#22d3ee" strokeWidth="1.8" />
      <line x1="16" y1="16" x2="22" y2="22" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 11A3 3 0 0 1 11 8" stroke="#e0f7fa" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PremiumAlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="alertDemoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M12 3L2 20H22L12 3Z" fill="url(#alertDemoGrad)" stroke="#ef4444" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8V13" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="#fca5a5" />
    </svg>
  );
}

function PremiumShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldDemoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path d="M12 2L3 6V12C3 17.5 7 21 12 22C17 21 21 17.5 21 12V6L12 2Z" fill="url(#shieldDemoGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumCheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.8" />
      <path d="M8.5 12.5L11 15L15.5 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumLoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
      <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const scanSteps = [{ icon: PremiumSearchIcon, text: "Membaca pesan/screenshot" }, { icon: PremiumAlertTriangleIcon, text: "Mendeteksi link" }, { icon: PremiumShieldIcon, text: "Mencari red flags" }, { icon: PremiumCheckCircleIcon, text: "Membuat saran aman" }];

const DEFAULT_DEMO_TEXT =
  "Selamat! Paket Anda tertahan di gudang. Klik link ini segera untuk konfirmasi data pengiriman: bit.ly/paket-amn2024. Jika tidak dikonfirmasi dalam 24 jam, paket akan dikembalikan.";

type SelectedImage = {
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
  base64Data: string;
};

type RedFlag = string | {
  indicator: string;
  explanation?: string;
};

type AnalysisResult = {
  score: number;
  riskLevel: string;
  category: string;
  summary: string;
  redFlags?: RedFlag[];
  recommendations?: string[];
};

type AnalysisResponse = {
  success: boolean;
  data?: AnalysisResult;
};

export default function LiveDemoSection() {
  const { canRunWebGL } = useDeviceCapability();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [inputText, setInputText] = useState(DEFAULT_DEMO_TEXT);

  const handleScreenshotChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Format screenshot harus PNG, JPG, JPEG, atau WebP.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setErrorMessage("Ukuran screenshot maksimal 4 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      const base64Data = dataUrl.includes(",") ? dataUrl.split(",").pop() || "" : "";

      if (!base64Data) {
        setErrorMessage("Screenshot tidak bisa dibaca. Coba file gambar lain.");
        return;
      }

      setSelectedImage({
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        dataUrl,
        base64Data,
      });
      if (inputText === DEFAULT_DEMO_TEXT) {
        setInputText("");
      }
      setErrorMessage(null);
    };
    reader.onerror = () => {
      setErrorMessage("Screenshot tidak bisa dibaca. Coba file gambar lain.");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if ((!inputText || inputText.trim().length === 0) && !selectedImage) {
      alert("Masukkan teks pesan atau unggah screenshot terlebih dahulu.");
      return;
    }

    setIsAnalyzing(true);
    setShowResult(false);
    setResultData(null);
    setErrorMessage(null);
    setCurrentStep(0);

    // Simulate premium UI steps delay (minimum display time for nice visual vibe)
    const stepsDelays = [800, 1600, 2400];
    const stepPromises = stepsDelays.map((delay, index) => 
      new Promise<void>((resolve) => setTimeout(() => {
        setCurrentStep(index + 1);
        resolve();
      }, delay))
    );

    // Make real backend API call
    const apiPromise = api.post<AnalysisResponse>("/analysis/scan", {
      text: inputText.trim(),
      image: selectedImage
        ? {
            data: selectedImage.base64Data,
            mimeType: selectedImage.mimeType,
            fileName: selectedImage.fileName,
          }
        : undefined,
    });

    try {
      const response = (await Promise.all([
        Promise.all(stepPromises),
        apiPromise
      ]))[1];

      if (response && response.success && response.data) {
        setResultData(response.data);
        setErrorMessage(null);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowResult(true);
        }, 600);
      } else {
        throw new Error("Gagal mendapatkan respon analisis.");
      }
    } catch (err: unknown) {
      console.error("Live analysis failed:", err);
      if (err instanceof ApiError && err.status === 429) {
        setErrorMessage("Terlalu banyak permintaan. Silakan tunggu beberapa menit.");
      } else {
        setErrorMessage(err instanceof Error ? err.message : "Gagal menganalisis pesan. Pastikan server backend berjalan.");
      }
      setIsAnalyzing(false);
      setShowResult(false);
    }
  };

  // Determine styling color schemes based on riskLevel
  const isHigh = resultData?.riskLevel === "high";
  const isMedium = resultData?.riskLevel === "medium";

  const riskColor = isHigh ? "text-red-400" : isMedium ? "text-amber-400" : "text-emerald-400";
  const riskBgGlow = isHigh ? "bg-red-500/20" : isMedium ? "bg-amber-500/20" : "bg-emerald-500/20";
  const riskBorder = isHigh ? "border-red-500/30" : isMedium ? "border-amber-500/30" : "border-emerald-500/30";
  const riskLabel = isHigh ? "Risiko Tinggi" : isMedium ? "Risiko Sedang" : "Aman / Normal";

  return (
    <section id="demo" className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden">
      {/* Dynamic Shape Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.18] pointer-events-none">
        {canRunWebGL ? (
          <ShapeGrid
            shape="circle"
            borderColor="#1e2d3d"
            hoverFillColor="rgba(6, 182, 212, 0.08)"
            squareSize={80}
            speed={0.25}
            direction="left"
            hoverTrailAmount={5}
            gradientColor="#060B18"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950 opacity-50" />
        )}
      </div>



      <div className="relative z-10 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-16">
          <motion.span variants={fadeUp} className="section-label shiny-text">COBA LANGSUNG</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-[Sora,sans-serif] font-medium tracking-normal leading-[1.1] text-white mt-8">Tempel pesan atau screenshot. Biarkan AmanKlik<br /><span className="text-gradient-trust">membaca tandanya.</span></motion.h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-[Sora,sans-serif] font-medium text-white mb-4">Pesan Mencurigakan</h3>
              <textarea className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-sm text-slate-300 placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none h-32" placeholder='Contoh: "Selamat! Paket Anda tertahan..."' value={inputText} onChange={(e) => setInputText(e.target.value)} />
              <label className="mt-4 block border-2 border-dashed border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleScreenshotChange}
                  disabled={isAnalyzing}
                />
                <PremiumUploadIcon className="w-8 h-8 text-slate-500 mx-auto group-hover:text-cyan-400 transition-colors" />
                <p className="text-sm text-slate-500 mt-2">Upload screenshot chat, SMS, email, atau link mencurigakan</p>
                <p className="text-xs text-slate-600 mt-1">PNG, JPG, JPEG, atau WebP. Maksimal 4 MB.</p>
              </label>
              {selectedImage && (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                  <Image
                    src={selectedImage.dataUrl}
                    alt={`Preview ${selectedImage.fileName}`}
                    width={56}
                    height={56}
                    unoptimized
                    className="h-14 w-14 rounded-lg object-cover border border-cyan-500/20"
                  />
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm font-semibold text-cyan-100">{selectedImage.fileName}</p>
                    <p className="text-xs text-slate-400">{(selectedImage.size / 1024).toFixed(1)} KB siap dianalisis</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    disabled={isAnalyzing}
                    className="rounded-lg border border-slate-700/70 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-red-500/40 hover:text-red-300 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              )}
              <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full mt-4 bg-cyan-500 text-slate-950 font-semibold rounded-xl px-6 py-3.5 text-base hover:brightness-110 active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}>
                {isAnalyzing ? <><PremiumLoaderIcon className="w-4 h-4 text-slate-950" />Menganalisis...</> : "Analisis Risiko"}
              </button>
              {errorMessage && (
                <p className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}>
            <div className="liquid-glass rounded-2xl p-6 md:p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                {!isAnalyzing && !showResult && (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center h-[350px] text-center">
                    <PremiumShieldIcon className="w-12 h-12 text-slate-700 mb-4" />
                    <p className="text-slate-500 text-sm">Klik &ldquo;Analisis Risiko&rdquo; untuk melihat hasil</p>
                  </motion.div>
                )}
                {isAnalyzing && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4 py-8">
                    <div className="flex items-center gap-2 mb-4"><div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /><span className="text-sm text-cyan-400">Kliko sedang membaca tanda-tandanya...</span></div>
                    {scanSteps.map((step, i) => (
                      <div key={step.text} className={`flex items-center gap-3 transition-all duration-500 ${i <= currentStep ? "opacity-100 translate-x-0" : "opacity-20 translate-x-[-10px]"}`}>
                        <div className="relative w-8 h-8 shrink-0">
                          {/* Ambient glow when active or done */}
                          <div className={`absolute inset-0 rounded-lg blur-sm transition-opacity duration-300 ${
                            i < currentStep ? "bg-green-500/20 opacity-40" : i === currentStep ? "bg-cyan-500/25 opacity-50 animate-pulse" : "bg-transparent opacity-0"
                          }`} />
                          {/* Core glass container */}
                          <div className={`relative w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${
                            i < currentStep 
                              ? "bg-slate-950/40 border-green-500/30" 
                              : i === currentStep 
                              ? "bg-slate-950/40 border-cyan-500/40 scale-105" 
                              : "bg-slate-900/20 border-slate-800/80"
                          }`}>
                            {i < currentStep ? <PremiumCheckCircleIcon className="w-4 h-4 text-green-400" /> : <step.icon className={`w-4 h-4 ${i === currentStep ? "text-cyan-400" : "text-slate-600"}`} />}
                          </div>
                        </div>
                        <span className={`text-sm ${i <= currentStep ? "text-slate-300" : "text-slate-600"}`}>{step.text}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
                {showResult && resultData && (
                  <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 mb-2 group">
                      <div className="relative w-10 h-10 shrink-0">
                        {/* Premium ambient glow */}
                        <div className={`absolute inset-0 rounded-xl ${riskBgGlow} blur-md opacity-45 group-hover:opacity-65 transition-opacity duration-300`} />
                        {/* Dark glass container */}
                        <div className="relative w-10 h-10 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-center shadow-lg group-hover:border-slate-700/50 transition-colors">
                          {isHigh || isMedium ? (
                            <PremiumAlertTriangleIcon className="w-5 h-5" />
                          ) : (
                            <PremiumShieldIcon className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${riskColor}`}>{riskLabel}</p>
                        <p className="text-xs text-slate-500">{resultData.category}</p>
                      </div>
                      <div className={`ml-auto text-2xl font-[Sora,sans-serif] font-bold ${riskColor}`}>{resultData.score}/100</div>
                    </div>
                    <div className={`bg-slate-900/50 rounded-xl p-4 border ${riskBorder}`}><p className="text-sm text-slate-300">{resultData.summary}</p></div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tanda Bahaya</p>
                      {resultData.redFlags && resultData.redFlags.length > 0 ? (
                        resultData.redFlags.map((flag, i) => {
                          const indicatorText = typeof flag === "string" ? flag : flag.indicator;
                          const explanationText = typeof flag === "object" && flag.explanation ? `: ${flag.explanation}` : "";
                          return (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-400">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isHigh ? "bg-red-400" : "bg-amber-400"}`} />
                              <span>
                                <strong className="text-slate-200">{indicatorText}</strong>
                                {explanationText}
                              </span>
                            </motion.div>
                          );
                        })
                      ) : (
                        <p className="text-sm text-slate-500 italic">Tidak ditemukan indikator bahaya mencolok.</p>
                      )}
                    </div>
                    <div className="space-y-2 mt-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Langkah Aman</p>
                      {resultData.recommendations && resultData.recommendations.length > 0 ? (
                        resultData.recommendations.map((action: string, i: number) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.15 }} className="flex items-start gap-2 text-sm text-slate-300">
                            <PremiumCheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                            <span>{action}</span>
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500 italic">Tetap waspada saat berinteraksi dengan pesan asing.</p>
                      )}
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
