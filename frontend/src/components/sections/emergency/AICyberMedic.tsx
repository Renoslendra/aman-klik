"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ApiError, api } from "@/lib/api";

type EmergencyCategory = "transfer" | "otp" | "hack" | "link" | "apk" | "other";
type Urgency = "critical" | "high" | "medium";

type EmergencyActionStep = {
  step: number;
  title: string;
  detail: string;
  urgency: Urgency;
  action?: {
    type: "phone" | "link";
    value: string;
    label: string;
  } | null;
};

type EmergencyDiagnosis = {
  urgencyLevel: Urgency;
  urgencyMessage: string;
  timeWindow: string;
  diagnosis: string;
  actionPlan: EmergencyActionStep[];
  importantNotes: string[];
};

type EmergencyDiagnosisResponse = {
  success: boolean;
  data?: EmergencyDiagnosis;
};

const categoryOptions: Array<{ value: EmergencyCategory; label: string }> = [
  { value: "transfer", label: "Sudah transfer uang" },
  { value: "otp", label: "OTP atau PIN bocor" },
  { value: "hack", label: "Akun diambil alih" },
  { value: "link", label: "Klik link mencurigakan" },
  { value: "apk", label: "Instal APK mencurigakan" },
  { value: "other", label: "Lainnya" },
];

const exampleText =
  "Saya baru transfer Rp 2.500.000 dari BCA ke rekening BRI setelah beli barang dari Instagram. Setelah transfer, penjual tidak membalas. Kejadiannya sekitar 10 menit lalu.";

function MedicShieldIcon({ className }: { className?: string }) {
  const gradientId = `aiCyberMedicShieldGrad-${useId().replace(/:/g, "")}`;

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="55%" stopColor="#22d3ee" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M12 2.8L4.5 6V11.5C4.5 16.4 7.7 20 12 21.2C16.3 20 19.5 16.4 19.5 11.5V6L12 2.8Z" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 7.5V15.5M8 11.5H16" stroke="#fff1f2" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={`${className} animate-spin`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" strokeOpacity="0.22" />
      <path d="M12 3A9 9 0 0 0 3 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

const urgencyStyle: Record<Urgency, { badge: string; border: string; label: string }> = {
  critical: {
    badge: "bg-red-500/10 border-red-500/30 text-red-300 animate-pulse",
    border: "border-red-500/30",
    label: "KRITIS",
  },
  high: {
    badge: "bg-orange-500/10 border-orange-500/30 text-orange-300",
    border: "border-orange-500/30",
    label: "TINGGI",
  },
  medium: {
    badge: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    border: "border-yellow-500/30",
    label: "SEDANG",
  },
};

function formatDiagnosisForCopy(result: EmergencyDiagnosis) {
  const steps = result.actionPlan
    .map((step) => `${step.step}. ${step.title}\n   ${step.detail}${step.action ? `\n   Aksi: ${step.action.label} - ${step.action.value}` : ""}`)
    .join("\n\n");
  const notes = result.importantNotes.map((note) => `- ${note}`).join("\n");

  return `${result.urgencyMessage}\nWaktu kritis: ${result.timeWindow}\n\nDiagnosis:\n${result.diagnosis}\n\nRencana aksi:\n${steps}\n\nCatatan penting:\n${notes}`;
}

async function copyTextToClipboard(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    return true;
  } catch {
    // Fall back to Clipboard API for browsers that block legacy copy commands.
  } finally {
    textarea.remove();
  }

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back for browsers that block Clipboard API in embedded contexts.
    }
  }

  return false;
}

