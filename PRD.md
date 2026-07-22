# Product Requirements Document (PRD) & System Reconstruction Plan
## AmanKlik AI — Platform Deteksi Penipuan Digital & Mode Darurat Siber Indonesia

---

## 📋 1. Ikhtisar Eksekutif (Executive Summary)

| Atribut | Detail |
|---|---|
| **Nama Proyek** | AmanKlik AI |
| **Slogan** | Cek Dulu Sebelum Klik! |
| **Tujuan Proyek** | Platform keamanan digital berbasis kecerdasan buatan (Gemini 2.5 Flash) untuk menganalisis pesan, link, dan screenshot chat mencurigakan, serta menyediakan penanganan darurat (AI Cyber Medic) bagi korban penipuan siber. |
| **Target Kompetisi** | **#JuaraVibeCoding2026** (Indonesia Digital Literacy & Security Innovation) |
| **Status Hosting Saat Ini** | **Offline / Error 500 Server Error** pada Google Cloud Run (`https://amanklik-575126371408.asia-southeast1.run.app`) |
| **Tujuan Dokumen Ini** | Spesifikasi lengkap produk, audit teknis penyebab kegagalan deployment (Root Cause Analysis), dan cetak biru perbaikan sistem (Rebuild Roadmap) untuk menghidupkan kembali layanan. |

---

## 🎯 2. Latar Belakang & Masalah Utama (Problem Statement)

### 2.1 Latar Belakang Produk
Tingkat kejahatan siber di Indonesia terus meningkat dengan modus yang semakin manipulatif, seperti undangan pernikahan berformat APK (Modus Kurir APK), link phishing penipuan bank, investasi bodong, dan penipuan undian palsu. Banyak masyarakat awam dan orang tua menjadi korban karena kurangnya literasi teknis dan tidak adanya alat periksa yang cepat, mudah dipahami, serta ramah keluarga.

### 2.2 Latar Belakang Kegagalan Sistem (The Cloud Run Incident)
Saat ini, aplikasi yang telah dideploy ke Google Cloud Run mengalami kegagalan total saat diakses melalui browser dengan pesan error:
```text
Error: Server Error
The server encountered an error and could not complete your request.
Please try again in 30 seconds.
```
Pesan error ini **bukan berasal dari aplikasi Next.js ataupun Express**, melainkan **halaman error infrastruktur Google Cloud Run (Google Frontend / GFE Load Balancer)** yang menandakan bahwa kontainer aplikasi mengalami **CrashLoopBackOff** (mati saat startup) atau **gagal mendengarkan pada port yang diwajibkan oleh Cloud Run**.

Dokumen ini menetapkan standar teknis dan langkah rekonstruksi yang harus dipenuhi agar aplikasi berjalan stabil, cepat, ringan, dan anti-crash di lingkungan production.

---

## 👥 3. Target Pengguna (User Personas)

1. **Masyarakat Awam & Orang Tua (The Daily User)**
   - *Karakteristik:* Tidak memiliki latar belakang teknis IT, sering menerima pesan WhatsApp/SMS dari nomor tidak dikenal.
   - *Kebutuhan:* Penjelasan yang menggunakan Bahasa Indonesia yang sederhana, tanpa jargon rumit, dan kesimpulan tegas ("Aman" atau "Berbahaya").
2. **Korban Penipuan yang Sedang Panik (The Emergency Victim)**
   - *Karakteristik:* Baru saja mengklik link phishing, menginstal APK berbahaya, atau terlanjur mentransfer uang ke penipu.
   - *Kebutuhan:* Pertolongan pertama instan via AI Cyber Medic, panduan langkah mitigasi taktis, serta alat pembuatan surat laporan formal ke Bank/Kepolisian secara cepat.
3. **Dewi Juri & Penggiat Literasi Digital (The Hackathon Judge / Reviewer)**
   - *Karakteristik:* Menilai inovasi AI, arsitektur monorepo yang bersih, UI/UX berkelas premium (Glassmorphism), serta keandalan sistem cloud.
   - *Kebutuhan:* Performa latensi rendah, desain visual yang memukau dengan transisi halus, serta kode yang terstruktur rapi.

---

## 🛡️ 4. Spesifikasi Fitur Utama (Core Functional Requirements)

