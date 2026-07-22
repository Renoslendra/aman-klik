<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Space+Grotesk&size=25&pause=1000&color=3B82F6&center=true&vCenter=true&width=1000&lines=Welcome+to+AmanKlik+AI;Platform+Deteksi+Penipuan+Digital+Indonesia;Cek+Dulu+Sebelum+Klik!;Juara+Vibe+Coding+2026" alt="AmanKlik AI" />
</p>

<p align="center">
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-00C58E?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /><br>
    <img src="https://img.shields.io/badge/Express_4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/Supabase_Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/Google_Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="GCP Run" />
</p>

<p align="center">
  <strong><i>Platform Keamanan Digital & Deteksi Penipuan Berbasis Gemini 2.5 Flash AI.</i></strong>
  <br />
  Solusi Pintar untuk Menganalisis Pesan, Link, dan Chat Screenshot Sebelum Mengklik atau Mengirim Data Pribadi.
  <br />
  Proyek Khusus untuk Kompetisi <strong>#JuaraVibeCoding2026</strong>.
</p>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🚀 Live Demo & Akses Cepat

Aplikasi ini telah dideploy secara penuh ke Google Cloud Run dengan performa maksimal dan latensi rendah.

> [!TIP]
> **Uji Coba Langsung di Browser Anda:**  
> 🔗 **https://amanklik-ai.vercel.app/**

---

## 🏆 Mengapa Proyek Ini Siap Memenangkan Kompetisi?

Dalam ajang **#JuaraVibeCoding2026**, sebuah aplikasi dinilai berdasarkan inovasi, kualitas arsitektur, kedalaman pemanfaatan AI, serta antarmuka pengguna yang memukau.

| Pilar Penilaian | Kriteria Utama | Solusi & Inovasi AmanKlik AI |
|---|---|---|
| 🧠 **Pemanfaatan AI** | Apakah AI diimplementasikan secara efektif dan bukan gimik? | Menggunakan **Gemini 2.5 Flash** untuk analisis multi-modal (teks pesan & gambar screenshot) serta fitur **AI Cyber Medic** untuk mendiagnosis situasi darurat pengguna pasca-insiden penipuan dengan panduan mitigasi interaktif. |
| 📊 **Kualitas Arsitektur** | Keandalan, keamanan, dan skalabilitas monorepo. | Membagi sistem menjadi **Frontend Next.js (App Router)** & **Backend Express (TypeScript ESM)**. Dilengkapi dengan secure headers (Helmet), IP Rate Limiter, autentikasi aman Google OAuth2 + stateless JWT session, serta integrasi database Supabase PostgreSQL via Prisma ORM. |
| 🎨 **UI/UX Premium** | Visual yang memukau dan pengalaman pengguna yang halus. | Menggunakan antarmuka bertema **Glassmorphism modern** dengan efek micro-interactions dinamis (Framer Motion), layout modern, dashboard statistik riwayat pemindaian yang interaktif, serta visual charting. |
| 🇮🇩 **Dampak Nyata** | Relevansi sosial untuk publik lokal. | Menyelesaikan masalah darurat penipuan digital di Indonesia (modus paket kurir APK, pinjol ilegal, impersonasi bank, kupon hadiah palsu) dengan bahasa yang ramah keluarga, serta melengkapinya dengan **Generator Surat Laporan** formal ke Bank/Polisi. |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🚨 Fitur Unggulan Baru: Mode Darurat (Emergency Mode)

Fitur ini dirancang khusus untuk membantu pengguna yang telah telanjur mengklik link phishing, mengunduh file APK berbahaya, atau mentransfer sejumlah uang kepada penipu. Fitur ini terdiri dari:

1. **AI Cyber Medic**: Chatbot interaktif bertenaga Gemini AI yang berfungsi melakukan diagnosis cepat mengenai tingkat keparahan insiden keamanan siber yang dialami pengguna serta memberikan pertolongan pertama yang dipersonalisasi.
2. **Generator Surat Laporan**: Alat untuk menghasilkan draf surat laporan formal secara otomatis (untuk Bank, Kepolisian, atau Kominfo/ADUANKONTEN) berdasarkan data insiden pengguna untuk mempercepat proses birokrasi penindakan hukum.
3. **Panduan Interaktif Tindakan Cepat**: Langkah-langkah taktis terperinci berdasarkan skenario ancaman siber (seperti APK Terinstal, Akun Diambil Alih, Transfer Uang, Kebocoran Data).
4. **Hub Kontak Darurat**: Daftar kontak resmi lembaga hukum dan pengaduan penipuan di Indonesia (OJK, Kominfo, Kepolisian, dll) yang dapat dihubungi secara langsung.