export default function AICyberMedic() {
  const [description, setDescription] = useState(exampleText);
  const [category, setCategory] = useState<EmergencyCategory>("transfer");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmergencyDiagnosis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = description.trim().length >= 10 && !isLoading;
  const activeUrgency = useMemo(() => result ? urgencyStyle[result.urgencyLevel] : urgencyStyle.high, [result]);

  const handleDiagnose = async () => {
    const normalizedDescription = description.trim();
    if (normalizedDescription.length < 10) {
      setErrorMessage("Ceritakan insiden minimal 10 karakter agar AI bisa memberi langkah yang tepat.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setCopied(false);

    try {
      const response = await api.post<EmergencyDiagnosisResponse>("/emergency/diagnose", {
        description: normalizedDescription,
        category,
      });

      if (!response.success || !response.data) {
        throw new Error("Respon diagnosis tidak lengkap.");
      }

      setResult(response.data);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error instanceof Error ? error.message : "Gagal menganalisis insiden. Pastikan backend berjalan.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;

    const copiedSuccessfully = await copyTextToClipboard(formatDiagnosisForCopy(result));
    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      setCopied(false);
    }
  };

  const handleShare = () => {
    if (!result) return;
    const url = `https://wa.me/?text=${encodeURIComponent(formatDiagnosisForCopy(result))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.25fr]"
    >
      <div className="liquid-glass rounded-2xl p-5 md:p-8">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-950/70">
              <MedicShieldIcon className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="section-label shiny-text">AI CYBER MEDIC</p>
            <h3 className="mt-3 text-2xl font-[Sora,sans-serif] font-medium text-white">Diagnosis insiden siber</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Tulis apa yang terjadi dengan bahasa sehari-hari. Jangan masukkan password, OTP, atau PIN.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-400">Jenis insiden</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as EmergencyCategory)}
              className="w-full rounded-xl border border-slate-700/40 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm text-slate-400">Ceritakan kronologi singkat</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="min-h-40 w-full resize-none rounded-xl border border-slate-700/40 bg-slate-900/50 p-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
              placeholder="Contoh: saya baru transfer dari BCA ke BRI, nominal sekian, lewat Instagram, kejadian 10 menit lalu..."
            />
          </label>

          <button
            type="button"
            onClick={handleDiagnose}
            disabled={!canSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 text-base font-semibold text-slate-950 transition-all hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}
          >
            {isLoading ? (
              <>
                <LoaderIcon className="h-4 w-4" />
                Menganalisis insiden...
              </>
            ) : (
              "Diagnosa sekarang"
            )}
          </button>

          {errorMessage && (
            <p className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      <div className="liquid-glass rounded-2xl p-5 md:p-8">
        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[430px] flex-col items-center justify-center text-center"
            >
              <MedicShieldIcon className="h-14 w-14 opacity-70" />
              <h3 className="mt-5 text-xl font-[Sora,sans-serif] font-medium text-white">Rencana aksi akan muncul di sini</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">AI akan mengurutkan langkah dari yang paling mendesak, termasuk nomor telepon dan link yang relevan.</p>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[430px] flex-col justify-center"
            >
              <div className="flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                <LoaderIcon className="h-6 w-6 text-cyan-300" />
                <div>
                  <p className="text-sm font-semibold text-cyan-100">Menganalisis insiden Anda...</p>
                  <p className="mt-1 text-sm text-slate-400">Mengidentifikasi urgensi, kanal laporan, dan langkah pemulihan.</p>
                </div>
              </div>
            </motion.div>
          )}

          {result && !isLoading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${activeUrgency.badge}`}>
                    {activeUrgency.label}
                  </span>
                  <h3 className="mt-3 text-2xl font-[Sora,sans-serif] font-medium text-white">{result.urgencyMessage}</h3>
                  <p className="mt-2 text-sm font-semibold text-cyan-200">Waktu kritis: {result.timeWindow}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15"
                  >
                    {copied ? "Tersalin" : "Salin rencana"}
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
                  >
                    Kirim via WA
                  </button>
                </div>
              </div>

              <div className={`mt-5 rounded-xl border ${activeUrgency.border} bg-slate-950/35 p-4`}>
                <p className="text-sm leading-relaxed text-slate-300">{result.diagnosis}</p>
              </div>

              <div className="mt-5 space-y-3">
                {result.actionPlan.map((step) => (
                  <div key={`${step.step}-${step.title}`} className="rounded-xl border border-slate-700/30 bg-slate-900/35 p-4">
                    <div className="flex items-start gap-3">
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${urgencyStyle[step.urgency].badge}`}>
                        {step.step}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">{step.detail}</p>
                        {step.action && (
                          <a
                            href={step.action.value}
                            target={step.action.type === "phone" ? undefined : "_blank"}
                            rel={step.action.type === "phone" ? undefined : "noopener noreferrer"}
                            className={`mt-3 inline-flex rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                              step.action.type === "phone"
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
                                : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/15"
                            }`}
                          >
                            {step.action.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {result.importantNotes.length > 0 && (
                <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-200">Catatan penting</p>
                  <ul className="mt-3 space-y-2">
                    {result.importantNotes.map((note) => (
                      <li key={note} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-300" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

