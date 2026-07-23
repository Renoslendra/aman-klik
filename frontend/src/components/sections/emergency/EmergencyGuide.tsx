"use client";

import { useId, useMemo, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Urgency = "critical" | "high" | "medium";
type InfoType = "positive" | "info" | "warning" | "danger";
type ResourceType = "phone" | "link" | "youtube";

type Resource = {
  type: ResourceType;
  label: string;
  url: string;
};

type EmergencyStep = {
  title: string;
  detail: string;
  urgency: Urgency;
  resources?: Resource[];
};

type Scenario = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  shortLabel: string;
  urgency: Urgency;
  urgencyLabel: string;
  infoBox: {
    type: InfoType;
    title: string;
    content: string;
  };
  steps: EmergencyStep[];
  youtubeLinks: Resource[];
  whatsappTemplate?: string;
};

function useGradientId(prefix: string) {
  return `${prefix}-${useId().replace(/:/g, "")}`;
}

function CyberLinkIcon({ className }: { className?: string }) {
  const gradientId = useGradientId("emergencyLinkGrad");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberKeyIcon({ className }: { className?: string }) {
  const gradientId = useGradientId("emergencyKeyGrad");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="16" r="5" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="8" cy="16" r="2" fill="#0891b2" />
      <path d="M11.5 12.5L20 4M16 8L18.5 10.5M18.5 5.5L21 8" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CyberBanknoteIcon({ className }: { className?: string }) {
  const gradientId = useGradientId("emergencyBankGrad");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect x="2" y="5" width="20" height="14" rx="2" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" stroke="#e0f7fa" strokeWidth="1.5" />
      <path d="M6 12H6.01M18 12H18.01" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CyberUserXIcon({ className }: { className?: string }) {
  const gradientId = useGradientId("emergencyUserGrad");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="7" r="4" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M3 20C3 16.7 5.7 15 9 15C10.5 15 11.8 15.4 12.8 16.1" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 14L22 20M22 14L16 20" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function CyberShareIcon({ className }: { className?: string }) {
  const gradientId = useGradientId("emergencyShareGrad");
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="5" r="3" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" fill={`url(#${gradientId})`} stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M8.6 13.5L15.4 17.5M15.4 6.5L8.6 10.5" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const scenarios: Scenario[] = [
  {
    id: "link",
    icon: CyberLinkIcon,
    label: "Saya sudah klik link mencurigakan",
    shortLabel: "Klik link",
    urgency: "high",
    urgencyLabel: "TINGGI - Tindakan dalam 30 menit",
    infoBox: {
      type: "info",
      title: "Kabar baik",
      content: "Jika Anda hanya mengklik link tetapi tidak memasukkan password, OTP, PIN, atau data pribadi, risiko biasanya lebih rendah. Tetap lakukan pengamanan dasar.",
    },
    steps: [
      { title: "Putuskan koneksi internet", detail: "Matikan WiFi dan data seluler di perangkat yang digunakan untuk membuka link. Ini mengurangi risiko pengiriman data dari halaman berbahaya.", urgency: "critical" },
      { title: "Jangan masukkan data apapun", detail: "Jika halaman phishing masih terbuka, tutup browser tanpa mengisi formulir, mengunduh file, atau menekan tombol lanjutan.", urgency: "critical" },
      { title: "Ganti password akun terkait", detail: "Jika link meniru halaman bank, email, marketplace, atau media sosial, ganti password dari perangkat lain yang aman.", urgency: "high" },
      { title: "Periksa aktivitas login terbaru", detail: "Cek Gmail Security, Instagram Login Activity, Facebook Where You Are Logged In, atau halaman keamanan platform terkait.", urgency: "high" },
      { title: "Scan perangkat", detail: "Android: jalankan Google Play Protect. iPhone: cek Safety Check dan profil perangkat. Laptop: jalankan Windows Security atau pemindai tepercaya.", urgency: "medium" },
      { title: "Hapus cache dan cookies browser", detail: "Buka pengaturan privasi browser lalu hapus browsing data dari semua waktu untuk mengurangi sisa sesi login palsu.", urgency: "medium" },
      { title: "Aktifkan 2FA", detail: "Prioritaskan email, mobile banking, marketplace, dan media sosial. Gunakan aplikasi authenticator bila tersedia.", urgency: "medium" },
      { title: "Laporkan link phishing", detail: "Laporkan URL berbahaya ke Google Safe Browsing agar pengguna lain ikut terlindungi.", urgency: "medium", resources: [{ type: "link", label: "Google Safe Browsing", url: "https://safebrowsing.google.com/safebrowsing/report_phish/" }] },
    ],
    youtubeLinks: [
      { type: "youtube", title: "Cara cek HP terkena malware", label: "Cara cek HP terkena malware", url: "https://www.youtube.com/results?search_query=cara+cek+hp+kena+malware+indonesia" } as Resource,
      { type: "youtube", title: "Tutorial aktifkan 2FA", label: "Tutorial aktifkan 2FA", url: "https://www.youtube.com/results?search_query=cara+aktifkan+2fa+google+authenticator" } as Resource,
    ],
  },
  {
    id: "otp",
    icon: CyberKeyIcon,
    label: "Saya sudah kirim OTP ke orang lain",
    shortLabel: "OTP bocor",
    urgency: "critical",
    urgencyLabel: "KRITIS - Tindakan dalam 15 menit",
    infoBox: {
      type: "danger",
      title: "Peringatan serius",
      content: "OTP adalah kunci transaksi. Jika OTP sudah diberikan, anggap akun terkait sedang terancam dan segera minta pemblokiran sementara.",
    },
    steps: [
      { title: "Hubungi call center bank sekarang", detail: "Minta blokir sementara transaksi dan jelaskan bahwa OTP sudah bocor. Catat nomor tiket laporan.", urgency: "critical", resources: [{ type: "phone", label: "BRI 14017", url: "tel:14017" }, { type: "phone", label: "BCA 1500888", url: "tel:1500888" }, { type: "phone", label: "Mandiri 14000", url: "tel:14000" }, { type: "phone", label: "BNI 1500046", url: "tel:1500046" }] },
      { title: "Blokir kartu terkait", detail: "Minta bank memblokir kartu debit, kredit, dan kartu virtual yang terhubung bila ada indikasi penyalahgunaan.", urgency: "critical" },
      { title: "Ganti PIN dan password mobile banking", detail: "Jika masih bisa login, ubah PIN, password, dan metode verifikasi dari perangkat aman.", urgency: "critical" },
      { title: "Cabut akses perangkat asing", detail: "Buka pengaturan keamanan aplikasi dan logout dari semua sesi atau perangkat yang tidak dikenal.", urgency: "high" },
      { title: "Amankan email terdaftar", detail: "Ganti password email yang terhubung ke bank. Email sering dipakai untuk pemulihan akun.", urgency: "high" },
      { title: "Cek e-wallet dan marketplace", detail: "Periksa DANA, OVO, GoPay, Tokopedia, Shopee, dan akun lain yang memakai nomor HP atau email yang sama.", urgency: "medium" },
      { title: "Datangi kantor cabang", detail: "Bawa KTP asli dan bukti komunikasi untuk verifikasi ulang serta meminta pengamanan lanjutan.", urgency: "medium" },
    ],
    youtubeLinks: [{ type: "youtube", label: "Cara blokir kartu ATM dari HP", url: "https://www.youtube.com/results?search_query=cara+blokir+kartu+atm+dari+hp" }],
  },
  {
    id: "transfer",
    icon: CyberBanknoteIcon,
    label: "Saya sudah transfer uang ke penipu",
    shortLabel: "Sudah transfer",
    urgency: "critical",
    urgencyLabel: "KRITIS - Setiap menit sangat berharga",
    infoBox: {
      type: "positive",
      title: "Dana masih mungkin dibekukan",
      content: "Peluang terbaik ada pada 15-60 menit pertama, selama dana belum ditarik pelaku. Fokus pada bank pengirim, bank penerima, dan bukti transaksi.",
    },
    steps: [
      { title: "Telepon bank pengirim sekarang", detail: "Sampaikan: saya korban penipuan online, baru transfer dana, mohon bantu koordinasi blokir atau hold fund rekening tujuan. Catat nomor tiket.", urgency: "critical", resources: [{ type: "phone", label: "BRI 14017", url: "tel:14017" }, { type: "phone", label: "BCA 1500888", url: "tel:1500888" }, { type: "phone", label: "Mandiri 14000", url: "tel:14000" }, { type: "phone", label: "BNI 1500046", url: "tel:1500046" }, { type: "phone", label: "BSI 14040", url: "tel:14040" }] },
      { title: "Telepon bank penerima jika diketahui", detail: "Jika rekening penipu berada di bank berbeda, hubungi juga bank penerima untuk mempercepat penandaan rekening tujuan.", urgency: "critical" },
      { title: "Screenshot semua bukti", detail: "Simpan bukti transfer, chat, profil penipu, nomor rekening, nama pemilik rekening, iklan, resi, dan link yang digunakan.", urgency: "critical" },
      { title: "Laporkan rekening ke CekRekening", detail: "Masukkan nomor rekening atau e-wallet pelaku di portal resmi CekRekening agar tercatat sebagai indikasi tindak pidana.", urgency: "high", resources: [{ type: "link", label: "Buka CekRekening", url: "https://cekrekening.id" }] },
      { title: "Buat laporan siber online", detail: "Gunakan kanal pengaduan siber Polri dan unggah bukti yang sudah dikumpulkan.", urgency: "high", resources: [{ type: "link", label: "Buka Patroli Siber", url: "https://patrolisiber.id" }] },
      { title: "Jangan hubungi penipu lagi", detail: "Komunikasi lanjutan bisa membuka peluang penipuan berlapis. Setelah bukti tersimpan, blokir akun atau nomor pelaku.", urgency: "medium" },
      { title: "Siapkan surat kronologis", detail: "Gunakan tab Generator Surat untuk membuat kronologi yang bisa dibawa ke bank atau kantor polisi.", urgency: "medium" },
      { title: "Datangi kantor polisi", detail: "Bawa KTP, bukti transfer, bukti chat, nomor tiket bank, dan surat kronologis untuk mendapatkan laporan resmi.", urgency: "medium" },
    ],
    youtubeLinks: [
      { type: "youtube", label: "Cara lapor penipuan transfer online", url: "https://www.youtube.com/results?search_query=cara+lapor+penipuan+transfer+online+ke+bank" },
      { type: "youtube", label: "Cara membuat laporan polisi penipuan online", url: "https://www.youtube.com/results?search_query=cara+membuat+laporan+polisi+penipuan+online" },
    ],
  },
  {
    id: "akun",
    icon: CyberUserXIcon,
    label: "Akun saya diambil alih",
    shortLabel: "Akun diretas",
    urgency: "high",
    urgencyLabel: "TINGGI - Amankan hari ini",
    infoBox: {
      type: "info",
      title: "Sebagian besar akun bisa dipulihkan",
      content: "Peluang pulih lebih tinggi jika email, nomor HP, dan bukti identitas masih Anda kuasai. Kerjakan pemulihan dari perangkat yang bersih.",
    },
    steps: [
      { title: "Jalankan pemulihan resmi platform", detail: "Gunakan halaman recovery resmi, bukan link dari DM atau iklan. Hindari jasa pemulihan tidak resmi.", urgency: "critical", resources: [{ type: "link", label: "Google Recovery", url: "https://accounts.google.com/signin/recovery" }, { type: "link", label: "Facebook Hacked", url: "https://www.facebook.com/hacked" }, { type: "link", label: "X Help", url: "https://help.x.com/forms/hacked" }] },
      { title: "Ganti password email utama", detail: "Email adalah pusat pemulihan. Ganti password, cek perangkat login, dan aktifkan 2FA.", urgency: "critical" },
      { title: "Cabut sesi perangkat asing", detail: "Di pengaturan keamanan, keluarkan perangkat yang tidak dikenal dan hapus aplikasi pihak ketiga mencurigakan.", urgency: "high" },
      { title: "Periksa email dan nomor pemulihan", detail: "Hapus email, nomor HP, atau metode pemulihan yang ditambahkan pelaku.", urgency: "high" },
      { title: "Beri tahu kontak dekat", detail: "Kirim peringatan singkat bahwa akun sempat diretas agar kontak tidak menuruti permintaan uang atau OTP.", urgency: "high" },
      { title: "Laporkan akun palsu atau aktivitas pelaku", detail: "Gunakan fitur report platform untuk menghapus postingan, pesan, atau akun tiruan.", urgency: "medium" },
      { title: "Simpan bukti aktivitas", detail: "Screenshot postingan, chat, perubahan email, dan notifikasi login sebagai bukti bila ada kerugian finansial.", urgency: "medium" },
    ],
    youtubeLinks: [
      { type: "youtube", label: "Cara mengembalikan akun Instagram diretas", url: "https://www.youtube.com/results?search_query=cara+mengembalikan+akun+instagram+di+hack" },
      { type: "youtube", label: "Cara amankan akun Google", url: "https://www.youtube.com/results?search_query=cara+amankan+akun+google+dari+hacker" },
    ],
  },
  {
    id: "keluarga",
    icon: CyberShareIcon,
    label: "Saya ingin mengingatkan keluarga",
    shortLabel: "Ingatkan keluarga",
    urgency: "medium",
    urgencyLabel: "PENTING - Cegah korban berikutnya",
    infoBox: {
      type: "positive",
      title: "Pencegahan paling efektif dimulai dari keluarga",
      content: "Kirim pesan singkat, jelas, dan tidak menakut-nakuti. Fokus pada larangan membagikan OTP, PIN, dan data pribadi.",
    },
    steps: [
      { title: "Kirim peringatan singkat", detail: "Gunakan bahasa keluarga yang mudah dipahami. Hindari istilah teknis yang membingungkan.", urgency: "high" },
      { title: "Tekankan aturan OTP dan PIN", detail: "Tidak ada pegawai bank, kurir, polisi, admin marketplace, atau keluarga yang boleh meminta OTP dan PIN.", urgency: "high" },
      { title: "Minta mereka konfirmasi sebelum transfer", detail: "Buat aturan keluarga: setiap permintaan uang mendadak harus diverifikasi lewat telepon atau video call.", urgency: "high" },
      { title: "Ajari cek link dan nomor", detail: "Minta keluarga tidak membuka APK, link pendek, atau file dari nomor tidak dikenal.", urgency: "medium" },
      { title: "Simpan kontak resmi bank", detail: "Pastikan keluarga tahu nomor resmi bank utama dan tidak mencari call center dari iklan mesin pencari.", urgency: "medium" },
      { title: "Aktifkan 2FA bersama-sama", detail: "Bantu orang tua atau anggota keluarga mengaktifkan 2FA untuk email, WhatsApp, dan akun keuangan.", urgency: "medium" },
    ],
    youtubeLinks: [{ type: "youtube", label: "Edukasi penipuan digital untuk keluarga", url: "https://www.youtube.com/results?search_query=edukasi+penipuan+digital+keluarga+indonesia" }],
    whatsappTemplate: "Keluarga, hati-hati penipuan online. Jangan pernah berikan OTP, PIN, password, atau foto KTP ke siapa pun, termasuk yang mengaku bank, kurir, polisi, atau admin aplikasi. Kalau ada yang minta transfer mendadak, telepon langsung orangnya dulu sebelum kirim uang. Jangan instal file APK dari chat dan jangan klik link pendek dari nomor asing.",
  },
];

const urgencyClass: Record<Urgency, string> = {
  critical: "bg-red-500/10 border-red-500/30 text-red-300",
  high: "bg-orange-500/10 border-orange-500/30 text-orange-300",
  medium: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
};

const infoClass: Record<InfoType, string> = {
  positive: "bg-emerald-500/10 border-emerald-500/25 text-emerald-100",
  info: "bg-cyan-500/10 border-cyan-500/25 text-cyan-100",
  warning: "bg-yellow-500/10 border-yellow-500/25 text-yellow-100",
  danger: "bg-red-500/10 border-red-500/25 text-red-100",
};

function formatScenarioForCopy(scenario: Scenario) {
  const steps = scenario.steps.map((step, index) => `${index + 1}. ${step.title}\n   ${step.detail}`).join("\n\n");
  const resources = [
    ...scenario.steps.flatMap((step) => step.resources || []),
    ...scenario.youtubeLinks,
  ];
  const resourceText = resources.length > 0 ? `\n\nLink dan kontak:\n${resources.map((resource) => `- ${resource.label}: ${resource.url}`).join("\n")}` : "";

  return `${scenario.label}\n${scenario.urgencyLabel}\n\n${scenario.infoBox.title}: ${scenario.infoBox.content}\n\nLangkah darurat:\n${steps}${resourceText}`;
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

export default function EmergencyGuide() {
  const [activeScenarioId, setActiveScenarioId] = useState("transfer");
  const [openStep, setOpenStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeScenarioId) || scenarios[0],
    [activeScenarioId]
  );

  const Icon = activeScenario.icon;

  const handleScenarioClick = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setOpenStep(0);
    setCopied(false);
  };

  const handleCopy = async () => {
    const copiedSuccessfully = await copyTextToClipboard(formatScenarioForCopy(activeScenario));
    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } else {
      setCopied(false);
    }
  };

  const handleShareWhatsApp = () => {
    const message = activeScenario.whatsappTemplate || formatScenarioForCopy(activeScenario);
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="liquid-glass rounded-2xl p-5 md:p-8"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <div className="mb-5">
            <p className="section-label shiny-text">PANDUAN INTERAKTIF</p>
            <h3 className="mt-3 text-xl font-[Sora,sans-serif] font-medium text-white">Pilih kondisi yang paling dekat</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">Prioritaskan langkah dengan label kritis, lalu lanjutkan ke bukti dan pelaporan.</p>
          </div>

          <div className="flex flex-col gap-3">
            {scenarios.map((scenario) => {
              const ScenarioIcon = scenario.icon;
              const isActive = scenario.id === activeScenario.id;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleScenarioClick(scenario.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-100"
                      : "border-slate-700/30 bg-slate-900/30 text-slate-300 hover:border-slate-600/60"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${isActive ? "border-cyan-500/30 bg-cyan-500/10" : "border-slate-700/50 bg-slate-950/40"}`}>
                    <ScenarioIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{scenario.label}</span>
                    <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[11px] ${urgencyClass[scenario.urgency]}`}>
                      {scenario.shortLabel}
                    </span>
                  </span>
                  <ChevronIcon className={`h-4 w-4 text-slate-500 transition-transform ${isActive ? "-rotate-90 text-cyan-300" : ""}`} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <div className="rounded-2xl border border-slate-700/30 bg-slate-950/35 p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-950/70">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${urgencyClass[activeScenario.urgency]} ${activeScenario.urgency === "critical" ? "animate-pulse" : ""}`}>
                    {activeScenario.urgencyLabel}
                  </span>
                  <h3 className="mt-3 text-2xl font-[Sora,sans-serif] font-medium leading-tight text-white">{activeScenario.label}</h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/15"
                >
                  {copied ? "Tersalin" : "Salin langkah"}
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
                >
                  Bagikan WA
                </button>
              </div>
            </div>

            <div className={`mt-5 rounded-xl border p-4 ${infoClass[activeScenario.infoBox.type]}`}>
              <p className="text-sm font-semibold">{activeScenario.infoBox.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{activeScenario.infoBox.content}</p>
            </div>

            <div className="mt-5 space-y-3">
              {activeScenario.steps.map((step, index) => {
                const isOpen = openStep === index;

                return (
                  <div key={`${activeScenario.id}-${step.title}`} className="overflow-hidden rounded-xl border border-slate-700/30 bg-slate-900/35">
                    <button
                      type="button"
                      onClick={() => setOpenStep(isOpen ? -1 : index)}
                      className="flex w-full items-start gap-3 p-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${urgencyClass[step.urgency]}`}>
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-white">{step.title}</span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-slate-500">{step.urgency === "critical" ? "Kritis" : step.urgency === "high" ? "Tinggi" : "Lanjutkan"}</span>
                      </span>
                      <ChevronIcon className={`mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pl-[4.25rem]">
                            <p className="text-sm leading-relaxed text-slate-300">{step.detail}</p>
                            {step.resources && step.resources.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {step.resources.map((resource) => (
                                  <a
                                    key={resource.url}
                                    href={resource.url}
                                    target={resource.type === "phone" ? undefined : "_blank"}
                                    rel={resource.type === "phone" ? undefined : "noopener noreferrer"}
                                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                                      resource.type === "phone"
                                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15"
                                        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/15"
                                    }`}
                                  >
                                    {resource.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-slate-700/30 bg-slate-950/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Referensi video</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeScenario.youtubeLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/15"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}


