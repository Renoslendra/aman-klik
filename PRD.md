# Product Requirements Document (PRD)
## AmanKlik AI — Platform Deteksi Penipuan Digital & Mode Darurat Siber Indonesia

---

## 📋 1. Ringkasan Produk (Product Summary)

| Atribut | Detail |
|---|---|
| **Nama Proyek** | AmanKlik AI |
| **Slogan** | Cek Dulu Sebelum Klik! |
| **Deskripsi Singkat** | Platform keamanan digital berbasis kecerdasan buatan (Gemini 2.5 Flash) untuk menganalisis pesan, link, dan screenshot chat mencurigakan, serta menyediakan penanganan darurat (AI Cyber Medic) bagi korban penipuan siber. |
| **Target Kompetisi** | **#INDONESIANEXT2026** (Indonesia Digital Literacy & Security Innovation) |
| **Tech Stack Utama** | Frontend: Next.js 15 (Vercel) \| Backend: Node.js Express (Railway) \| DB: Supabase PostgreSQL |

---

## 🎯 2. Latar Belakang Masalah di Indonesia

Tingkat kejahatan siber di Indonesia terus meningkat dengan modus yang semakin manipulatif. Beberapa modus operandi yang marak terjadi antara lain:
- **Modus APK Kurir / Undangan Pernikahan:** Modus pengiriman file `.apk` berbahaya melalui WhatsApp yang dirancang untuk meretas perangkat dan mengambil alih SMS OTP korban.
- **Phishing Perbankan:** Pesan manipulatif yang mengarahkan korban ke situs web bank palsu untuk mencuri kredensial login.
- **Investasi dan Undian Palsu:** Pesan berisi tawaran keuntungan tidak wajar yang menargetkan kalangan masyarakat awam.

Banyak masyarakat Indonesia, terutama kelompok rentan seperti orang tua dan pengguna yang kurang literasi teknis, menjadi korban. Permasalahan utamanya adalah **ketiadaan alat verifikasi awal yang cepat, gratis, mudah dipahami, dan ramah keluarga** untuk memverifikasi sebuah pesan atau tautan sebelum mereka mengambil tindakan.

---

## 👥 3. Target Pengguna (User Personas)

1. **Masyarakat Awam & Orang Tua (The Daily User)**
   - **Karakteristik:** Tidak memiliki latar belakang teknis IT yang kuat, sering menerima pesan berantai (broadcast) di WhatsApp/SMS.
   - **Kebutuhan:** Antarmuka yang intuitif, bahasa penjelasan yang sederhana tanpa jargon teknis, dan kesimpulan tegas ("Aman" atau "Berbahaya").

2. **Korban Penipuan yang Sedang Panik (The Emergency Victim)**
   - **Karakteristik:** Baru saja menyadari telah mengklik link phishing, menginstal APK berbahaya, atau mentransfer sejumlah uang.
   - **Kebutuhan:** Pertolongan pertama yang menenangkan (AI Cyber Medic), langkah mitigasi taktis instan (seperti pemblokiran kartu/akun), serta panduan pelaporan formal ke otoritas.

3. **Dewan Juri & Penggiat Keamanan Digital (The Evaluator)**
   - **Karakteristik:** Menilai kualitas inovasi, implementasi AI, ketahanan arsitektur sistem, dan kualitas antarmuka (UI/UX).
   - **Kebutuhan:** Performa latensi rendah, desain visual premium (Glassmorphism), dan kode yang terstruktur rapi dan *production-ready*.

---

## 🎯 4. Tujuan (Goals)

1. **Meningkatkan Literasi Keamanan:** Mengedukasi pengguna agar memiliki budaya *"Check First, Click Later"* (Cek dulu sebelum klik).
2. **Mitigasi Kerugian Finansial:** Memberikan deteksi dini terhadap tautan dan pesan scam sehingga menggagalkan niat korban untuk melakukan transfer atau memberikan OTP.
3. **Membantu Penanganan Pasca-Insiden:** Menghadirkan solusi darurat (*Emergency Mode*) bagi mereka yang sudah menjadi korban agar dapat meminimalkan kerugian lebih lanjut.

---

## 🛡️ 5. Fitur Utama (Key Features)

