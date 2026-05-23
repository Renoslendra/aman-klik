import Link from "next/link";

export const metadata = {
  title: "404 — AmanKlik AI",
};

function CrackedShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shield404Grad" x1="12" y1="6" x2="84" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <path
        d="M48 6C30 6 15 12 12 15V50C12 71 27 84 48 90C69 84 84 71 84 50V15C81 12 66 6 48 6Z"
        fill="url(#shield404Grad)"
        fillOpacity="0.12"
        stroke="url(#shield404Grad)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M49 18L40 39H53L45 76"
        stroke="#67e8f9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 27L68 69" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.75" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#060B18] px-6 py-24">
      <div className="text-center">
        <CrackedShieldIcon className="mx-auto mb-8 h-24 w-24 drop-shadow-[0_0_28px_rgba(34,211,238,0.22)]" />
        <p className="text-8xl font-bold font-[Sora,sans-serif] text-gradient-trust">404</p>
        <h1 className="mt-6 text-xl text-slate-300 font-[Sora,sans-serif]">Halaman tidak ditemukan</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-slate-500">
          Link ini mungkin sudah kedaluwarsa atau halaman tidak tersedia.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:brightness-110 active:scale-[0.97]"
          style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
