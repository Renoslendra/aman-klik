function LoaderShieldLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ak-grad-loader" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ak-body-loader" x1="18" y1="28" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <path
        d="M32 4C20 4 10 8 8 10V34C8 48 18 56 32 60C46 56 56 48 56 34V10C54 8 44 4 32 4Z"
        fill="url(#ak-grad-loader)"
        fillOpacity="0.15"
        stroke="url(#ak-grad-loader)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M23 28V20C23 14 27 10 32 10C37 10 41 14 41 20V28" stroke="url(#ak-grad-loader)" strokeWidth="5" strokeLinecap="round" />
      <rect x="19" y="28" width="26" height="22" rx="4" fill="url(#ak-body-loader)" />
      <path d="M25.5 39L30 43.5L39 34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 46C14 52 8 48 6 42" stroke="url(#ak-grad-loader)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="6" cy="38" r="3" fill="url(#ak-grad-loader)" />
    </svg>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#060B18]">
      <LoaderShieldLogo className="h-12 w-12 animate-pulse drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]" />
      <p className="text-sm text-slate-500 mt-4">Memuat...</p>
    </main>
  );
}