### 5.1 Modul Analisis & Pemindaian Risiko (Scam Detection Engine)
- **Analisis Teks & Link:** Pengguna dapat menempelkan (paste) teks pesan, tautan (URL), atau instruksi transfer. Sistem memberikan skor risiko (0–100), kategori penipuan, ringkasan penjelasan, serta daftar *red flags* yang terdeteksi.
- **Analisis Multi-modal Screenshot:** Pengguna dapat mengunggah bukti gambar tangkapan layar (screenshot) percakapan chat. AI melakukan ekstraksi teks (OCR) sekaligus menganalisis pola manipulasi visual (contoh: font mencurigakan, desain palsu).
- **Dashboard Riwayat Scan:** Setiap hasil pemindaian disimpan ke dalam database. Pengguna terdaftar dapat melacak riwayat, melihat statistik kerentanan, dan mengelola log pemindaian.

### 5.2 Modul Mode Darurat (Emergency Mode)
- **AI Cyber Medic:** Chatbot diagnosis interaktif bertenaga Gemini yang akan mewawancarai korban untuk menentukan tingkat keparahan insiden siber yang dialami, lalu menyajikan rencana tindakan pertolongan pertama secara terpersonalisasi.
- **Generator Surat Laporan Resmi:** Fitur pembuat draf surat laporan formal otomatis (untuk Bank, Kepolisian, atau Kominfo/ADUANKONTEN) berdasarkan input data insiden, yang dapat diunduh (format `.docx`).
- **Panduan Mitigasi Interaktif:** Daftar langkah-langkah darurat operasional untuk berbagai skenario (APK terinstal, akun WhatsApp diretas, atau uang telah ditransfer).
- **Hub Kontak Darurat:** Direktori kontak resmi (lengkap dengan logo SVG) untuk Bank, E-Wallet, dan otoritas pemerintah (OJK, Patroli Siber, CekRekening) yang langsung dapat dihubungi.

---

## 🔄 6. Alur Pengguna (User Flow)

1. **Pengguna Biasa (Pengecekan Kasual):**
   - Masuk ke beranda -> Tempel teks / unggah screenshot chat -> Tekan "Analisis Sekarang" -> Terima hasil analisis skor risiko dari AI -> Baca *Red Flags* dan saran rekomendasi.
2. **Pengguna Darurat (Korban Penipuan):**
   - Klik tombol merah "Mode Darurat" -> Masuk ke AI Cyber Medic -> Jawab pertanyaan singkat tentang insiden -> Terima instruksi pemblokiran/mitigasi -> Generate Surat Laporan Resmi -> Hubungi Call Center terkait melalui Hub Kontak Darurat.
3. **Pengguna Terdaftar (Power User):**
   - Login menggunakan Google OAuth -> Lakukan scan -> Masuk ke menu Dashboard Riwayat -> Lihat statistik personal dan tren deteksi penipuan.

---

## 🧠 7. Pemanfaatan AI (AI Utilization)

AmanKlik AI mengimplementasikan **Google Gemini 2.5 Flash** dengan pemanfaatan secara substansial, bukan sekadar gimik. AI digunakan dalam dua lapisan utama:

1. **Pemrosesan Multi-modal (Image & Text Analysis):** Model diinstruksikan melalui *System Prompt* keamanan siber untuk mengekstrak informasi konteks manipulasi sosial, nomor rekening fiktif, URL *typosquatting*, dan tautan *phishing* langsung dari gambar screenshot maupun teks *copy-paste*.
2. **Dynamic Decision Tree (AI Cyber Medic):** AI digunakan untuk memahami kondisi darurat pengguna dan memberikan instruksi pertolongan pertama (First-Aid) berdasarkan skenario insiden (contoh: perbedaan mitigasi antara "sudah klik link" vs "sudah install APK" vs "sudah transfer").

---

## 🏗️ 8. Arsitektur Sistem (System Architecture)

Aplikasi dibangun menggunakan arsitektur modern terpisah (Decoupled Architecture) untuk memastikan skalabilitas dan keamanan:

- **Frontend (Web Client):** Dibangun dengan **Next.js 15 (App Router)** dan **React 19**, menggunakan Tailwind CSS v4 dan Framer Motion untuk UI/UX berkelas premium bergaya *Glassmorphism*. Dideploy melalui **Vercel** untuk respons latensi rendah.
- **Backend (API Gateway):** Berbasis **Node.js Express 4 (TypeScript)** yang bertugas melayani validasi logika, proteksi rate-limiting, otentikasi JWT, dan komunikasi dengan Google Gemini SDK. Dideploy secara cloud-native melalui **Railway**.
- **Database Layer:** Menggunakan **Prisma ORM** yang terkoneksi ke **Supabase PostgreSQL** untuk menyimpan data pengguna, sesi, riwayat scan, dan template laporan.