### 4.1 Modul Analisis & Pemindaian Risiko (Scam Detection Engine)
- **F-SCAN-01 (Analisis Teks & Link):** Pengguna dapat memasukkan teks pesan, tautan (URL), atau instruksi transfer. Sistem memproses input menggunakan **Gemini 2.5 Flash** untuk memberikan skor risiko (0–100), tingkat risiko (`safe`, `medium`, `high`), kategori penipuan, ringkasan ramah keluarga, serta daftar *red flags*.
- **F-SCAN-02 (Analisis Multi-modal Screenshot):** Pengguna dapat mengunggah bukti screenshot percakapan chat (WhatsApp, Telegram, SMS, Instagram). AI melakukan ekstraksi teks (OCR) sekaligus menganalisis pola manipulasi visual dan social engineering.
- **F-SCAN-03 (Riwayat & Statistik Scan):** Setiap pemindaian disimpan secara persisten di database Supabase PostgreSQL. Pengguna yang login (Google OAuth) dapat melihat riwayat pemindaian, menghapus log, dan melihat grafik statistik di dashboard.

### 4.2 Modul Mode Darurat (Emergency Mode `/darurat`)
- **F-EMERG-01 (AI Cyber Medic):** Chatbot diagnosis interaktif bertenaga Gemini AI yang menganalisis tingkat keparahan insiden siber yang dialami korban dan memberikan rencana tindakan pertolongan pertama terpersonalisasi.
- **F-EMERG-02 (Generator Surat Laporan Resmi):** Formulir pembuat draf surat laporan penipuan formal untuk ditujukan ke pihak Bank, Kepolisian, atau Kominfo (ADUANKONTEN). Surat dapat disalin atau diunduh dalam format `.docx`/`.doc` yang dapat diedit langsung.
- **F-EMERG-03 (Panduan Mitigasi Interaktif):** Langkah demi langkah terperinci berdasarkan skenario ancaman siber (misal: APK Terinstal, Akun Diambil Alih, Transfer Uang).
- **F-EMERG-04 (Direktori Kontak Darurat):** Akses cepat panggilan dan tautan pengaduan resmi (Call Center Bank BRI, BCA, Mandiri, BNI, BSI, OJK 157, PatroliSiber, CekRekening).

### 4.3 Modul Autentikasi & Keamanan API
- **F-AUTH-01 (Google OAuth2 Stateless Auth):** Registrasi dan login aman menggunakan Google ID Token yang diverifikasi di backend lalu ditukar dengan stateless JWT token.
- **F-SEC-01 (API Protection & Rate Limiting):** Pembatasan laju permintaan (Rate Limiter) untuk mencegah spam/DDoS, proteksi header HTTP (Helmet), dan validasi CORS ketat.

---

## 🏗️ 5. Arsitektur Sistem & Spesifikasi Teknologi (Tech Stack)

### 5.1 Spesifikasi Teknologi

| Lapisan (Layer) | Teknologi & Framework | Keterangan / Versi |
|---|---|---|
| **Frontend Framework** | Next.js 15 (App Router) + React 19 | Client-Side & Server-Side Rendering Modern |
| **Language** | TypeScript | Type safety end-to-end (Frontend & Backend) |
| **Styling & Animation** | Tailwind CSS v4 + Framer Motion | UI bertema Glassmorphism premium & micro-interactions |
| **Backend Framework** | Node.js 20 + Express 4 (ESM) | REST API Gateway berkinerja tinggi |
| **ORM & Database** | Prisma Client v7 + Supabase PostgreSQL | Driver `@prisma/adapter-pg` dengan connection pooler |
| **AI Processing** | Google GenAI SDK (`@google/genai` v2.5) | Model `gemini-2.5-flash` dengan prompt system terstruktur |
| **Security Layer** | Helmet, Express Rate Limit, CORS, JWT | Proteksi endpoint dan session management |
| **Cloud Deployment** | Google Cloud Run (Managed Containers) | Serverless auto-scaling container (Frontend & Backend) |

### 5.2 Alur Komunikasi Arsitektur (End-to-End Diagram)

