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
              <div>
                <p className="text-base font-semibold text-white">{contact.name}</p>
                <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${categoryStyle[contact.category]}`}>
                  {categoryLabel[contact.category]}
                </span>
              </div>
              <span className="text-xs text-slate-500">{contact.hours}</span>
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
