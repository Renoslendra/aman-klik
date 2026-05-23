# AmanKlik AI - Cek dulu sebelum klik

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Supabase_PostgreSQL-ready-3FCF8E?logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-AI-4285F4?logo=google)
![Build](https://img.shields.io/badge/build-production_ready-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

AmanKlik AI adalah platform keamanan digital berbasis web yang membantu masyarakat Indonesia mengenali pesan penipuan sebelum mengklik link, mentransfer uang, atau mengirim data pribadi. Pengguna cukup menempelkan pesan dari SMS, WhatsApp, email, link mencurigakan, atau mengunggah screenshot chat, lalu Gemini AI memberi skor risiko, tanda bahaya, dan langkah aman dalam Bahasa Indonesia.

## Demo

Live demo: [https://amanklik-frontend-575126371408.asia-southeast1.run.app](https://amanklik-frontend-575126371408.asia-southeast1.run.app)

Screenshot: gunakan halaman utama AmanKlik AI setelah deploy untuk menampilkan demo analisis pesan real-time.

## Masalah yang Diselesaikan

Indonesia #1 di Asia Tenggara untuk kasus penipuan digital, sehingga banyak keluarga menerima pesan palsu yang terlihat meyakinkan, seperti modus kurir APK, undian berhadiah, pinjol ilegal, phishing OTP, atau impersonasi bank.

AmanKlik AI membantu pengguna non-teknis membuat keputusan cepat: apakah pesan tersebut aman, mencurigakan, atau berisiko tinggi.

## Fitur Utama

- 🛡️ **Analisis AI Real-time** - Gemini 2.5 Flash menganalisis teks, link, dan screenshot untuk menghasilkan skor risiko 0-100.
- 🔐 **Autentikasi Google OAuth2** - Login Google terhubung ke JWT session dan profil pengguna di database.
- 📊 **Dashboard Riwayat Pemindaian** - Riwayat scan tersimpan di Supabase PostgreSQL dengan filter, statistik, pagination, dan hapus data.
- 🎨 **UI Premium** - Glassmorphism, particles, Framer Motion, dan efek visual interaktif untuk pengalaman web modern.
- 🇮🇩 **100% Bahasa Indonesia** - Prompt AI dan rekomendasi keamanan disesuaikan dengan modus penipuan lokal.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, OGL |
| Backend | Express 4, TypeScript ESM, Helmet, CORS, rate limiting, Winston |
| Database | Supabase PostgreSQL, Prisma ORM |
| AI | Google Gemini 2.5 Flash via `@google/genai` |
| Auth | Google OAuth2, JWT |
| Deployment | Google Cloud Run (Frontend + Backend) |

## Cara Menjalankan Lokal

Pastikan Node.js 20+ sudah terpasang.

1. Clone repository dan masuk ke folder proyek.

```bash
git clone <repository-url>
cd aman-klik
```

2. Setup backend.

```bash
cd backend
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Isi `backend/.env` dengan `DATABASE_URL`, `GEMINI_API_KEY`, `JWT_SECRET`, dan `GOOGLE_CLIENT_ID`.

3. Setup frontend di terminal lain.

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Isi `frontend/.env.local` dengan `NEXT_PUBLIC_GOOGLE_CLIENT_ID` dan `NEXT_PUBLIC_API_URL`.

4. Buka aplikasi.

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000/api/v1/health
```

## Struktur Proyek

```text
aman-klik/
├── frontend/              # Next.js app
│   ├── src/app/           # App Router pages, layouts, metadata
│   ├── src/components/    # UI sections, layout, effects, pages
│   └── src/lib/           # API client dan auth context
├── backend/               # Express API
│   ├── prisma/            # Prisma schema
│   └── src/
│       ├── controllers/   # Auth, analysis, scans, contact
│       ├── database/      # Prisma client dan repositories
│       ├── middlewares/   # Auth, CORS, rate limiter, error handler
│       ├── routes/        # API routes
│       └── services/      # Gemini AI service
└── README.md
```

## API Endpoints

| Method | Endpoint | Auth | Fungsi |
|---|---|---|---|
| `GET` | `/api/v1/health` | Public | Health check backend |
| `POST` | `/api/v1/auth/google` | Public | Verifikasi Google ID token dan return JWT |
| `GET` | `/api/v1/auth/profile` | Required | Ambil profil user aktif |
| `POST` | `/api/v1/analysis/scan` | Optional | Analisis pesan dengan Gemini AI dan simpan hasil scan |
| `GET` | `/api/v1/scans` | Required | Ambil riwayat scan user dengan pagination dan filter |
| `GET` | `/api/v1/scans/stats` | Required | Ambil statistik scan user |
| `DELETE` | `/api/v1/scans/:id` | Required | Hapus scan milik user |
| `POST` | `/api/v1/contact` | Optional | Kirim pesan kontak atau laporan penipuan |

## Deployment

### Frontend ke Vercel

1. Push repository ke GitHub.
2. Import project di Vercel.
3. Set Root Directory ke `frontend`.
4. Build Command: `npm run build`.
5. Tambahkan environment variables:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
NEXT_PUBLIC_API_URL=https://your-backend-url.run.app/api/v1
```

### Backend ke Cloud Run atau Railway

1. Deploy folder `backend` menggunakan `backend/Dockerfile`.
2. Tambahkan environment variables:

```env
PORT=5000
NODE_ENV=production
DATABASE_URL=your_supabase_postgresql_url
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_secure_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

3. Jalankan Prisma generate dan push schema sesuai workflow platform:

```bash
npx prisma generate
npx prisma db push
```

### Google Cloud Console

Tambahkan domain production ke OAuth Client:

```text
Authorized JavaScript Origins:
https://your-frontend-domain.vercel.app

Authorized Redirect URIs:
https://your-frontend-domain.vercel.app
```

## Verification

```bash
cd backend
npx tsc --noEmit
npm run build

cd ../frontend
npx tsc --noEmit
npm run build
```

Docker backend:

```bash
cd backend
docker build -t amanklik-backend .
```

## Tim

Dibuat oleh Renoslendra untuk #JuaraVibeCoding2026.

## Lisensi

MIT License.