```mermaid
graph TB
    subgraph "🌐 Client Browser / Device"
        FE["Next.js 15 Web App<br/>(amanklik-575126371408.asia-southeast1.run.app)"]
    end

    subgraph "☁️ Google Cloud Run — Backend Container"
        BE_GW["Express API Gateway<br/>(Port 5000 / $PORT)"]
        BE_SEC["Middlewares<br/>(Helmet, CORS, Rate Limiter, JWT Auth Guard)"]
        BE_CTRL["Controllers & Services<br/>(Scan, Auth, Emergency, Contact)"]
    end

    subgraph "🧠 External AI Engine"
        GEMINI["Google Gemini 2.5 Flash API<br/>(@google/genai SDK)"]
    end

    subgraph "💾 Database & Storage Layer"
        POOLER["Supabase Transaction Pooler<br/>(Port 5432 / SSL)"]
        POSTGRES[("Supabase PostgreSQL Database<br/>(Users, Scans, Reports, ScamPatterns)")]
    end

    FE -->|HTTPS REST Request + JWT Bearer| BE_GW
    BE_GW --> BE_SEC
    BE_SEC --> BE_CTRL
    BE_CTRL -->|Multi-modal Payload (Text/Base64 Image)| GEMINI
    GEMINI -->|Structured JSON Risk Analysis| BE_CTRL
    BE_CTRL -->|Prisma Client ORM queries| POOLER
    POOLER --> POSTGRES
```

---

## 🔬 6. Audit & Analisis Akar Masalah (Root Cause Analysis - 500 Server Error)

Berdasarkan investigasi menyeluruh pada repository, kegagalan saat ini di Google Cloud Run disebabkan oleh 4 masalah kritis pada konfigurasi kontainer dan penanganan error di kode:

### 🚨 Fatal Error 1: Pengecekan Environment Ketat yang Memicu Crash saat Startup (`backend/src/config/env.ts`)
Fungsi `getProductionRequiredEnv` di `env.ts` dirancang untuk memvalidasi keberadaan variabel saat `NODE_ENV=production`:
```typescript
const getProductionRequiredEnv = (key: string, defaultValue = ""): string => {
  const value = process.env[key] || (!isProduction ? defaultValue : undefined);
  if (isProduction && !value) {
    throw new Error(`Environment variable ${key} wajib diisi untuk production.`);
  }
  return value ?? defaultValue;
};
```
**Akar Masalah:** Ketika kontainer berjalan di Cloud Run (`isProduction = true`), jika ada variabel opsional seperti `GEMINI_API_KEY_ANALYSIS` atau `JWT_SECRET` yang tidak secara eksplisit dimasukkan ke dalam daftar environment variable Cloud Run, fungsi ini menghasilkan `value = undefined` (mengabaikan `defaultValue`) dan langsung mengeksekusi `throw new Error(...)`. Akibatnya, server Express langsung mati di detik pertama (*CrashLoopBackOff*).

### 🚨 Fatal Error 2: Ketidakcocokan Port `$PORT` vs Hardcode Port di Dockerfile
Google Cloud Run menyuntikkan variabel `$PORT` (secara default `8080`) dan menuntut kontainer mendengarkan lalu lintas di port tersebut dalam batas waktu startup.
- **Masalah pada Frontend (`frontend/Dockerfile`):** Menggunakan `CMD ["npm", "start"]`. Secara default Next.js mendengarkan di port `3000`. Karena tidak binding ke `$PORT` (8080), Cloud Run menyimpulkan aplikasi tidak merespons dan memutus koneksi dengan error 500.
- **Masalah pada Backend (`backend/Dockerfile`):** Memiliki instruksi healthcheck internal:
  `HEALTHCHECK --interval=30s ... CMD wget --spider http://localhost:5000/api/v1/health || exit 1`
  Jika Cloud Run menjalankan kontainer di port `8080`, pengecekan internal `wget` ke port `5000` akan selalu gagal (`exit 1`), yang memicu Docker mematikan kontainer berulang kali.

### 🚨 Fatal Error 3: Next.js Tidak Menggunakan Mode Standalone (`frontend/next.config.ts`)
File `next.config.ts` belum mengaktifkan `output: "standalone"`. Sementara pada `frontend/Dockerfile`, proses menyalin seluruh folder `node_modules` mentah-mentah (`COPY --from=builder /app/node_modules/ ./node_modules/`).
**Akar Masalah:** Ukuran kontainer menjadi sangat besar (>500MB). Hal ini menyebabkan *cold start latency* yang sangat lama saat Cloud Run menginisialisasi instance baru, melebihi batas toleransi waktu startup dan menghasilkan *500 Gateway Timeout / Server Error*.