---

## 🧬 Arsitektur Sistem Lengkap

Visualisasi alur komunikasi data end-to-end dari interaksi pengguna di frontend hingga pemrosesan oleh Gemini AI dan penyimpanan database:

```mermaid
graph TB
    subgraph "👤 User Interface (Next.js 15 + React 19)"
        UI1["🛡️ Halaman Utama<br/>(Cek Pesan Teks & Link)"]
        UI2["📸 Analisis Multi-modal<br/>(Upload Screenshot Chat)"]
        UI3["📊 Dashboard User<br/>(Riwayat Scan & Statistik)"]
        UI4["📩 Laporan & Kontak"]
        UI5["🚨 Mode Darurat<br/>(AI Cyber Medic, Report Generator, Interactive Guide)"]
    end

    subgraph "⚙️ API Security & Gateway (Express + Node.js)"
        Sec1["🚦 Rate Limiter<br/>(Perlindungan dari Abuse)"]
        Sec2["🛡️ Helmet & Secure CORS"]
        Sec3["🔐 Google OAuth2 / JWT Auth"]
        Controller["🎮 Controllers<br/>(Auth, Scans, Analysis, Contacts)"]
    end

    subgraph "🧠 AI Analysis Engine (Google Gemini)"
        Gemini["✨ Gemini 2.5 Flash Model"]
        Prompt["📝 Security Expert System Prompt"]
        ImageProc["🖼️ Base64 Image Parser"]
    end

    subgraph "💾 Database & Storage Layer"
        Prisma["Prisma Client ORM"]
        DB[("⚡ Supabase PostgreSQL Database")]
    end

    subgraph "🚀 Cloud Deployment Platform"
        GCP_FE["🌐 Google Cloud Run (Frontend Service)"]
        GCP_BE["🔗 Google Cloud Run (Backend Service)"]
    end

    UI1 --> GCP_FE
    UI2 --> GCP_FE
    UI3 --> GCP_FE
    UI4 --> GCP_FE
    UI5 --> GCP_FE

    GCP_FE -->|HTTPS Request + Bearer JWT| GCP_BE
    GCP_BE --> Sec1
    Sec1 --> Sec2
    Sec2 --> Sec3
    Sec3 --> Controller

    Controller -->|1. Kirim Teks / Image Part| Gemini
    Gemini -->|2. Respon JSON Terstruktur| Controller
    Controller -->|3. Simpan Riwayat| Prisma
    Prisma --> DB

    style UI1 fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#fff
    style UI2 fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#fff
    style UI3 fill:#1E293B,stroke:#3B82F6,stroke-width:2px,color:#fff
    style Controller fill:#1E293B,stroke:#10B981,stroke-width:2px,color:#fff
    style Gemini fill:#1E293B,stroke:#8B5CF6,stroke-width:2px,color:#fff
    style DB fill:#1E293B,stroke:#3FCF8E,stroke-width:2px,color:#fff
    style GCP_FE fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#fff
    style GCP_BE fill:#0F172A,stroke:#F59E0B,stroke-width:2px,color:#fff
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🧪 Core AI Logic: Analisis Multi-modal Gemini

Sistem memanfaatkan SDK `@google/genai` terbaru untuk memproses masukan multi-modal (teks & gambar) dengan prompt sistem yang mendalam untuk mendeteksi penipuan:

```typescript
// Implementasi Inti pada Backend Express (backend/src/services/gemini.service.ts)
const prompt = `
  Anda adalah analis keamanan siber profesional untuk mendeteksi penipuan digital (scam, phishing, social engineering).
  Analisis input berikut yang diterima oleh pengguna Indonesia.
  Jika ada screenshot, baca semua teks yang terlihat di gambar, perhatikan URL, nomor pengirim, nama aplikasi, nominal uang, instruksi transfer, OTP, file APK, dan indikator social engineering.
  
  Teks tambahan dari pengguna:
  "${text || "Tidak ada teks tambahan. Analisis berdasarkan screenshot yang dilampirkan."}"
  
  Berikan hasil analisis dalam format JSON murni tanpa markdown, dengan struktur berikut:
  {
    "score": number (skor risiko 0 - 100, di mana 0 sangat aman dan 100 sangat berbahaya),
    "riskLevel": "safe" | "medium" | "high" (safe jika score < 30, medium jika 30-69, high jika >= 70),
    "category": string (kategori penipuan, contoh: "Phishing Link", "Modus Kurir Paket", "Penipuan Hadiah", "SMS Spam", "Aman / Normal"),
    "summary": string (ringkasan penjelasan risiko dalam Bahasa Indonesia yang ramah keluarga/mudah dipahami orang tua),
    "redFlags": [
      {
        "indicator": string (ciri mencurigakan, contoh: "Menggunakan nomor HP tidak dikenal"),
        "explanation": string (penjelasan rinci mengapa hal ini mencurigakan),
        "severity": "high" | "medium" | "low"
      }
    ],
    "recommendations": [
      string (rekomendasi tindakan praktis, contoh: "Jangan klik link tersebut", "Hubungi call center resmi bank Anda")
    ]
  }
`;
```

---

## 📂 Struktur Direktori Proyek

Monorepo ini dikelola secara rapi dengan pembagian fungsionalitas yang terisolasi dengan baik:

```text
aman-klik/
├── frontend/              # Web Client (Next.js 15)
│   ├── src/app/           # App Router Layouts, Metadata, & Pages
│   ├── src/components/    # Komponen UI (Dashboard, Auth, Scan Section)
│   │   └── sections/
│   │       └── emergency/ # Komponen Fitur Mode Darurat (Cyber Medic, Guide, Report Generator)
│   └── src/lib/           # Client API Context & Google Auth Manager
├── backend/               # REST API Server (Express + TypeScript)
│   ├── prisma/            # Skema Database PostgreSQL (Supabase)
│   └── src/
│       ├── controllers/   # Penanganan Logika (Scan, Auth, Emergency Controller)
│       ├── database/      # Prisma Client & Sinkronisasi DB Repository
│       ├── middlewares/   # Auth Guard, CORS Secure, IP Rate Limiter, Error Handler
│       ├── routes/        # Router Endpoint (Scan, Auth, Emergency Routes)
│       └── services/      # Integrasi Gemini AI Engine
├── PANDUAN_DARURAT.md     # Panduan Tindakan Cepat Darurat Siber
└── README.md
```

---

## 📋 Endpoint API Utama

Berikut adalah daftar endpoint REST API backend yang aktif beserta status autentikasinya:

| Method | Endpoint | Autentikasi | Deskripsi / Fungsi Utama |
|:---:|---|:---:|---|
| `GET` | `/api/v1/health` | **Public** | Memeriksa status kesehatan server backend |
| `POST` | `/api/v1/auth/google` | **Public** | Registrasi/Login menggunakan Google ID Token & mengembalikan token JWT |
| `GET` | `/api/v1/auth/profile` | **Required** | Mengambil informasi detail profil user yang sedang masuk |
| `POST` | `/api/v1/analysis/scan` | **Optional** | Mengirimkan data scan (teks/gambar) ke Gemini AI dan menyimpan riwayat |
| `GET` | `/api/v1/scans` | **Required** | Mengambil seluruh riwayat pemindaian user (support filter & pagination) |
| `GET` | `/api/v1/scans/stats` | **Required** | Mengambil data statistik scan user (visual grafik dashboard) |
| `DELETE` | `/api/v1/scans/:id` | **Required** | Menghapus log riwayat pemindaian tertentu milik user |
| `POST` | `/api/v1/contact` | **Optional** | Mengirimkan pesan/pertanyaan atau laporan aduan penipuan baru |
| `POST` | `/api/v1/emergency/diagnose` | **Optional** | Menganalisis kondisi darurat siber dan mendiagnosis langkah mitigasi AI |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ⚙️ Cara Menjalankan Aplikasi Secara Lokal

### Prasyarat Sebelum Instalasi
- [Node.js](https://nodejs.org/) versi 20 atau yang lebih baru.
- Akun [Supabase](https://supabase.com/) & Database PostgreSQL aktif.
- API Key dari [Google AI Studio](https://aistudio.google.com/).
- Google Client ID dari Google Cloud Console.

### 1. Kloning Repository
```bash
git clone <repository-url>
cd aman-klik
```

### 2. Konfigurasi & Jalankan Backend
1. Masuk ke folder backend:
   ```bash
   cd backend
   npm install
   ```
2. Salin template `.env` dan lengkapi nilainya:
   ```bash
   cp .env.example .env
   ```
   *Isi dengan `DATABASE_URL` (Supabase), `GEMINI_API_KEY`, `JWT_SECRET`, dan `GOOGLE_CLIENT_ID`.*
3. Buat prisma client dan sinkronisasikan database:
   ```bash
   npm run db:generate
   ```
4. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
   *Backend akan berjalan di: `http://localhost:5000`*