---

## 🔒 9. Keamanan dan Privasi (Security and Privacy)

AmanKlik AI sangat menjaga integritas data pengguna dengan standar tinggi:
- **Stateless Authentication:** Menggunakan **Google OAuth 2.0** yang diverifikasi di sisi backend dan ditukar menjadi JSON Web Token (JWT), tanpa menyimpan password di database.
- **API Protection:** Backend dilengkapi dengan **Helmet** (Secure HTTP Headers), validasi CORS ketat, dan **IP Rate Limiting** untuk mencegah serangan DDoS atau eksploitasi API AI (spam).
- **Data Privacy:** Gambar screenshot yang diunggah diproses sementara di *memory* untuk analisis AI dan **tidak disimpan** secara permanen di server maupun database.

---

## 🚧 10. Batasan Produk (Product Limitations)

- **Tidak Ada Analisis Biner/Malware:** Sistem tidak melakukan analisis statis (decompilation) pada file APK itu sendiri, melainkan menganalisis teks, pola pengiriman, dan URL *download* dari file APK tersebut.
- **Bergantung pada Model AI:** Akurasi deteksi bergantung pada kapabilitas *reasoning* dari model Gemini 2.5 Flash terhadap *System Prompt* yang diberikan.

---

## 🤝 11. Dampak Sosial (Social Impact)

AmanKlik AI membawa misi inklusi literasi digital di Indonesia. Dengan menyediakan platform terpusat, masyarakat tidak perlu bingung harus melapor ke mana, atau bagaimana menyusun surat laporan kepolisian/bank yang sesuai standar. Intervensi teknologi ini berpotensi menyelamatkan miliaran rupiah dana masyarakat yang setiap tahunnya hilang akibat kelalaian dalam menanggapi penipuan siber.

---

## 🎥 12. Skenario Demo (Demo Scenario)

Saat mempresentasikan ke juri kompetisi, demonstrasi akan mengikuti alur berikut:
1. **Skenario 1 (Deteksi Undangan APK):** Mendemonstrasikan pengguna yang mengunggah screenshot pesan WhatsApp berisi file "Undangan_Pernikahan.apk". AI akan merespons dengan indikator bahaya (Skor Risiko Tinggi) dan melarang pengguna mengklik file tersebut.
2. **Skenario 2 (Mode Darurat):** Mengasumsikan pengguna sudah telanjur menginstal APK. Pengguna mengklik fitur "Mode Darurat", berinteraksi dengan AI Cyber Medic yang menginstruksikan untuk segera masuk ke *Airplane Mode*, lalu menggunakan fitur "Generator Surat Laporan" untuk mencetak dokumen lapor Bank secara instan (.docx).

---

## 📈 13. Metrik Keberhasilan (Success Metrics)

Keberhasilan proyek ini akan dievaluasi berdasarkan indikator berikut:
- **Akurasi AI (Precision & Recall):** Kemampuan Gemini dalam mengidentifikasi secara tepat pesan penipuan vs pesan aman dari berbagai dataset skenario penipuan lokal.
- **System Latency:** Waktu respons dari pengunggahan gambar/teks hingga kemunculan hasil analisis skor risiko (target < 5 detik).
- **User Engagement:** Jumlah pemindaian per sesi dan durasi waktu pada fitur Mode Darurat (menandakan manfaat praktis).
- **Keandalan Infrastruktur:** Uptime layanan di Vercel dan Railway tanpa ada *server timeout*.

---

> [!WARNING]
> ### ⚠️ Disclaimer (Penafian)
> **Hasil analisis, rekomendasi tingkat risiko, maupun diagnosis yang dihasilkan oleh kecerdasan buatan (Gemini AI) pada platform AmanKlik AI bersifat edukasi dan sebagai indikasi awal.** Keputusan akhir tetap berada di tangan pengguna. Analisis ini **bukanlah keputusan atau jaminan hukum formal** yang mengikat. Dalam kondisi kejahatan finansial yang nyata, pengguna diwajibkan untuk tetap menghubungi pihak yang berwenang (Bank, Kepolisian, Kominfo).