### 🚨 Fatal Error 4: Koneksi Database Supabase Tertidur / Paused (`DATABASE_URL`)
Pada tier gratis Supabase, database PostgreSQL akan masuk ke mode **Paused/Sleep setelah 7 hari tanpa aktivitas**.
**Akar Masalah:** Jika koneksi terputus atau database sedang tidur, inisialisasi koneksi `pg.Pool` pada `backend/src/database/client.ts` tanpa penanganan *graceful catch* akan menyebabkan server Express langsung fatal crash saat menerima request pertama.

---

## 🛠️ 7. Rencana Rekonstruksi & Spesifikasi Pembangunan Ulang (Rebuild Specification)

Untuk memperbaiki seluruh kegagalan di atas dan membuat sistem tahan banting (*production-ready*), berikut adalah spesifikasi teknis rekonstruksi yang harus segera dilaksanakan:

### 7.1 Spesifikasi Rebuild 1: Arsitektur Docker & Standalone Next.js (`frontend/`)
1. **Perbarui `frontend/next.config.ts`:**
   Tambahkan konfigurasi `output: "standalone"` agar Next.js menghasilkan bundel mandiri berukuran kecil yang hanya berisi file dan dependensi yang benar-benar digunakan.
2. **Desain Ulang `frontend/Dockerfile` (Multi-stage Standalone Runner):**
   - Gunakan image base `node:20-alpine`.
   - Salin folder `.next/standalone` dan `.next/static`.
   - Set variabel lingkungan agar Next.js membaca port dinamis dari Cloud Run:
     `ENV PORT=3000`
     `ENV HOSTNAME="0.0.0.0"`
   - Jalankan server menggunakan `node server.js` (bukan `npm start`) yang secara otomatis mendengarkan variabel `process.env.PORT`. Ukuran kontainer akan turun drastis ke kisaran ~80MB dengan waktu startup <2 detik.

### 7.2 Spesifikasi Rebuild 2: Arsitektur Docker & Dynamic Port Backend (`backend/`)
1. **Desain Ulang `backend/Dockerfile`:**
   - Gunakan `EXPOSE 5000` namun biarkan Express secara otomatis mendengarkan `process.env.PORT || 5000`.
   - Ubah `HEALTHCHECK` agar mendinamiskan port atau mengecek ke alamat yang tepat:
     `HEALTHCHECK ... CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-5000}/api/v1/health || exit 1`
   - Pastikan tahap build (`npm run build`) berjalan bersih dan menyalin hasil kompilasi TypeScript (`/dist`) secara sempurna.

### 7.3 Spesifikasi Rebuild 3: Refactoring Logika Environment & Graceful DB (`backend/src/`)
1. **Perbaikan `backend/src/config/env.ts`:**
   - Ubah logika `getProductionRequiredEnv` agar mendukung nilai fallback (`defaultValue`) yang sah meskipun di mode `production`.
   - Pastikan `GEMINI_API_KEY_ANALYSIS` secara otomatis jatuh ke `GEMINI_API_KEY` tanpa melempar error crash jika `GEMINI_API_KEY_ANALYSIS` tidak didefinisikan secara terpisah.
   - Set fallback `JWT_SECRET` yang aman untuk mencegah crash startup.
2. **Perbaikan `backend/src/database/client.ts`:**
   - Lengkapi inisialisasi `pg.Pool` dan `PrismaClient` dengan penanganan error. Jika database terputus atau *connection refused*, catat error melalui `logger.error(...)` namun **jangan mematikan proses utama Express (prevent fatal crash)** agar endpoint public (seperti `/api/v1/health`) tetap bisa merespons status server dengan baik.

---

## ⚙️ 8. Daftar Variabel Lingkungan (Environment Variables Checklist)

Sebelum melakukan deploy ulang ke Google Cloud Run, seluruh variabel berikut wajib disiapkan dan diverifikasi:

