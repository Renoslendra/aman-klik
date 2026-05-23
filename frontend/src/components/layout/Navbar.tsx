"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
// -------------------------------------------------------------
// BESPOKE CUSTOM DUOTONE SVG ICONS
// -------------------------------------------------------------

function CyberShieldLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ak-grad-nav" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="ak-body-nav" x1="18" y1="28" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Outer Shield (filled) */}
      <path d="M32 4C20 4 10 8 8 10V34C8 48 18 56 32 60C46 56 56 48 56 34V10C54 8 44 4 32 4Z" fill="url(#ak-grad-nav)" fillOpacity="0.15" stroke="url(#ak-grad-nav)" strokeWidth="3" strokeLinejoin="round" />
      {/* Padlock Shackle */}
      <path d="M23 28V20C23 14 27 10 32 10C37 10 41 14 41 20V28" stroke="url(#ak-grad-nav)" strokeWidth="5" strokeLinecap="round" />
      {/* Padlock Body */}
      <rect x="19" y="28" width="26" height="22" rx="4" fill="url(#ak-body-nav)" />
      {/* Checkmark */}
      <path d="M25.5 39L30 43.5L39 34" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Click Loop */}
      <path d="M20 46C14 52 8 48 6 42" stroke="url(#ak-grad-nav)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="6" cy="38" r="3" fill="url(#ak-grad-nav)" />
    </svg>
  );
}

function CyberMenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CyberCloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84c-.62-.62-1.09-1.37-1.39-2.22z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function getAvatarUrl(avatar: string | undefined, name: string | undefined) {
  return avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name || "user")}`;
}

function AvatarImageWithFallback({
  src,
  fallbackSrc,
  name,
  size,
}: {
  src: string;
  fallbackSrc: string;
  name?: string;
  size: number;
}) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={name || "Avatar"}
      width={size}
      height={size}
      className="h-full w-full object-cover"
      referrerPolicy="no-referrer"
      unoptimized={imageSrc.includes("api.dicebear.com")}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        }
      }}
    />
  );
}

function UserAvatarImage({
  avatar,
  name,
  size,
}: {
  avatar?: string;
  name?: string;
  size: number;
}) {
  const fallbackAvatarUrl = getAvatarUrl(undefined, name);
  const avatarUrl = getAvatarUrl(avatar, name);

  return (
    <AvatarImageWithFallback
      key={avatarUrl}
      src={avatarUrl}
      fallbackSrc={fallbackAvatarUrl}
      name={name}
      size={size}
    />
  );
}

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Fitur", href: "/fitur" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Mode Darurat", href: "/darurat" },
  { label: "Edukasi", href: "/edukasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { user, isLoggedIn, isLoading: isLoggingIn, loginWithGoogle: handleGoogleLogin, logout: handleLogoutSession } = useAuth();

  const handleLogout = () => {
    handleLogoutSession();
    setProfileDropdownOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <nav className={`fixed left-0 right-0 top-0 z-50 px-4 transition-all duration-300 ${scrolled ? "pt-3" : "pt-5"}`}>
        <div
          className={`mx-auto flex w-full max-w-[1296px] items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 md:px-5 ${
            scrolled ? "liquid-glass" : "border border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={closeMobileMenu}>
            <CyberShieldLogo className="h-9 w-9 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
            <span className="font-[Sora,sans-serif] text-lg font-semibold tracking-normal"><span className="text-white">Aman</span><span className="text-cyan-400">Klik</span></span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-1 py-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  pathname === link.href
                    ? "bg-white/10 text-cyan-300"
                    : "text-slate-200 hover:bg-white/10 hover:text-cyan-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {isLoggedIn && (
              <Link href="/riwayat" className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-5 py-2 text-sm font-bold text-cyan-300 hover:bg-cyan-500/20 active:scale-[0.97] transition-all hover:text-cyan-200">
                Riwayat
              </Link>
            )}
            
            {isLoggingIn ? (
              <button className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-400 pointer-events-none">
                <svg className="animate-spin h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Menghubungkan...</span>
              </button>
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-950/60 p-1 pr-3.5 transition-all hover:bg-slate-900/60 hover:border-cyan-400 active:scale-[0.98]"
                >
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white font-bold text-sm shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                    <div className="h-full w-full rounded-full overflow-hidden flex items-center justify-center">
                      <UserAvatarImage avatar={user?.avatar} name={user?.name} size={32} />
                    </div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-slate-950 bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">{user?.name}</span>
                </button>
                
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-slate-800/80 bg-[#060B18]/95 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md z-50"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white font-bold text-base shadow-[0_0_12px_rgba(6,182,212,0.3)] overflow-hidden">
                            <UserAvatarImage avatar={user?.avatar} name={user?.name} size={48} />
                          </div>
                          <div className="overflow-hidden">
                            <p className="truncate text-base font-bold text-white">{user?.name}</p>
                            <p className="truncate text-xs text-slate-400 mt-0.5">{user?.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 py-2.5 text-center text-xs font-semibold uppercase tracking-wider">
                            Pro Guard Active
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        >
                          Keluar Akun
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-100 active:scale-[0.97] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <GoogleIcon className="h-4 w-4" />
                <span>Masuk dengan Google</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="rounded-xl border border-white/10 p-2 text-white transition-colors hover:border-cyan-400/40 hover:bg-white/5 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {mobileOpen ? <CyberCloseIcon className="h-5 w-5" /> : <CyberMenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 rounded-2xl p-4 lg:hidden liquid-glass-strong"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-white/10 text-cyan-300"
                      : "text-slate-100 hover:bg-white/5 hover:text-cyan-300"
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && (
                <Link
                  href="/riwayat"
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    pathname === "/riwayat"
                      ? "bg-white/10 text-cyan-300"
                      : "text-slate-100 hover:bg-white/5 hover:text-cyan-300"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Riwayat
                </Link>
              )}
              {isLoggingIn ? (
                <button className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-3 text-sm font-semibold text-slate-400 pointer-events-none">
                  <svg className="animate-spin h-4 w-4 text-cyan-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Menghubungkan...</span>
                </button>
              ) : isLoggedIn ? (
                <div className="mt-2 rounded-2xl border border-slate-800/80 bg-[#060B18]/95 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white font-bold text-base shadow-[0_0_12px_rgba(6,182,212,0.3)] overflow-hidden">
                      <UserAvatarImage avatar={user?.avatar} name={user?.name} size={48} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-base font-bold text-white">{user?.name}</p>
                      <p className="truncate text-xs text-slate-400 mt-0.5">{user?.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 py-2.5 text-center text-xs font-semibold uppercase tracking-wider">
                      Pro Guard Active
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-2.5 text-xs font-semibold text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                    >
                      Keluar Akun
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-slate-100"
                >
                  <GoogleIcon className="h-4 w-4" />
                  <span>Masuk dengan Google</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
