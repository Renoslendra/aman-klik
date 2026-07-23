"use client";

import { useEffect } from "react";
import Link from "next/link";

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="errorWarningGrad" x1="12" y1="8" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#d97706" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        d="M48 10L88 80H8L48 10Z"
        fill="url(#errorWarningGrad)"
        fillOpacity="0.16"
        stroke="url(#errorWarningGrad)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M48 34V54" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <circle cx="48" cy="66" r="3.5" fill="#fbbf24" />
    </svg>
  );
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#060B18] px-6 text-center">
      <WarningIcon className="mb-8 h-20 w-20 drop-shadow-[0_0_28px_rgba(251,191,36,0.18)]" />
      <h1 className="text-2xl font-bold text-white font-[Sora,sans-serif]">Terjadi kesalahan</h1>
      <p className="mt-3 text-sm text-slate-400">Maaf, terjadi kesalahan yang tidak terduga.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:brightness-110 active:scale-[0.97]"
          style={{ boxShadow: "0 0 30px hsl(189 100% 50% / 0.25)" }}
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="liquid-glass rounded-xl px-6 py-3 text-sm font-semibold text-white border border-slate-700/50 transition-colors hover:border-cyan-500/30 hover:text-cyan-300"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}


