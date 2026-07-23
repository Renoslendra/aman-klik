# AmanKlik AI Backend API

Layanan backend API yang profesional dan terstruktur menggunakan Express.js, TypeScript, dan SDK Google GenAI terbaru untuk mendeteksi ancaman penipuan digital (scams, phishing, social engineering).

---

## Fitur Utama

- **Analisis Pesan Instan** via Google Gemini API (`gemini-2.5-flash`).
- **Mock Mode Otomatis** — jika `GEMINI_API_KEY` tidak disetel, sistem secara otomatis beralih menggunakan simulasi analisis cerdas lokal agar pengembangan frontend tetap lancar.
- **Middleware Keamanan**:
  - `helmet` untuk proteksi header HTTP.
  - `cors` pembatasan domain pengakses.
  - `express-rate-limit` membatasi pengirim spam API.
- **Structured Logging** menggunakan `winston` (log otomatis tersimpan di folder `logs/`).
- **Desain Arsitektur MVC/Service Layer** yang bersih dan scalable.

---

## Cara Menjalankan Secara Lokal

### 1. Masuk ke Folder Backend & Install Dependencies
```bash
cd backend
npm install
```

### 2. Salin dan Konfigurasi Environment Variables
Salin berkas `.env.example` menjadi `.env` lalu isi nilai API key Anda:
```bash
cp .env.example .env
```

Buka file `.env` baru Anda:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
GEMINI_API_KEY=AIzaSy... (dapatkan dari https://aistudio.google.com/)
```

### 3. Jalankan Mode Development (Hot Reloading)
```bash
npm run dev
```
Server akan aktif di `http://localhost:5000` dengan logs interaktif di terminal.

### 4. Build & Jalankan Mode Produksi
```bash
npm run build
npm start
```

---

## Endpoint API Utama

### **POST** `/api/v1/analysis/scan`
Menganalisis pesan teks dari pengguna.

- **Request Body**:
```json
{
  "text": "Selamat! Nomor handphone Anda terpilih mendapatkan undian Rp 50 Juta dari Bank Mandiri. Klik link berikut untuk mengklaim: http://bit.ly/mandiri-pemenang"
}
```

- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "score": 95,
    "riskLevel": "high",
    "category": "Penipuan Undian Berhadiah",
    "summary": "Pesan ini mengklaim Anda memenangkan undian berhadiah besar. Modus ini biasanya meminta uang tebusan (pajak undian) atau meminta Anda mengisi formulir palsu untuk mencuri identitas Anda.",
    "redFlags": [
      {
        "indicator": "Pengumuman tidak resmi melalui SMS/WhatsApp biasa",
        "explanation": "Perusahaan besar tidak pernah mengumumkan pemenang undian menggunakan nomor handphone pribadi atau domain website gratisan.",
        "severity": "high"
      },
      {
        "indicator": "Permintaan biaya di awal",
        "explanation": "Penipu meminta korban membayar biaya administrasi atau pajak transfer terlebih dahulu sebelum hadiah dikirim.",
        "severity": "high"
      }
    ],
    "recommendations": [
      "Abaikan dan hapus pesan tersebut.",
      "Jangan mentransfer uang sepeser pun untuk alasan 'pajak undian'. Pajak hadiah resmi selalu dipotong langsung dari hadiah atau diurus secara tatap muka.",
      "Laporkan nomor pengirim ke pihak berwajib atau aplikasi pelapor spam."
    ]
  }
}
```

### **GET** `/api/v1/health`
Mengecek status kesehatan server (uptime, status, timestamp).

