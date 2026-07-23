"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ReportForm = {
  fullName: string;
  nik: string;
  address: string;
  city: string;
  phone: string;
  fraudType: string;
  sourceBank: string;
  sourceAccount: string;
  destinationBank: string;
  destinationAccount: string;
  destinationOwner: string;
  amount: string;
  incidentDateTime: string;
  chronology: string;
};

const bankOptions = [
  "BRI",
  "BCA",
  "Mandiri",
  "BNI",
  "BSI",
  "CIMB Niaga",
  "Danamon",
  "Permata",
  "DANA",
  "OVO",
  "GoPay",
  "ShopeePay",
  "LinkAja",
  "Lainnya",
];

const fraudTypes = [
  "Penipuan Online Shop",
  "Phishing Link Palsu",
  "Investasi Bodong",
  "Modus Kurir APK",
  "Romance Scam",
  "Penipuan Lowongan Kerja",
  "Penipuan Undian Berhadiah",
  "Lainnya",
];

const formSteps = ["Pelapor", "Insiden", "Kronologi", "Preview"];

function ReportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="reportGeneratorIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M6 3.5H15L20 8.5V20.5H6C4.9 20.5 4 19.6 4 18.5V5.5C4 4.4 4.9 3.5 6 3.5Z" fill="url(#reportGeneratorIconGrad)" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M15 3.5V8.5H20M8 12H16M8 15H16M8 18H13" stroke="#e0f7fa" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getLocalDateTimeValue() {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 16);
}

function generateReportNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = String(Math.floor(1000 + Math.random() * 9000));
  return `AK/KRN/${year}/${month}/${random}`;
}

