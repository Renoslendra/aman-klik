"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
}

type AuthResponse = {
  success: boolean;
  data: {
    token: string;
    user: UserProfile;
  };
};

type GoogleCredentialResponse = {
  credential: string;
};

type GooglePromptNotification = {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
};

type GoogleIdentityService = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
        cancel_on_tap_outside: boolean;
      }) => void;
      prompt: (callback: (notification: GooglePromptNotification) => void) => void;
    };
  };
};

type WindowWithGoogle = Window & {
  google?: GoogleIdentityService;
};

const isProduction = process.env.NODE_ENV === "production";
const devLog = {
  error: (...args: Parameters<typeof console.error>) => {
    if (!isProduction) console.error(...args);
  },
  warn: (...args: Parameters<typeof console.warn>) => {
    if (!isProduction) console.warn(...args);
  },
  info: (...args: Parameters<typeof console.info>) => {
    if (!isProduction) console.info(...args);
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  loginWithGoogle: () => void;
  loginWithMock: (name?: string, email?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync profile on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get<AuthResponse>("/auth/profile");
        if (response.success && response.data.user) {
          setUser(response.data.user);
        } else {
          // Token expired or invalid
          localStorage.removeItem("auth_token");
        }
      } catch (error) {
        devLog.error("Auth initialization error:", error);
        // Hapus token jika error adalah 401/403
        localStorage.removeItem("auth_token");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Dynamically load Google Sign-In GIS script
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if script is already loaded
    if (document.getElementById("google-gis-script")) return;

    const script = document.createElement("script");
    script.id = "google-gis-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  /**
   * Handle credential response from Google ID token callback
   */
  const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
    try {
      setIsLoading(true);
      const authResult = await api.post<AuthResponse>("/auth/google", {
        token: response.credential,
      });

      if (authResult.success && authResult.data.token) {
        localStorage.setItem("auth_token", authResult.data.token);
        localStorage.setItem("isLoggedIn", "true");
        setUser(authResult.data.user);
        window.dispatchEvent(new Event("login-state-change"));
      }
    } catch (error) {
      devLog.error("Google authentication failed:", error);
      alert("Autentikasi Google gagal. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Trigger Google Sign-In via OAuth2 Popup (lebih andal daripada One Tap)
   * 
   * Strategi:
   * 1. Coba One Tap prompt terlebih dahulu (pengalaman terbaik jika tersedia)
   * 2. Jika One Tap gagal/diblokir, otomatis buka popup OAuth standar
   */
  const loginWithGoogle = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (!clientId) {
      devLog.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
      alert("Login Google belum dikonfigurasi. Hubungi administrator AmanKlik AI.");
      return;
    }

    const google = typeof window !== "undefined" ? (window as WindowWithGoogle).google : null;

    if (!google) {
      if (!isProduction) {
        devLog.warn("Google GIS SDK not loaded yet. Using Mock Login fallback for development.");
        loginWithMock("Renoslendra", "renoslendra@gmail.com");
        return;
      }

      devLog.error("Google GIS SDK not loaded.");
      alert("Layanan login Google belum siap. Silakan coba lagi beberapa saat.");
      return;
    }

    try {
      // Initialize GIS for ID token callback
      google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        cancel_on_tap_outside: false,
      });

      // Try One Tap first, fallback to popup if it fails
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          devLog.info("One Tap gagal/diblokir, membuka popup OAuth standar...");
          // Fallback: Buka popup OAuth2 standar yang selalu bekerja
          openOAuthPopup(clientId);
        }
      });
    } catch (err) {
      devLog.error("GIS initialization error, opening OAuth popup:", err);
      openOAuthPopup(clientId);
    }
  };

  /**
   * Membuka jendela popup OAuth2 standar Google
   * Ini adalah metode paling andal yang selalu bekerja
   */
  const openOAuthPopup = (clientId: string) => {
    const redirectUri = window.location.origin;
    const scope = "openid email profile";
    const nonce = Math.random().toString(36).substring(2);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=id_token` +
      `&scope=${encodeURIComponent(scope)}` +
      `&nonce=${encodeURIComponent(nonce)}` +
      `&prompt=select_account`;

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "google-oauth-popup",
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    );

    if (!popup) {
      alert("Popup diblokir oleh browser. Mohon izinkan popup untuk situs ini.");
      return;
    }

    // Poll untuk menangkap redirect dengan ID token di URL fragment
    const pollInterval = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(pollInterval);
          return;
        }

        // Cek apakah popup sudah redirect kembali ke origin kita
        if (popup.location.origin === window.location.origin) {
          const hash = popup.location.hash;
          popup.close();
          clearInterval(pollInterval);

          if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const idToken = params.get("id_token");

            if (idToken) {
              handleCredentialResponse({ credential: idToken });
            } else {
              const error = params.get("error");
              if (error) {
                devLog.error("OAuth error:", error);
                alert("Login Google gagal: " + error);
              }
            }
          }
        }
      } catch {
        // Cross-origin error — popup belum redirect, lanjutkan polling
      }
    }, 500);
  };

  /**
   * Mock Authentication for development/offline
   */
  const loginWithMock = async (name: string = "Renoslendra", email: string = "renoslendra@gmail.com") => {
    if (isProduction) {
      devLog.warn("Mock login is disabled in production.");
      alert("Mock login tidak tersedia pada mode production.");
      return;
    }

    try {
      setIsLoading(true);
      const avatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;
      
      const authResult = await api.post<AuthResponse>("/auth/google", {
        isMock: true,
        name,
        email,
        avatar,
      });

      if (authResult.success && authResult.data.token) {
        localStorage.setItem("auth_token", authResult.data.token);
        localStorage.setItem("isLoggedIn", "true");
        setUser(authResult.data.user);
        window.dispatchEvent(new Event("login-state-change"));
      }
    } catch (error) {
      devLog.error("Mock authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out of session
   */
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.setItem("isLoggedIn", "false");
      setUser(null);
      window.dispatchEvent(new Event("login-state-change"));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        loginWithGoogle,
        loginWithMock,
        logout,
      }}
    >
      {children}
      {/* Hidden button element used by Google SDK fallback rendering */}
      <div id="google-login-btn-hidden" style={{ display: "none" }} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


