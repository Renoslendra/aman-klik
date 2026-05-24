"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type ContactCategory = "bank" | "ewallet" | "govt";

type EmergencyContact = {
  name: string;
  phone?: string;
  tel?: string;
  category: ContactCategory;
  website?: string;
  hours: string;
};

const contacts: EmergencyContact[] = [
  { name: "BRI", phone: "14017 / 1500017", tel: "14017", category: "bank", website: "https://bri.co.id", hours: "24 Jam" },
  { name: "BCA", phone: "1500888", tel: "1500888", category: "bank", website: "https://www.bca.co.id", hours: "24 Jam" },
  { name: "Mandiri", phone: "14000", tel: "14000", category: "bank", website: "https://www.bankmandiri.co.id", hours: "24 Jam" },
  { name: "BNI", phone: "1500046", tel: "1500046", category: "bank", website: "https://www.bni.co.id", hours: "24 Jam" },
  { name: "BSI", phone: "14040", tel: "14040", category: "bank", website: "https://www.bankbsi.co.id", hours: "24 Jam" },
  { name: "DANA", phone: "1500445", tel: "1500445", category: "ewallet", website: "https://www.dana.id", hours: "24 Jam" },
  { name: "OVO", phone: "1500696", tel: "1500696", category: "ewallet", website: "https://www.ovo.id/contact", hours: "24 Jam" },
  { name: "GoPay", phone: "1500729", tel: "1500729", category: "ewallet", website: "https://gopay.co.id/support", hours: "24 Jam" },
  { name: "OJK", phone: "157", tel: "157", category: "govt", website: "https://kontak157.ojk.go.id", hours: "Hari kerja dan kanal online" },
  { name: "Patroli Siber", category: "govt", website: "https://patrolisiber.id", hours: "Online 24 Jam" },
  { name: "CekRekening", category: "govt", website: "https://cekrekening.id", hours: "Online 24 Jam" },
  { name: "LAPOR!", category: "govt", website: "https://www.lapor.go.id", hours: "Online 24 Jam" },
];

const categoryLabel: Record<ContactCategory, string> = {
  bank: "Bank",
  ewallet: "E-Wallet",
  govt: "Pemerintah",
};

const categoryStyle: Record<ContactCategory, string> = {
  bank: "border-cyan-500/25 bg-cyan-500/10 text-cyan-200",
  ewallet: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
  govt: "border-yellow-500/25 bg-yellow-500/10 text-yellow-200",
};