### 3. Konfigurasi & Jalankan Frontend
1. Buka terminal baru dan masuk ke folder frontend:
   ```bash
   cd ../frontend
   npm install
   ```
2. Salin template `.env.local` dan lengkapi nilainya:
   ```bash
   cp .env.example .env.local
   ```
   *Isi dengan `NEXT_PUBLIC_GOOGLE_CLIENT_ID` dan `NEXT_PUBLIC_API_URL` (`http://localhost:5000/api/v1`).*
3. Jalankan mode pengembangan:
   ```bash
   npm run dev
   ```
   *Frontend Next.js akan berjalan di: `http://localhost:3000`*

---

## 🚀 Panduan Deployment Ke Production

### 1. Deployment Backend ke Google Cloud Run
Pastikan Docker terinstal jika ingin melakukan build kontainer secara lokal atau gunakan Google Cloud Build:
1. Deploy service backend:
   ```bash
   gcloud run deploy amanklik-backend \
     --source . \
     --platform managed \
     --region asia-southeast1 \
     --allow-unauthenticated
   ```
2. Atur environment variables pada instansi Cloud Run:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `postgresql://...`
   - `GEMINI_API_KEY`: `AIzaSy...`
   - `JWT_SECRET`: `rahasia_jwt_anda`
   - `GOOGLE_CLIENT_ID`: `...apps.googleusercontent.com`
   - `CORS_ORIGIN`: `https://amanklik-575126371408.asia-southeast1.run.app` (domain frontend Anda)