function formatDateTime(value: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function formatToday() {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function formatRupiah(value: string) {
  const numeric = Number(value.replace(/[^\d]/g, ""));
  if (!numeric) return "-";
  return new Intl.NumberFormat("id-ID").format(numeric);
}

function buildReportText(form: ReportForm, reportNumber: string) {
  const destinationBank = form.destinationBank || "[Bank Tujuan]";
  const city = form.city || "[Kota]";

  return `SURAT KRONOLOGIS PENIPUAN
No: ${reportNumber}

Kepada Yth.
Pimpinan Cabang Bank ${destinationBank}
di Tempat

Dengan hormat,

Saya yang bertanda tangan di bawah ini:
  Nama     : ${form.fullName || "[Nama Lengkap]"}
  NIK      : ${form.nik || "-"}
  Alamat   : ${form.address || "[Alamat]"}
  No. HP   : ${form.phone || "[Nomor Telepon]"}

Dengan ini melaporkan bahwa saya telah menjadi korban penipuan online dengan kronologi sebagai berikut:

KRONOLOGI KEJADIAN:
Tanggal & Waktu   : ${formatDateTime(form.incidentDateTime)}
Jenis Penipuan    : ${form.fraudType || "[Kategori]"}
Jumlah Kerugian   : Rp ${formatRupiah(form.amount)}

Bank Pengirim     : ${form.sourceBank || "[Bank]"} - Rek. ${form.sourceAccount || "[Nomor Rekening]"}
Bank Tujuan       : ${destinationBank} - Rek. ${form.destinationAccount || "[Nomor Rekening]"}
                    a.n. ${form.destinationOwner || "[Nama Pemilik]"}

Uraian Kejadian:
${form.chronology || "[Tuliskan kronologi kejadian secara runtut dan jelas.]"}

Berdasarkan hal tersebut, saya mohon kepada pihak Bank untuk segera melakukan pemblokiran/pembekuan rekening tujuan guna mencegah penarikan dana oleh pelaku penipuan.

Demikian surat kronologis ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.

                          ${city}, ${formatToday()}
                          Yang membuat pernyataan,


                          ________________________
                          ${form.fullName || "[Nama Lengkap]"}

                          Meterai Rp 10.000
                          (tempel di sini)

Dokumen ini dibuat menggunakan AmanKlik AI
https://amanklik-575126371408.asia-southeast1.run.app`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function paragraphize(value: string) {
  return escapeHtml(value)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\n/g, "<br />"))
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function buildWordDocumentHtml(form: ReportForm, reportNumber: string) {
  const destinationBank = escapeHtml(form.destinationBank || "[Bank Tujuan]");
  const city = escapeHtml(form.city || "[Kota]");
  const fullName = escapeHtml(form.fullName || "[Nama Lengkap]");
  const chronology = form.chronology || "[Tuliskan kronologi kejadian secara runtut dan jelas.]";

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <title>Surat Kronologis Penipuan</title>
  <style>
    @page Section1 { size: 8.5in 11in; margin: 1in; }
    div.Section1 { page: Section1; }
    body { font-family: "Times New Roman", serif; font-size: 12pt; color: #000; line-height: 1.45; }
    h1 { text-align: center; font-size: 16pt; margin: 0 0 4pt 0; text-transform: uppercase; }
    .number { text-align: center; margin: 0 0 24pt 0; }
    .recipient, .body-copy, .footer-note { margin-top: 14pt; }
    .identity, .incident { margin: 12pt 0; border-collapse: collapse; width: 100%; }
    .identity td, .incident td { padding: 2pt 0; vertical-align: top; }
    .label { width: 150pt; }
    .separator { width: 14pt; text-align: center; }
    .section-title { margin-top: 16pt; font-weight: bold; text-transform: uppercase; border-bottom: 1pt solid #000; padding-bottom: 3pt; }
    .chronology p { margin: 0 0 8pt 0; text-align: justify; }
    .signature { margin-top: 26pt; margin-left: 55%; text-align: left; }
    .signature-space { height: 42pt; }
    .brand { margin-top: 28pt; padding-top: 8pt; border-top: 1pt solid #999; font-size: 10pt; color: #555; text-align: center; }
  </style>
</head>
<body>
  <div class="Section1">
    <h1>Surat Kronologis Penipuan</h1>
    <p class="number">No: ${escapeHtml(reportNumber)}</p>

    <div class="recipient">
      <p>Kepada Yth.<br />Pimpinan Cabang Bank ${destinationBank}<br />di Tempat</p>
    </div>

    <p>Dengan hormat,</p>
    <p>Saya yang bertanda tangan di bawah ini:</p>

    <table class="identity">
      <tr><td class="label">Nama</td><td class="separator">:</td><td>${fullName}</td></tr>
      <tr><td class="label">NIK</td><td class="separator">:</td><td>${escapeHtml(form.nik || "-")}</td></tr>
      <tr><td class="label">Alamat</td><td class="separator">:</td><td>${escapeHtml(form.address || "[Alamat]")}</td></tr>
      <tr><td class="label">No. HP</td><td class="separator">:</td><td>${escapeHtml(form.phone || "[Nomor Telepon]")}</td></tr>
    </table>

    <p>Dengan ini melaporkan bahwa saya telah menjadi korban penipuan online dengan kronologi sebagai berikut:</p>

    <p class="section-title">Kronologi Kejadian</p>
    <table class="incident">
      <tr><td class="label">Tanggal &amp; Waktu</td><td class="separator">:</td><td>${escapeHtml(formatDateTime(form.incidentDateTime))}</td></tr>
      <tr><td class="label">Jenis Penipuan</td><td class="separator">:</td><td>${escapeHtml(form.fraudType || "[Kategori]")}</td></tr>
      <tr><td class="label">Jumlah Kerugian</td><td class="separator">:</td><td>Rp ${escapeHtml(formatRupiah(form.amount))}</td></tr>
      <tr><td class="label">Bank Pengirim</td><td class="separator">:</td><td>${escapeHtml(form.sourceBank || "[Bank]")} - Rek. ${escapeHtml(form.sourceAccount || "[Nomor Rekening]")}</td></tr>
      <tr><td class="label">Bank Tujuan</td><td class="separator">:</td><td>${destinationBank} - Rek. ${escapeHtml(form.destinationAccount || "[Nomor Rekening]")}<br />a.n. ${escapeHtml(form.destinationOwner || "[Nama Pemilik]")}</td></tr>
    </table>

    <p><strong>Uraian Kejadian:</strong></p>
    <div class="chronology">${paragraphize(chronology)}</div>

    <p class="body-copy">Berdasarkan hal tersebut, saya mohon kepada pihak Bank untuk segera melakukan pemblokiran/pembekuan rekening tujuan guna mencegah penarikan dana oleh pelaku penipuan.</p>
    <p>Demikian surat kronologis ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.</p>

    <div class="signature">
      <p>${city}, ${escapeHtml(formatToday())}<br />Yang membuat pernyataan,</p>
      <div class="signature-space">&nbsp;</div>
      <p>________________________<br />${fullName}</p>
      <p>Meterai Rp 10.000<br />(tempel di sini)</p>
    </div>

    <p class="brand">Dokumen ini dibuat menggunakan AmanKlik AI<br />https://amanklik-575126371408.asia-southeast1.run.app</p>
  </div>
</body>
</html>`;
}

function buildWordFileName(reportNumber: string) {
  const safeReportNumber = reportNumber.replace(/[^\w-]+/g, "-").replace(/-+/g, "-");
  return `surat-kronologis-penipuan-${safeReportNumber}.doc`;
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

const inputClass = "w-full rounded-xl border border-slate-700/40 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20";
const labelClass = "mb-1.5 block text-sm text-slate-400";

export default function ReportGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [reportNumber] = useState(generateReportNumber);
  const [copied, setCopied] = useState(false);
  const [wordDownloaded, setWordDownloaded] = useState(false);
  const [form, setForm] = useState<ReportForm>({
    fullName: "",
    nik: "",
    address: "",
    city: "",
    phone: "",
    fraudType: fraudTypes[0],
    sourceBank: "BCA",
    sourceAccount: "",
    destinationBank: "BRI",
    destinationAccount: "",
    destinationOwner: "",
    amount: "",
    incidentDateTime: getLocalDateTimeValue(),
    chronology: "",
  });

  const reportText = useMemo(() => buildReportText(form, reportNumber), [form, reportNumber]);

  const updateField = (field: keyof ReportForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(false);
    setWordDownloaded(false);
  };

  const isStepValid = useMemo(() => {
    if (currentStep === 0) {
      return Boolean(form.fullName.trim() && form.address.trim() && form.city.trim() && form.phone.trim());
    }
    if (currentStep === 1) {
      return Boolean(
        form.fraudType &&
          form.sourceBank &&
          form.sourceAccount.trim() &&
          form.destinationBank &&
          form.destinationAccount.trim() &&
          form.amount.trim() &&
          form.incidentDateTime
      );
    }
    if (currentStep === 2) {
      return form.chronology.trim().length >= 20;
    }
    return true;
  }, [currentStep, form]);

  const goNext = () => {
    if (currentStep < formSteps.length - 1 && isStepValid) {
      setCurrentStep((step) => step + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const useChronologyTemplate = () => {
    const template = `Pada tanggal ${formatDateTime(form.incidentDateTime)}, saya melakukan komunikasi dengan pihak yang mengaku sebagai penjual atau perwakilan layanan melalui media online. Pelaku meminta saya melakukan transfer dana sebesar Rp ${formatRupiah(form.amount)} ke rekening ${form.destinationBank} nomor ${form.destinationAccount || "[nomor rekening]"} atas nama ${form.destinationOwner || "[nama pemilik]"}.

Setelah dana saya transfer dari rekening ${form.sourceBank} nomor ${form.sourceAccount || "[nomor rekening pengirim]"}, pihak tersebut tidak memberikan barang/jasa yang dijanjikan dan sulit dihubungi. Saya kemudian menyadari bahwa transaksi tersebut diduga merupakan penipuan online.

Sebagai bukti, saya menyimpan bukti transfer, percakapan, profil akun/nomor pelaku, serta informasi rekening tujuan.`;
    updateField("chronology", template);
  };

  const copyReport = async () => {
    const copiedSuccessfully = await copyTextToClipboard(reportText);
    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      setCopied(false);
    }
  };

  const printReport = () => {
    window.print();
  };

  const downloadWordDocument = () => {
    const html = buildWordDocumentHtml(form, reportNumber);
    const blob = new Blob([html], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = buildWordFileName(reportNumber);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setWordDownloaded(true);
    window.setTimeout(() => setWordDownloaded(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="liquid-glass rounded-2xl p-5 md:p-8"
    >
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .report-print-area, .report-print-area * { visibility: visible !important; }
          .report-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
            padding: 32px !important;
            font-family: "Times New Roman", serif !important;
            font-size: 12pt !important;
          }
        }
      `}</style>

      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-md" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-950/70">
              <ReportIcon className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="section-label shiny-text">GENERATOR SURAT</p>
            <h3 className="mt-3 text-2xl font-[Sora,sans-serif] font-medium text-white">Surat kronologis siap cetak</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">Data hanya diproses di browser Anda. Surat ini bisa disalin ke Word atau dicetak untuk bank dan laporan polisi.</p>
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.15fr]">
        <div>
          <div className="mb-6 grid grid-cols-4 gap-2">
            {formSteps.map((step, index) => {
              const isActive = currentStep === index;
              const isDone = currentStep > index;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                  className={`rounded-xl border px-2 py-3 text-center transition ${
                    isActive
                      ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-100"
                      : isDone
                        ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-100"
                        : "border-slate-700/30 bg-slate-900/35 text-slate-500"
                  }`}
                >
                  <span className="block text-xs font-bold">{index + 1}</span>
                  <span className="mt-1 block truncate text-[11px] font-semibold">{step}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-700/30 bg-slate-950/35 p-5">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="step-1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
                  <div>
                    <label className={labelClass}>Nama lengkap</label>
                    <input className={inputClass} value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} placeholder="Nama sesuai KTP" />
                  </div>
                  <div>
                    <label className={labelClass}>NIK (opsional)</label>
                    <input className={inputClass} value={form.nik} onChange={(event) => updateField("nik", event.target.value)} placeholder="16 digit NIK" />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat</label>
                    <textarea className={`${inputClass} min-h-24 resize-none`} value={form.address} onChange={(event) => updateField("address", event.target.value)} placeholder="Alamat domisili lengkap" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Kota</label>
                      <input className={inputClass} value={form.city} onChange={(event) => updateField("city", event.target.value)} placeholder="Jakarta" />
                    </div>
                    <div>
                      <label className={labelClass}>Nomor telepon</label>
                      <input className={inputClass} value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="08xxxxxxxxxx" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div key="step-2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
                  <div>
                    <label className={labelClass}>Jenis penipuan</label>
                    <select className={inputClass} value={form.fraudType} onChange={(event) => updateField("fraudType", event.target.value)}>
                      {fraudTypes.map((fraudType) => (
                        <option key={fraudType} value={fraudType} className="bg-slate-950 text-white">{fraudType}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Bank pengirim</label>
                      <select className={inputClass} value={form.sourceBank} onChange={(event) => updateField("sourceBank", event.target.value)}>
                        {bankOptions.map((bank) => (
                          <option key={bank} value={bank} className="bg-slate-950 text-white">{bank}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Rekening pengirim</label>
                      <input className={inputClass} value={form.sourceAccount} onChange={(event) => updateField("sourceAccount", event.target.value)} placeholder="Nomor rekening Anda" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Bank tujuan</label>
                      <select className={inputClass} value={form.destinationBank} onChange={(event) => updateField("destinationBank", event.target.value)}>
                        {bankOptions.map((bank) => (
                          <option key={bank} value={bank} className="bg-slate-950 text-white">{bank}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Rekening tujuan</label>
                      <input className={inputClass} value={form.destinationAccount} onChange={(event) => updateField("destinationAccount", event.target.value)} placeholder="Nomor rekening pelaku" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Nama pemilik rekening tujuan (jika diketahui)</label>
                    <input className={inputClass} value={form.destinationOwner} onChange={(event) => updateField("destinationOwner", event.target.value)} placeholder="Nama yang muncul saat transfer" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Jumlah kerugian</label>
                      <input className={inputClass} value={form.amount} onChange={(event) => updateField("amount", event.target.value.replace(/[^\d]/g, ""))} placeholder="2500000" inputMode="numeric" />
                      <p className="mt-1 text-xs text-slate-500">Preview: Rp {formatRupiah(form.amount)}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Tanggal dan waktu kejadian</label>
                      <input className={inputClass} type="datetime-local" value={form.incidentDateTime} onChange={(event) => updateField("incidentDateTime", event.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step-3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <label className={labelClass}>Kronologi kejadian</label>
                      <p className="text-xs text-slate-500">Tuliskan runtut: awal kontak, alasan transfer, rekening tujuan, dan kondisi setelah transfer.</p>
                    </div>
                    <button type="button" onClick={useChronologyTemplate} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15">
                      Pakai template
                    </button>
                  </div>
                  <textarea className={`${inputClass} min-h-72 resize-none leading-relaxed`} value={form.chronology} onChange={(event) => updateField("chronology", event.target.value)} placeholder="Tuliskan kronologi penipuan secara jelas..." />
                  <p className={`text-xs ${form.chronology.trim().length >= 20 ? "text-emerald-300" : "text-yellow-300"}`}>Minimal 20 karakter agar surat cukup jelas.</p>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step-4" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="space-y-4">
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <p className="text-sm font-semibold text-emerald-100">Surat siap disalin, dicetak, atau diunduh sebagai Word.</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">Periksa kembali nomor rekening, nominal, dan nama sebelum menyerahkan ke bank atau polisi.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={copyReport} className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15">
                      {copied ? "Teks tersalin" : "Salin teks surat"}
                    </button>
                    <button type="button" onClick={downloadWordDocument} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15">
                      {wordDownloaded ? "Word terunduh" : "Download Word"}
                    </button>
                    <button type="button" onClick={printReport} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                      Cetak surat
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-700/30 pt-5">
              <button type="button" onClick={goBack} disabled={currentStep === 0} className="rounded-xl border border-slate-700/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-600 disabled:cursor-not-allowed disabled:opacity-40">
                Sebelumnya
              </button>
              <button type="button" onClick={goNext} disabled={currentStep === formSteps.length - 1 || !isStepValid} className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-white">Preview surat</p>
            <span className="rounded-full border border-slate-700/40 bg-slate-900/50 px-3 py-1 text-xs text-slate-400">{reportNumber}</span>
          </div>
          <pre className="report-print-area max-h-[760px] overflow-auto whitespace-pre-wrap rounded-xl border border-slate-700/30 bg-slate-950/80 p-5 font-mono text-sm leading-relaxed text-slate-300">
            {reportText}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}