const contactLogos: Record<string, React.ReactNode> = {
  BRI: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00529C" />
      <text x="18" y="23" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif">
        BRI
      </text>
      <rect x="27" y="11" width="3.5" height="3.5" fill="#F58220" />
    </svg>
  ),
  BCA: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00569e" />
      <circle cx="20" cy="20" r="11" fill="white" />
      <text x="20" y="22.5" dominantBaseline="middle" textAnchor="middle" fill="#00569e" fontSize="8" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.2">
        BCA
      </text>
    </svg>
  ),
  Mandiri: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#003d79" />
      <path d="M10 14 C15 11, 25 17, 30 13 C32 11, 33 12, 31 15 C27 19, 17 13, 12 17 C11 18, 9 17, 10 14 Z" fill="#F2A900" />
      <text x="20" y="26" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.3">
        mandiri
      </text>
    </svg>
  ),
  BNI: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#eef6f6" />
      <text x="15" y="22" dominantBaseline="middle" textAnchor="middle" fill="#006677" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
        BNI
      </text>
      <path d="M26 10 L32 13 L30 29 L24 26 Z" fill="#FF6600" />
      <text x="28" y="21" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold">
        46
      </text>
    </svg>
  ),
  BSI: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#006A4E" />
      <circle cx="20" cy="14" r="5" fill="#FFC72C" />
      <circle cx="22.5" cy="14" r="5" fill="#006A4E" />
      <text x="20" y="28" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
        BSI
      </text>
    </svg>
  ),
  DANA: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#118EEA" />
      <text x="20" y="22" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="950" fontFamily="system-ui, sans-serif" letterSpacing="0.2">
        DANA
      </text>
    </svg>
  ),
  OVO: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#4C2A86" />
      <circle cx="20" cy="20" r="13" stroke="#4cba72" strokeWidth="1.5" fill="none" />
      <text x="20" y="22" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
        ovo
      </text>
    </svg>
  ),
  GoPay: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#00AED6" />
      <text x="20" y="21" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" fontFamily="system-ui, sans-serif">
        gopay
      </text>
    </svg>
  ),
  OJK: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#8F1D21" />
      <path d="M20 9 L28 14 V22 C28 26 25 29 20 31 C15 29 12 26 12 22 V14 Z" stroke="#D4AF37" strokeWidth="1.2" fill="none" opacity="0.6" />
      <text x="20" y="21" dominantBaseline="middle" textAnchor="middle" fill="#D4AF37" fontSize="8" fontWeight="bold" fontFamily="system-ui, sans-serif">
        OJK
      </text>
    </svg>
  ),
  "Patroli Siber": (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1E293B" />
      <path d="M20 8 L29 12 V20 C29 25 25 29 20 31 C15 29 11 25 11 20 V12 Z" fill="#3B82F6" opacity="0.25" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="20" cy="19" r="4" fill="#EF4444" opacity="0.8" />
      <path d="M15 19 H25 M20 14 V24" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  CekRekening: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#DC2626" />
      <circle cx="20" cy="20" r="11" fill="white" />
      <rect x="14" y="16" width="12" height="7" rx="1" fill="#DC2626" />
      <circle cx="23" cy="22" r="3" stroke="#DC2626" strokeWidth="1.2" fill="white" />
      <path d="M25 25 L28 28" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "LAPOR!": (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#E11D48" />
      <text x="20" y="20" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.2">
        LAPOR!
      </text>
      <rect x="9" y="26" width="22" height="2" fill="white" />
      <rect x="9" y="24" width="22" height="2" fill="#E11D48" />
      <path d="M9 24 H31" stroke="white" strokeWidth="1" />
    </svg>
  ),
};

function DirectoryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="emergencyContactDirGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M5 4.5H19C20.1 4.5 21 5.4 21 6.5V17.5C21 18.6 20.1 19.5 19 19.5H5C3.9 19.5 3 18.6 3 17.5V6.5C3 5.4 3.9 4.5 5 4.5Z" fill="url(#emergencyContactDirGrad)" stroke="#22d3ee" strokeWidth="1.8" />
      <path d="M7.5 9H16.5M7.5 12H16.5M7.5 15H13" stroke="#e0f7fa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function EmergencyContacts() {
  const [query, setQuery] = useState("");

  const filteredContacts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return contacts;

    return contacts.filter((contact) => {
      const haystack = `${contact.name} ${contact.phone || ""} ${contact.website || ""} ${categoryLabel[contact.category]}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="mt-8 md:mt-10 liquid-glass rounded-2xl p-5 md:p-8"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative h-12 w-12 shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-md" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-950/70">
              <DirectoryIcon className="h-6 w-6" />
            </div>
          </div>
          <div>
            <p className="section-label shiny-text">DIREKTORI KONTAK</p>
            <h3 className="mt-3 text-2xl font-[Sora,sans-serif] font-medium text-white">Kontak resmi untuk kondisi darurat</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">Gunakan kanal resmi. Jangan percaya nomor call center dari iklan, komentar media sosial, atau chat tidak dikenal.</p>
          </div>
        </div>

        <label className="w-full md:max-w-xs">
          <span className="sr-only">Cari kontak darurat</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-700/40 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            placeholder="Cari bank, e-wallet, atau instansi"
          />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filteredContacts.map((contact) => (
          <div key={contact.name} className="rounded-xl border border-slate-700/30 bg-slate-900/35 p-4 transition hover:border-slate-600/60 hover:bg-slate-900/50">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  {contactLogos[contact.name] || (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800 text-xs font-bold text-slate-400">
                      {contact.name.substring(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-white leading-tight">{contact.name}</p>
                  <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${categoryStyle[contact.category]}`}>
                    {categoryLabel[contact.category]}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">{contact.hours}</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {contact.phone && contact.tel && (
                <a
                  href={`tel:${contact.tel}`}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
                >
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/15"
                >
                  Website
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