### 8.1 Backend Environment Variables (`backend/.env` / Cloud Run Env Vars)
| Key | Wajib? | Contoh Nilai / Deskripsi |
|---|:---:|---|
| `PORT` | Opsional | `5000` (Secara otomatis di-override menjadi `8080` oleh Cloud Run) |
| `NODE_ENV` | Wajib | `production` |
| `DATABASE_URL` | Wajib | `postgresql://postgres.xxx:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `GEMINI_API_KEY` | Wajib | API Key dari Google AI Studio (`AIzaSy...`) |
| `GEMINI_API_KEY_ANALYSIS` | Opsional | API Key cadangan untuk kuota terpisah (Jika kosong, otomatis memakai `GEMINI_API_KEY`) |
| `JWT_SECRET` | Wajib | Kunci rahasia untuk verifikasi stateless JWT token |
| `GOOGLE_CLIENT_ID` | Wajib | Client ID OAuth 2.0 dari Google Cloud Console Credentials |
| `CORS_ORIGIN` | Wajib | `https://amanklik-575126371408.asia-southeast1.run.app` (URL Frontend Anda) |

### 8.2 Frontend Environment Variables (`frontend/.env.production` / Build-time Vars)
| Key | Wajib? | Contoh Nilai / Deskripsi |
|---|:---:|---|
| `NEXT_PUBLIC_API_URL` | Wajib | `https://amanklik-backend-575126371408.asia-southeast1.run.app/api/v1` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Wajib | `575126371408-24cf56dvn0m8gih1ieip7shrk3s2so17.apps.googleusercontent.com` |

---

## 🚀 9. Rencana Validasi, Pengujian & Deployment (Verification Plan)

### 9.1 Tahap 1: Validasi Kompilasi & Build Lokal
Sebelum deploy ke Cloud Run, lakukan pengujian build di terminal lokal untuk memastikan tidak ada error sintaks atau rusak:
```bash
# 1. Cek Kompilasi Backend
cd backend
npm run build

# 2. Cek Kompilasi Frontend
cd ../frontend
npm run build
```

### 9.2 Tahap 2: Pengecekan Status Database Supabase
- Masuk ke dashboard Supabase ([https://supabase.com/dashboard](https://supabase.com/dashboard)).
- Pastikan project database `uxewxjbpvqwjwatzsisa` dalam status **Active** (bukan *Paused*). Jika *Paused*, klik tombol **Restore / Wake up**.

### 9.3 Tahap 3: Re-Deployment ke Google Cloud Run
Gunakan perintah gcloud CLI berikut untuk mendeply ulang kontainer yang telah diperbaiki:

**1. Deploy Backend Service:**
```bash
cd backend
gcloud run deploy amanklik-backend \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port=5000 \
  --set-env-vars NODE_ENV=production,DATABASE_URL="postgresql://...",GEMINI_API_KEY="AIzaSy...",JWT_SECRET="rahasia_jwt",GOOGLE_CLIENT_ID="575126371408-24cf56dvn0m8gih1ieip7shrk3s2so17.apps.googleusercontent.com",CORS_ORIGIN="https://amanklik-575126371408.asia-southeast1.run.app"
```

**2. Deploy Frontend Service:**
```bash
cd ../frontend
gcloud run deploy amanklik-frontend \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port=3000 \
  --set-build-env-vars NEXT_PUBLIC_API_URL=https://amanklik-backend-575126371408.asia-southeast1.run.app/api/v1,NEXT_PUBLIC_GOOGLE_CLIENT_ID=575126371408-24cf56dvn0m8gih1ieip7shrk3s2so17.apps.googleusercontent.com
```

### 9.4 Tahap 4: Verification Checklist Pasca-Deploy
- [ ] Buka URL `https://amanklik-backend-575126371408.asia-southeast1.run.app/api/v1/health` di browser → Harus merespons JSON `{ success: true, status: "OK", ... }`.
- [ ] Buka URL `https://amanklik-575126371408.asia-southeast1.run.app` → Halaman utama Next.js harus dimuat dengan cepat tanpa layar putih atau `Error 500`.
- [ ] Uji coba masukkan teks promosi mencurigakan di form beranda → AI Gemini harus merespons skor risiko dalam <3 detik.
- [ ] Uji coba buka menu **Mode Darurat (`/darurat`)** → Coba interaksi dengan AI Cyber Medic dan generate surat laporan `.docx`.
- [ ] Uji coba login menggunakan akun Google OAuth → Profil dan riwayat pemindaian berhasil ditampilkan di dashboard.

---
*Dokumen PRD & Rebuild Plan ini disusun sebagai standar kepastian teknis untuk pemulihan dan pemeliharaan jangka panjang platform AmanKlik AI.*
