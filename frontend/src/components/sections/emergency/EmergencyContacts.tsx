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
  BRI: <img src="/images/logos/bri.svg" alt="BRI" className="h-full w-full object-contain" />,
  BCA: <img src="/images/logos/bca.svg" alt="BCA" className="h-full w-full object-contain" />,
  Mandiri: <img src="/images/logos/mandiri.svg" alt="Mandiri" className="h-full w-full object-contain" />,
  BNI: <img src="/images/logos/bni.svg" alt="BNI" className="h-full w-full object-contain bg-white rounded p-0.5" />,
  BSI: <img src="/images/logos/bsi.png" alt="BSI" className="h-full w-full object-contain" />,
  DANA: <img src="/images/logos/dana.svg" alt="DANA" className="h-full w-full object-contain" />,
  OVO: <img src="/images/logos/ovo.svg" alt="OVO" className="h-full w-full object-contain" />,
  GoPay: <img src="/images/logos/gopay.svg" alt="GoPay" className="h-full w-full object-contain" />,
  OJK: <img src="/images/logos/ojk.png" alt="OJK" className="h-full w-full object-contain" />,
  "Patroli Siber": (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dark Navy Shield Background */}
      <path d="M 20 2 L 34 8 L 34 20 C 34 28 28 35 20 38 C 12 35 6 28 6 20 L 6 8 Z" fill="#0C1B33" stroke="#D4AF37" strokeWidth="1.5" />
      {/* Inner gold border */}
      <path d="M 20 4 L 32 9 L 32 20 C 32 27 27 33 20 36 C 13 33 8 27 8 20 L 8 9 Z" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6" />
      {/* 3 Gold Stars at the top */}
      <polygon points="20,7 21,9 23,9 21.5,10.5 22,12.5 20,11 18,12.5 18.5,10.5 17,9 19,9" fill="#D4AF37" />
      <polygon points="14,8 15,10 17,10 15.5,11.5 16,13.5 14,12 12,13.5 12.5,11.5 11,10 13,10" fill="#D4AF37" transform="scale(0.8) translate(3.5, 1.5)" />
      <polygon points="26,8 27,10 29,10 27.5,11.5 28,13.5 26,12 24,13.5 24.5,11.5 23,10 25,10" fill="#D4AF37" transform="scale(0.8) translate(6.5, 1.5)" />
      {/* Garuda wings shape in the center */}
      <path d="M 12 18 C 16 16, 20 18, 20 18 C 20 18, 24 16, 28 18 C 26 22, 23 23, 20 23 C 17 23, 14 22, 12 18 Z" fill="#D4AF37" opacity="0.8" />
      {/* Red shield in the center (Polri shield) */}
      <path d="M 20 19 L 24 21 L 24 25 C 24 27 22 29 20 30 C 18 29 16 27 16 25 L 16 21 Z" fill="#C62828" stroke="#D4AF37" strokeWidth="0.8" />
      {/* Gold scale/torch inside the red shield */}
      <line x1="20" y1="21" x2="20" y2="28" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="20" cy="22" r="1.5" fill="#D4AF37" />
    </svg>
  ),
  CekRekening: (
    <svg viewBox="0 0 40 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red background circle */}
      <circle cx="20" cy="20" r="18" fill="#E52D27" />
      {/* Magnifying glass form of C */}
      <path d="M 23 13 C 17 13 13 17 13 22 C 13 27 17 31 22 31 C 26 31 29 28 30 24" stroke="white" strokeWidth="3" strokeLinecap="round" />
      {/* Magnifying glass handle */}
      <path d="M 28 26 L 33 31" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      {/* Checkmark inside */}
      <path d="M 17 21 L 20 24 L 25 18" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "LAPOR!": (
    <svg viewBox="0 0 120 40" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red rounded rectangle */}
      <rect width="120" height="40" rx="6" fill="#D22D30" />
      {/* Green badge for SP4N */}
      <rect x="6" y="8" width="32" height="24" rx="4" fill="#008A4E" />
      <text x="22" y="22.5" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif">
        SP4N
      </text>
      {/* LAPOR! text in bold white */}
      <text x="76" y="22" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="15" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
        LAPOR!
      </text>
      {/* Stylized separator line */}
      <path d="M 44 8 L 44 32" stroke="white" strokeWidth="1" opacity="0.3" />
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