### 2. Deployment Frontend ke Google Cloud Run / Vercel
Jika menggunakan Google Cloud Run dengan Dockerfile:
```bash
gcloud run deploy amanklik-frontend \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-build-env-vars NEXT_PUBLIC_API_URL=https://amanklik-backend-575126371408.asia-southeast1.run.app/api/v1,NEXT_PUBLIC_GOOGLE_CLIENT_ID=575126371408-24cf56dvn0m8gih1ieip7shrk3s2so17.apps.googleusercontent.com
```

### 3. Integrasi OAuth Google Console
Pastikan untuk mendaftarkan URL production frontend ke **Google Cloud Console Credentials OAuth 2.0**:
- **Authorized JavaScript Origins:** `https://amanklik-575126371408.asia-southeast1.run.app`
- **Authorized Redirect URIs:** `https://amanklik-575126371408.asia-southeast1.run.app`

---

## 🧪 Validasi Keamanan & Kompilasi
Untuk memverifikasi kualitas kode backend dan frontend sebelum diproduksi, jalankan pemeriksaan tipe TypeScript dan proses build:

```bash
# Validasi Backend
cd backend
npx tsc --noEmit
npm run build

# Validasi Frontend
cd ../frontend
npx tsc --noEmit
npm run build
```

---

## 👥 Tim Pengembang

- **Renoslendra** — Lead Creator & Developer AmanKlik AI.
- Dikembangkan secara khusus untuk menyukseskan program literasi digital Indonesia di kompetisi **#JuaraVibeCoding2026**.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.
