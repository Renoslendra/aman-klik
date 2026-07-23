import {
  GoogleGenAI,
  createPartFromBase64,
  createPartFromText,
  createUserContent,
} from "@google/genai";
import config from "../config/env.js";
import logger from "../utils/logger.js";
import { AnalysisResponse, EmergencyDiagnosisResponse } from "../types/index.js";

// Initialize separate Gemini AI Clients for each feature to split quota
let emergencyClient: GoogleGenAI | null = null;
let analysisClient: GoogleGenAI | null = null;

// Client 1: Emergency Diagnosis (AI Cyber Medic)
if (config.GEMINI_API_KEY) {
  try {
    emergencyClient = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
    logger.info("Gemini Emergency Client initialized successfully.");
  } catch (error) {
    logger.error("Failed to initialize Gemini Emergency Client:", error);
  }
} else {
  logger.warn("GEMINI_API_KEY is not set. Emergency diagnosis will run in mock mode.");
}

// Client 2: Message Analysis (Cek Pesan / Analisis Risiko)
const analysisApiKey = config.GEMINI_API_KEY_ANALYSIS || config.GEMINI_API_KEY;
if (analysisApiKey) {
  try {
    analysisClient = new GoogleGenAI({ apiKey: analysisApiKey });
    logger.info("Gemini Analysis Client initialized successfully.");
  } catch (error) {
    logger.error("Failed to initialize Gemini Analysis Client:", error);
  }
} else {
  logger.warn("GEMINI_API_KEY_ANALYSIS is not set. Analysis will run in mock mode.");
}

type EmergencyAction = EmergencyDiagnosisResponse["actionPlan"][number]["action"];

function normalizeEmergencyPhoneValue(value: string): string | null {
  const rawValue = String(value || "").replace(/^tel:/i, "").trim();
  const candidates = rawValue.match(/\+?\d[\d\s().-]*\d/g) || [rawValue];
  const candidate =
    candidates
      .map((item) => item.trim().replace(/^\d+[.)]\s*/, ""))
      .find((item) => item.replace(/\D/g, "").length >= 3) || rawValue;
  const cleaned = candidate.replace(/[^\d+]/g, "");
  const normalized = cleaned.startsWith("+") ? `+${cleaned.slice(1).replace(/\+/g, "")}` : cleaned.replace(/\+/g, "");

  if (!normalized) {
    return null;
  }

  return `tel:${normalized}`;
}

function normalizeEmergencyLinkValue(value: string): string | null {
  const trimmedValue = String(value || "").trim();

  if (!trimmedValue) {
    return null;
  }

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue.replace(/^\/+/, "")}`;
}

function normalizeEmergencyAction(action: EmergencyAction): EmergencyAction {
  if (!action) {
    return null;
  }

  const value = action.type === "phone" ? normalizeEmergencyPhoneValue(action.value) : normalizeEmergencyLinkValue(action.value);

  if (!value) {
    return null;
  }

  return {
    ...action,
    value,
  };
}

export class GeminiService {
  /**
   * Analyzes a text message for scams, phishing, or social engineering indicators.
   */
  public static async analyzeMessage(text: string): Promise<AnalysisResponse> {
    return this.analyzeInput({ text });
  }

  /**
   * Analyzes text and/or screenshot images for scams, phishing, or social engineering indicators.
   */
  public static async analyzeInput(input: {
    text?: string;
    image?: {
      data: string;
      mimeType: string;
    };
  }): Promise<AnalysisResponse> {
    const text = input.text?.trim() || "";
    const hasImage = Boolean(input.image?.data && input.image?.mimeType);

    if (!text || text.trim().length === 0) {
      if (!hasImage) {
        throw new Error("Pesan teks atau screenshot tidak boleh kosong.");
      }
    }

    if (!analysisClient) {
      logger.info("GEMINI_API_KEY_ANALYSIS missing. Falling back to Mock Analysis Mode.");
      return this.getMockAnalysis(text || "[Screenshot tanpa teks tambahan]", hasImage);
    }

    try {
      const prompt = `Anda adalah AHLI KEAMANAN SIBER Indonesia yang menganalisis pesan/screenshot untuk mendeteksi penipuan digital.

===== ATURAN ANALISIS =====
1. Baca SELURUH teks yang ada — dari input user maupun yang terlihat di screenshot.
2. Perhatikan indikator penipuan: URL mencurigakan, nomor pengirim tidak resmi, permintaan OTP/PIN, file APK, instruksi transfer ke rekening pribadi, klaim hadiah, tekanan waktu ("harus hari ini"), dan tata bahasa buruk.
3. Untuk pesan AMAN (chat biasa, notifikasi resmi, percakapan normal), beri skor RENDAH (0-20) dan riskLevel "safe".
4. Untuk pesan MENCURIGAKAN tapi belum pasti, beri skor SEDANG (30-60) dan riskLevel "medium".
5. Untuk pesan JELAS PENIPUAN (ada link phishing, minta transfer, minta OTP, file APK), beri skor TINGGI (70-100) dan riskLevel "high".
6. DILARANG mengarang indikator yang tidak ada di pesan asli.
7. DILARANG memberikan skor tinggi untuk pesan yang jelas aman/normal.
8. WAJIB menggunakan Bahasa Indonesia yang ramah dan mudah dipahami orang awam.

===== REFERENSI CIRI PENIPUAN =====
- Link pendek (bit.ly, s.id, tinyurl) di pesan tak dikenal → TINGGI
- Nomor HP biasa mengaku sebagai bank/instansi → TINGGI
- Permintaan OTP, PIN, password → SANGAT TINGGI
- File APK dari chat/SMS → SANGAT TINGGI
- Klaim hadiah/undian tanpa ikut lomba → TINGGI
- "Paket Anda tertahan, klik link" → TINGGI (modus kurir)
- Notifikasi resmi dari app (Go-Jek, Tokopedia, dll) → AMAN
- Chat biasa antar teman/keluarga → AMAN
- Promosi dari akun bisnis terverifikasi → AMAN-SEDANG

===== INPUT DARI PENGGUNA =====
"""
${text || "Tidak ada teks tambahan. Analisis berdasarkan screenshot yang dilampirkan."}
"""

===== FORMAT RESPON =====
Berikan JSON murni tanpa markdown, tanpa komentar:
{
  "score": number (0-100),
  "riskLevel": "safe" | "medium" | "high",
  "category": string (contoh: "Phishing Link", "Modus Kurir Paket", "Penipuan Hadiah", "Social Engineering", "SMS Spam", "Aman / Pesan Normal"),
  "summary": string (ringkasan 2-3 kalimat, jelaskan MENGAPA pesan ini aman/berbahaya berdasarkan fakta yang ada),
  "redFlags": [
    {
      "indicator": string (ciri yang BENAR-BENAR ADA di pesan),
      "explanation": string (mengapa ini mencurigakan),
      "severity": "high" | "medium" | "low"
    }
  ],
  "recommendations": [string (rekomendasi tindakan praktis)]
}

Jika pesan AMAN, redFlags boleh kosong [] dan recommendations berisi tips umum menjaga keamanan.`;

      const contents = input.image
        ? createUserContent([
            createPartFromText(prompt),
            createPartFromBase64(input.image.data, input.image.mimeType),
          ])
        : prompt;

      // Retry logic for rate limit (429) errors
      let lastError: unknown = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await analysisClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
              responseMimeType: "application/json",
              temperature: 0.2,
              topP: 0.85,
              topK: 30,
            },
          });

          const responseText = response.text;
          if (!responseText) {
            throw new Error("Menerima respon kosong dari Gemini API.");
          }

          const result: AnalysisResponse = JSON.parse(responseText);

          // Validate riskLevel matches score
          if (result.score < 30) result.riskLevel = "safe";
          else if (result.score < 70) result.riskLevel = "medium";
          else result.riskLevel = "high";

          logger.info(`Message analyzed by Gemini. Risk score: ${result.score}, Level: ${result.riskLevel}`);
          return result;
        } catch (error: unknown) {
          lastError = error;
          const errorStr = error instanceof Error ? error.message : String(error);
          if (errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("quota")) {
            const retryDelay = Math.min(5000 * Math.pow(2, attempt), 30000);
            logger.warn(`Gemini Analysis rate limited (attempt ${attempt + 1}/3). Retrying in ${retryDelay / 1000}s...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            continue;
          }
          break;
        }
      }

      logger.error("Error calling Gemini Analysis API (all retries exhausted):", lastError);
      return this.getMockAnalysis(text || "[Screenshot tanpa teks tambahan]", hasImage);
    } catch (error) {
      logger.error("Error calling Gemini Analysis API, falling back to mock:", error);
      return this.getMockAnalysis(text || "[Screenshot tanpa teks tambahan]", hasImage);
    }
  }

  /**
   * Diagnoses an emergency cyber incident and generates a personalized recovery action plan.
   */
  public static async diagnoseEmergency(
    description: string,
    category?: string
  ): Promise<EmergencyDiagnosisResponse> {
    if (!emergencyClient) {
      logger.info("GEMINI_API_KEY missing. Falling back to Mock Emergency Diagnosis.");
      return this.getMockEmergencyDiagnosis(description, category);
    }

    try {
      // Map kategori ke label yang lebih deskriptif untuk AI
      const categoryLabels: Record<string, string> = {
        transfer: "Korban sudah mentransfer uang ke penipu",
        otp: "Korban telah memberikan kode OTP atau PIN ke pihak lain",
        hack: "Akun korban telah diambil alih / diretas",
        link: "Korban telah mengklik link mencurigakan (phishing)",
        apk: "Korban telah menginstal file APK mencurigakan (malware)",
        other: "Insiden keamanan siber lainnya",
      };

      const categoryContext = category && categoryLabels[category]
        ? `\nKATEGORI INSIDEN YANG DIPILIH KORBAN: "${categoryLabels[category]}"\nKategori kode: "${category}"\nPastikan diagnosis dan rencana aksi SESUAI dengan kategori ini.`
        : "\nKorban tidak memilih kategori spesifik. Tentukan kategori dari deskripsi.";

      const prompt = `PERAN: Anda adalah "AI Cyber Medic", dokter siber darurat untuk korban penipuan digital di Indonesia. Anda HARUS menganalisis deskripsi insiden korban dengan sangat teliti dan menghasilkan rencana aksi pemulihan yang AKURAT, SPESIFIK, dan PERSONAL.

===== FASE 1: EKSTRAKSI FAKTA (lakukan secara internal) =====
Baca deskripsi korban dengan cermat. Ekstrak semua fakta berikut jika disebutkan:
- Bank PENGIRIM (bank korban): nama bank spesifik
- Bank PENERIMA (bank pelaku): nama bank spesifik
- Platform penipuan: Instagram, WhatsApp, Tokopedia, Shopee, dll.
- Jumlah kerugian: nominal uang yang hilang
- Waktu kejadian: kapan insiden terjadi
- Metode penipuan: transfer, OTP bocor, klik link, instal APK, hack akun, dll.
- Detail lain: nama penipu, nomor rekening, URL mencurigakan, dll.

===== FASE 2: ATURAN KETAT =====

DILARANG KERAS:
1. DILARANG mengarang atau menambahkan fakta yang TIDAK ADA dalam deskripsi korban.
2. DILARANG menyebutkan nama bank yang TIDAK disebutkan korban kecuali dalam konteks "jika bank Anda adalah X, hubungi Y".
3. DILARANG memberikan nomor call center bank yang TIDAK relevan dengan kasus korban.
4. DILARANG mengubah konteks insiden — jika korban bilang "transfer", jangan diagnosis sebagai "hack akun".
5. DILARANG memberikan langkah yang tidak relevan dengan jenis insiden korban.

WAJIB:
1. WAJIB membaca SELURUH deskripsi korban sebelum membuat diagnosis.
2. WAJIB mencocokkan diagnosis dengan kategori insiden yang dipilih korban.
3. WAJIB menyebutkan detail spesifik dari deskripsi korban (nama bank, nominal, platform) di dalam diagnosis dan langkah aksi.
4. WAJIB memberikan nomor telepon resmi yang sesuai dengan bank yang disebutkan korban.
5. WAJIB mengurutkan langkah dari paling mendesak (critical) ke yang bisa ditunda (medium).
6. WAJIB menggunakan Bahasa Indonesia yang ramah, tenang, dan mudah dipahami orang awam.
7. WAJIB memberikan 5-8 langkah aksi yang realistis dan actionable.

===== FASE 3: PANDUAN PER KATEGORI =====

Jika kategori "transfer" (sudah transfer uang):
- Urgensi: SELALU "critical" — waktu sangat berharga
- Langkah pertama: hubungi call center bank PENGIRIM (bank korban) untuk minta hold fund / blokir rekening tujuan
- Langkah kedua: hubungi call center bank PENERIMA (bank pelaku) jika diketahui
- Sertakan langkah: screenshot bukti, lapor CekRekening.id, lapor PatroliSiber.id, jangan hubungi pelaku lagi

Jika kategori "otp" (OTP/PIN bocor):
- Urgensi: SELALU "critical" — akun bisa dikuras dalam hitungan menit
- Langkah pertama: hubungi call center bank/e-wallet terkait untuk blokir sementara
- Langkah kedua: ganti semua PIN dan password dari perangkat aman
- Sertakan langkah: cabut sesi perangkat asing, amankan email utama, aktifkan 2FA

Jika kategori "hack" (akun diambil alih):
- Urgensi: "high" sampai "critical" tergantung apakah akun keuangan terdampak
- Langkah pertama: buka halaman recovery resmi platform yang diretas
- Langkah kedua: amankan email utama (ganti password + aktifkan 2FA)
- Sertakan langkah: cabut sesi asing, beritahu kontak dekat, laporkan ke platform

Jika kategori "link" (klik link phishing):
- Urgensi: "high" — jika sudah memasukkan data login, naik ke "critical"
- Langkah pertama: ganti password akun yang datanya sudah dimasukkan
- Langkah kedua: cek mutasi jika akun bank/e-wallet terdampak
- Sertakan langkah: aktifkan 2FA, hapus cache browser, laporkan URL

Jika kategori "apk" (instal APK mencurigakan):
- Urgensi: SELALU "critical" — malware bisa membaca SMS OTP
- Langkah pertama: matikan WiFi dan data seluler di perangkat yang terinfeksi
- Langkah kedua: hubungi bank dari perangkat LAIN yang bersih
- Sertakan langkah: uninstall APK, ganti password dari perangkat bersih, scan perangkat

===== REFERENSI NOMOR RESMI =====
Gunakan HANYA nomor yang relevan dengan bank/e-wallet yang disebutkan korban:
- BRI: 14017 atau 1500017
- BCA: 1500888
- Mandiri: 14000
- BNI: 1500046
- BSI: 14040
- DANA: 1500445
- OVO: 1500696
- GoPay: 1500729
- ShopeePay: 1500702
- LinkAja: 150911
- OJK (Otoritas Jasa Keuangan): 157
- Polisi (Patroli Siber): https://patrolisiber.id
- CekRekening: https://cekrekening.id
- Aduan Konten Kominfo: https://aduankonten.id

===== LINK PEMULIHAN AKUN =====
Gunakan HANYA jika platform tersebut disebutkan oleh korban:
- Google: https://accounts.google.com/signin/recovery
- Facebook: https://www.facebook.com/hacked
- Instagram: https://help.instagram.com/368191326593075
- WhatsApp: https://faq.whatsapp.com/1131652977717250
- Telegram: Buka Settings > Devices > Terminate All Other Sessions
- Twitter/X: https://help.twitter.com/en/safety-and-security/twitter-account-compromised

${categoryContext}

===== DESKRIPSI INSIDEN DARI KORBAN =====
"""
${description}
"""

===== FORMAT RESPON =====
Berikan JSON murni tanpa markdown, tanpa komentar, dengan struktur PERSIS berikut:
{
  "urgencyLevel": "critical" | "high" | "medium",
  "urgencyMessage": "string — pesan urgensi singkat yang mencerminkan situasi SPESIFIK korban, bukan generik",
  "timeWindow": "string — estimasi waktu kritis berdasarkan jenis insiden",
  "diagnosis": "string — paragraf diagnosis yang WAJIB menyebutkan detail spesifik dari deskripsi korban (bank, nominal, platform, waktu)",
  "actionPlan": [
    {
      "step": 1,
      "title": "string — judul langkah singkat",
      "detail": "string — penjelasan detail yang SPESIFIK sesuai kasus korban, bukan generik",
      "urgency": "critical" | "high" | "medium",
      "action": { "type": "phone" | "link", "value": "string — format tel:NOMOR atau https://URL", "label": "string — label tombol yang jelas" } | null
    }
  ],
  "importantNotes": ["string — catatan penting yang relevan dengan kasus spesifik korban"]
}

INGAT: Respon Anda HARUS akurat, spesifik sesuai deskripsi korban, dan tidak boleh mengarang fakta. Jika informasi tidak disebutkan korban, jangan asumsikan — gunakan frasa seperti "jika bank Anda adalah..." atau "segera hubungi bank terkait".`;

      // Retry logic for rate limit (429) errors
      let lastError: unknown = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await emergencyClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              temperature: 0.1,
              topP: 0.8,
              topK: 20,
            },
          });

          const responseText = response.text;
          if (!responseText) {
            throw new Error("Menerima respon kosong dari Gemini API.");
          }

          const result: EmergencyDiagnosisResponse = JSON.parse(responseText);
          if (!result.urgencyLevel || !Array.isArray(result.actionPlan)) {
            throw new Error("Format respon diagnosis darurat tidak valid.");
          }

          // Validate urgencyLevel is one of the allowed values
          const validUrgencies = ["critical", "high", "medium"] as const;
          if (!validUrgencies.includes(result.urgencyLevel)) {
            result.urgencyLevel = "high";
          }

          // Validate each action step has valid urgency
          result.actionPlan.forEach((step) => {
            if (!validUrgencies.includes(step.urgency)) {
              step.urgency = "high";
            }
          });

          const normalizedResult: EmergencyDiagnosisResponse = {
            ...result,
            actionPlan: result.actionPlan.map((step) => ({
              ...step,
              action: normalizeEmergencyAction(step.action),
            })),
            importantNotes: Array.isArray(result.importantNotes) ? result.importantNotes : [],
          };

          logger.info(`Emergency diagnosed by Gemini. Urgency: ${normalizedResult.urgencyLevel}`);
          return normalizedResult;
        } catch (error: unknown) {
          lastError = error;
          // Check if it's a rate limit error (429) and retry after delay
          const errorStr = error instanceof Error ? error.message : String(error);
          if (errorStr.includes("429") || errorStr.includes("RESOURCE_EXHAUSTED") || errorStr.includes("quota")) {
            const retryDelay = Math.min(5000 * Math.pow(2, attempt), 30000); // 5s, 10s, 20s max 30s
            logger.warn(`Gemini rate limited (attempt ${attempt + 1}/3). Retrying in ${retryDelay / 1000}s...`);
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            continue;
          }
          // For non-rate-limit errors, don't retry
          break;
        }
      }

      logger.error("Error calling Gemini for emergency diagnosis (all retries exhausted):", lastError);
      return this.getMockEmergencyDiagnosis(description, category);
    } catch (error) {
      logger.error("Error calling Gemini for emergency diagnosis:", error);
      return this.getMockEmergencyDiagnosis(description, category);
    }
  }

  /**
   * Detects bank names mentioned in the user's description and returns
   * the first match with its call center info.
   */
  private static detectBanks(description: string): Array<{ name: string; phone: string; phoneLabel: string }> {
    const descLower = description.toLowerCase();
    const bankDatabase: Array<{ keywords: string[]; name: string; phone: string; phoneLabel: string }> = [
      { keywords: ["bca", "bank central asia"], name: "BCA", phone: "tel:1500888", phoneLabel: "Hubungi BCA 1500888" },
      { keywords: ["bri", "bank rakyat indonesia"], name: "BRI", phone: "tel:14017", phoneLabel: "Hubungi BRI 14017" },
      { keywords: ["mandiri", "bank mandiri"], name: "Mandiri", phone: "tel:14000", phoneLabel: "Hubungi Mandiri 14000" },
      { keywords: ["bni", "bank negara indonesia"], name: "BNI", phone: "tel:1500046", phoneLabel: "Hubungi BNI 1500046" },
      { keywords: ["bsi", "bank syariah indonesia"], name: "BSI", phone: "tel:14040", phoneLabel: "Hubungi BSI 14040" },
      { keywords: ["dana"], name: "DANA", phone: "tel:1500445", phoneLabel: "Hubungi DANA 1500445" },
      { keywords: ["ovo"], name: "OVO", phone: "tel:1500696", phoneLabel: "Hubungi OVO 1500696" },
      { keywords: ["gopay", "gojek"], name: "GoPay", phone: "tel:1500729", phoneLabel: "Hubungi GoPay 1500729" },
      { keywords: ["shopeepay", "shopee"], name: "ShopeePay", phone: "tel:1500702", phoneLabel: "Hubungi ShopeePay 1500702" },
      { keywords: ["linkaja", "link aja"], name: "LinkAja", phone: "tel:150911", phoneLabel: "Hubungi LinkAja 150911" },
    ];

    return bankDatabase.filter((bank) => bank.keywords.some((kw) => descLower.includes(kw)));
  }

  /**
   * Detects monetary amounts mentioned in the description.
   */
  private static detectAmount(description: string): string | null {
    const match = description.match(/[Rr]p\.?\s*([\d.,]+)/);
    if (match) {
      return `Rp ${match[1]}`;
    }
    return null;
  }

  /**
   * Detects platform names mentioned in the description.
   */
  private static detectPlatform(description: string): string | null {
    const descLower = description.toLowerCase();
    const platforms = [
      { keywords: ["instagram", "ig"], name: "Instagram" },
      { keywords: ["whatsapp", "wa"], name: "WhatsApp" },
      { keywords: ["facebook", "fb"], name: "Facebook" },
      { keywords: ["telegram", "tele"], name: "Telegram" },
      { keywords: ["tokopedia", "tokped"], name: "Tokopedia" },
      { keywords: ["shopee"], name: "Shopee" },
      { keywords: ["bukalapak"], name: "Bukalapak" },
      { keywords: ["lazada"], name: "Lazada" },
      { keywords: ["twitter", "x.com"], name: "Twitter/X" },
      { keywords: ["tiktok"], name: "TikTok" },
    ];
    const found = platforms.find((p) => p.keywords.some((kw) => descLower.includes(kw)));
    return found ? found.name : null;
  }

  /**
   * Smart mock emergency diagnosis that reads the user's description
   * and generates contextual responses based on category + detected details.
   */
  private static getMockEmergencyDiagnosis(
    description: string,
    category?: string
  ): EmergencyDiagnosisResponse {
    const descLower = description.toLowerCase();
    const banks = this.detectBanks(description);
    const amount = this.detectAmount(description);
    const platform = this.detectPlatform(description);

    // PERBAIKAN UTAMA: Prioritaskan kategori yang dipilih user, bukan keyword matching
    let effectiveCategory = category;
    if (!effectiveCategory || effectiveCategory === "other") {
      // Hanya fallback ke keyword jika user tidak memilih kategori spesifik
      if (descLower.includes("otp") || descLower.includes("kode verifikasi") || descLower.includes("pin")) {
        effectiveCategory = "otp";
      } else if (descLower.includes("hack") || descLower.includes("diambil alih") || descLower.includes("diretas")) {
        effectiveCategory = "hack";
      } else if (descLower.includes("apk") || descLower.includes("kurir") || descLower.includes("instal")) {
        effectiveCategory = "apk";
      } else if (descLower.includes("link") || descLower.includes("klik") || descLower.includes("phishing")) {
        effectiveCategory = "link";
      } else if (descLower.includes("transfer") || descLower.includes("kirim uang") || descLower.includes("rekening")) {
        effectiveCategory = "transfer";
      } else {
        effectiveCategory = "other";
      }
    }

    // Helper: buat action call center berdasarkan bank yang terdeteksi
    const primaryBank = banks[0] || { name: "bank Anda", phone: "tel:14000", phoneLabel: "Hubungi call center bank Anda" };
    const secondaryBank = banks[1] || null;

    // Helper: buat diagnosis string yang kontekstual
    const amountInfo = amount ? ` sebesar ${amount}` : "";
    const platformInfo = platform ? ` melalui ${platform}` : "";
    const bankInfo = banks.length > 0
      ? ` (${banks.map((b) => b.name).join(" → ")})`
      : "";

    if (effectiveCategory === "transfer") {
      return {
        urgencyLevel: "critical",
        urgencyMessage: `KRITIS - Segera hubungi ${primaryBank.name} untuk hold fund rekening tujuan.`,
        timeWindow: "15-60 menit pertama adalah waktu paling penting",
        diagnosis:
          `Anda kemungkinan menjadi korban penipuan transfer dana${amountInfo}${platformInfo}${bankInfo}. Fokus utama saat ini adalah meminta bank menandai atau membekukan rekening tujuan sebelum dana ditarik pelaku.`,
        actionPlan: [
          {
            step: 1,
            title: `Telepon call center ${primaryBank.name}`,
            detail:
              `Sampaikan bahwa Anda korban penipuan online, baru melakukan transfer${amountInfo}, dan minta bantuan blokir atau hold fund rekening tujuan. Catat nomor tiket laporan.`,
            urgency: "critical",
            action: { type: "phone", value: primaryBank.phone, label: primaryBank.phoneLabel },
          },
          ...(secondaryBank
            ? [
                {
                  step: 2,
                  title: `Telepon bank penerima (${secondaryBank.name})`,
                  detail:
                    `Hubungi call center ${secondaryBank.name} juga untuk mempercepat pelaporan dan pembekuan rekening tujuan pelaku.`,
                  urgency: "critical" as const,
                  action: { type: "phone" as const, value: secondaryBank.phone, label: secondaryBank.phoneLabel },
                },
              ]
            : [
                {
                  step: 2,
                  title: "Telepon bank penerima jika diketahui",
                  detail:
                    "Jika rekening tujuan berada di bank lain, hubungi call center bank tersebut juga untuk mempercepat pelaporan rekening tujuan.",
                  urgency: "critical" as const,
                  action: null,
                },
              ]),
          {
            step: 3,
            title: "Screenshot seluruh bukti",
            detail:
              `Simpan bukti transfer, chat${platform ? ` di ${platform}` : ""}, profil akun pelaku, nomor rekening, nama pemilik rekening, dan link transaksi.`,
            urgency: "critical",
            action: null,
          },
          {
            step: 4,
            title: "Laporkan rekening ke CekRekening",
            detail:
              "Masukkan rekening atau e-wallet pelaku agar tercatat di portal pelaporan rekening terindikasi tindak pidana.",
            urgency: "high",
            action: { type: "link", value: "https://cekrekening.id", label: "Buka CekRekening.id" },
          },
          {
            step: 5,
            title: "Buat laporan ke Patroli Siber",
            detail:
              "Unggah bukti yang sudah dikumpulkan melalui kanal pengaduan siber resmi.",
            urgency: "high",
            action: { type: "link", value: "https://patrolisiber.id", label: "Buka PatroliSiber.id" },
          },
          {
            step: 6,
            title: "Jangan hubungi pelaku lagi",
            detail:
              "Komunikasi lanjutan dapat membuka ruang penipuan berlapis. Setelah bukti lengkap, blokir akun atau nomor pelaku.",
            urgency: "medium",
            action: null,
          },
        ],
        importantNotes: [
          "Dana masih mungkin diselamatkan jika laporan masuk sangat cepat dan saldo belum ditarik pelaku.",
          "Bank tidak akan meminta OTP, PIN, password, atau CVV saat menerima laporan.",
          "Gunakan generator surat kronologis di halaman darurat untuk menyiapkan dokumen bank dan polisi.",
        ],
      };
    }

    if (effectiveCategory === "otp") {
      return {
        urgencyLevel: "critical",
        urgencyMessage: `KRITIS - OTP atau PIN bocor, segera amankan akun ${primaryBank.name}.`,
        timeWindow: "Tindakan perlu dilakukan dalam hitungan menit",
        diagnosis:
          `Kode OTP atau PIN yang sudah diberikan ke pihak lain dapat dipakai untuk mengambil alih transaksi${bankInfo}. Perlakukan akun bank, e-wallet, dan email yang terhubung sebagai berisiko.${amountInfo ? ` Potensi kerugian: ${amount}.` : ""}`,
        actionPlan: [
          {
            step: 1,
            title: `Hubungi ${primaryBank.name} segera`,
            detail:
              `Minta blokir sementara seluruh transaksi dan jelaskan bahwa OTP atau PIN sudah diketahui pihak lain.`,
            urgency: "critical",
            action: { type: "phone", value: primaryBank.phone, label: primaryBank.phoneLabel },
          },
          ...(secondaryBank
            ? [
                {
                  step: 2,
                  title: `Hubungi ${secondaryBank.name} juga`,
                  detail:
                    `Jika ada dana yang ditransfer ke ${secondaryBank.name}, hubungi untuk melaporkan dan meminta pembekuan rekening tujuan.`,
                  urgency: "critical" as const,
                  action: { type: "phone" as const, value: secondaryBank.phone, label: secondaryBank.phoneLabel },
                },
              ]
            : []),
          {
            step: secondaryBank ? 3 : 2,
            title: "Ganti PIN dan password",
            detail:
              "Lakukan dari perangkat aman. Jika tidak bisa login, minta pemulihan resmi melalui call center atau cabang.",
            urgency: "critical",
            action: null,
          },
          {
            step: secondaryBank ? 4 : 3,
            title: "Cabut semua sesi perangkat asing",
            detail:
              "Periksa daftar perangkat login pada mobile banking, email, marketplace, dan media sosial.",
            urgency: "high",
            action: null,
          },
          {
            step: secondaryBank ? 5 : 4,
            title: "Amankan email utama",
            detail:
              "Ganti password email dan aktifkan 2FA karena email sering dipakai untuk reset akun keuangan.",
            urgency: "high",
            action: null,
          },
          {
            step: secondaryBank ? 6 : 5,
            title: "Pantau mutasi transaksi",
            detail:
              "Simpan screenshot transaksi mencurigakan dan segera laporkan jika ada dana keluar.",
            urgency: "medium",
            action: null,
          },
        ],
        importantNotes: [
          "Jangan beri OTP atau PIN kepada siapa pun, termasuk yang mengaku petugas bank atau polisi.",
          "Jika transaksi sudah terjadi, segera ikuti jalur laporan transfer dana.",
        ],
      };
    }

    if (effectiveCategory === "hack") {
      const platformRecoveryLinks: Record<string, { value: string; label: string }> = {
        Google: { value: "https://accounts.google.com/signin/recovery", label: "Google Recovery" },
        WhatsApp: { value: "https://faq.whatsapp.com/1131652977717250", label: "Pemulihan WhatsApp" },
        Instagram: { value: "https://help.instagram.com/368191326593075", label: "Pemulihan Instagram" },
        Facebook: { value: "https://www.facebook.com/hacked", label: "Pemulihan Facebook" },
        Telegram: { value: "https://telegram.org", label: "Buka Telegram Settings > Devices" },
        "Twitter/X": { value: "https://help.twitter.com/en/safety-and-security/twitter-account-compromised", label: "Pemulihan Twitter/X" },
      };
      const recoveryLink = platform && platformRecoveryLinks[platform]
        ? platformRecoveryLinks[platform]
        : { value: "https://accounts.google.com/signin/recovery", label: "Google Recovery" };

      return {
        urgencyLevel: "high",
        urgencyMessage: `TINGGI - Mulai pemulihan akun${platform ? ` ${platform}` : ""} dari kanal resmi.`,
        timeWindow: "Kerjakan pemulihan hari ini dan amankan email utama",
        diagnosis:
          `Akun Anda${platform ? ` di ${platform}` : ""} terindikasi diambil alih atau disalahgunakan. Prioritasnya adalah menguasai kembali email atau nomor pemulihan, lalu mencabut sesi pelaku.`,
        actionPlan: [
          {
            step: 1,
            title: `Buka halaman pemulihan resmi${platform ? ` ${platform}` : ""}`,
            detail:
              "Gunakan recovery resmi platform. Jangan memakai jasa pemulihan akun dari DM atau iklan.",
            urgency: "critical",
            action: { type: "link", value: recoveryLink.value, label: recoveryLink.label },
          },
          {
            step: 2,
            title: "Ganti password email utama",
            detail:
              "Email adalah pusat pemulihan akun. Ganti password, aktifkan 2FA, dan periksa perangkat login.",
            urgency: "critical",
            action: null,
          },
          {
            step: 3,
            title: "Cabut sesi perangkat asing",
            detail:
              "Logout dari perangkat tidak dikenal dan hapus aplikasi pihak ketiga mencurigakan.",
            urgency: "high",
            action: null,
          },
          {
            step: 4,
            title: "Beri tahu kontak dekat",
            detail:
              "Kabari keluarga atau teman bahwa akun sempat diretas agar mereka tidak menuruti permintaan uang atau OTP.",
            urgency: "high",
            action: null,
          },
          {
            step: 5,
            title: "Laporkan aktivitas pelaku",
            detail:
              `Gunakan fitur report di ${platform || "platform terkait"} dan simpan bukti postingan, chat, atau perubahan email.`,
            urgency: "medium",
            action: null,
          },
        ],
        importantNotes: [
          "Sebagian besar akun masih bisa dipulihkan jika email atau nomor HP utama masih Anda kuasai.",
          "Setelah akun pulih, aktifkan 2FA dengan aplikasi authenticator bila tersedia.",
        ],
      };
    }

    if (effectiveCategory === "apk") {
      return {
        urgencyLevel: "critical",
        urgencyMessage: "KRITIS - APK mencurigakan bisa membaca SMS dan OTP Anda.",
        timeWindow: "Putuskan koneksi dan amankan akun dalam 15 menit",
        diagnosis:
          `File APK dari chat${platform ? ` ${platform}` : ""} atau pesan kurir palsu berisiko memasang malware. Prioritasnya adalah menghentikan akses perangkat dan mengamankan akun keuangan dari perangkat lain.`,
        actionPlan: [
          {
            step: 1,
            title: "Putuskan koneksi perangkat",
            detail:
              "Matikan WiFi dan data seluler pada perangkat yang memasang APK agar aplikasi tidak terus mengirim data.",
            urgency: "critical",
            action: null,
          },
          {
            step: 2,
            title: `Hubungi ${primaryBank.name} dari perangkat lain`,
            detail:
              "Minta blokir sementara transaksi jika perangkat yang terinfeksi memiliki mobile banking atau SMS OTP.",
            urgency: "critical",
            action: { type: "phone", value: primaryBank.phone, label: primaryBank.phoneLabel },
          },
          {
            step: 3,
            title: "Uninstall APK mencurigakan",
            detail:
              "Hapus aplikasi yang baru dipasang. Jika tidak bisa dihapus, masuk Safe Mode atau minta bantuan service center resmi.",
            urgency: "high",
            action: null,
          },
          {
            step: 4,
            title: "Ganti password akun penting",
            detail:
              "Gunakan perangkat bersih untuk mengganti password email, bank, e-wallet, dan marketplace.",
            urgency: "high",
            action: null,
          },
          {
            step: 5,
            title: "Scan perangkat",
            detail:
              "Jalankan Google Play Protect atau pemindai keamanan terpercaya dan pantau mutasi rekening.",
            urgency: "medium",
            action: null,
          },
        ],
        importantNotes: [
          "Jangan instal file APK dari WhatsApp, SMS, atau link pendek.",
          "Jika ada transaksi keluar, segera ikuti alur laporan transfer dana.",
        ],
      };
    }

    if (effectiveCategory === "link") {
      return {
        urgencyLevel: banks.length > 0 ? "critical" : "high",
        urgencyMessage: banks.length > 0
          ? `KRITIS - Data login ${primaryBank.name} mungkin bocor, segera ganti password.`
          : "TINGGI - Ganti password akun yang datanya sudah dimasukkan.",
        timeWindow: "Ganti semua password yang terdampak hari ini",
        diagnosis:
          `Anda telah mengklik link mencurigakan${platformInfo} dan kemungkinan memasukkan data login di halaman palsu (phishing). Data yang dimasukkan berisiko digunakan pelaku untuk mengakses akun Anda.`,
        actionPlan: [
          {
            step: 1,
            title: "Ganti password akun yang datanya dimasukkan",
            detail:
              `Segera ganti password${banks.length > 0 ? ` ${primaryBank.name}` : " akun terkait"} dari perangkat aman. Jangan gunakan password lama.`,
            urgency: "critical",
            action: banks.length > 0
              ? { type: "phone", value: primaryBank.phone, label: primaryBank.phoneLabel }
              : null,
          },
          {
            step: 2,
            title: "Aktifkan 2FA di semua akun penting",
            detail:
              "Aktifkan verifikasi dua langkah (2FA) di email, bank, e-wallet, dan media sosial.",
            urgency: "critical",
            action: null,
          },
          {
            step: 3,
            title: "Cek mutasi rekening",
            detail:
              "Periksa apakah ada transaksi mencurigakan. Jika ada, segera hubungi bank untuk blokir.",
            urgency: "high",
            action: null,
          },
          {
            step: 4,
            title: "Hapus cache dan cookies browser",
            detail:
              "Bersihkan data browsing agar sesi login palsu tidak tersimpan.",
            urgency: "high",
            action: null,
          },
          {
            step: 5,
            title: "Laporkan URL phishing",
            detail:
              "Laporkan link mencurigakan ke Patroli Siber agar situs tersebut ditindak.",
            urgency: "medium",
            action: { type: "link", value: "https://patrolisiber.id", label: "Buka PatroliSiber.id" },
          },
        ],
        importantNotes: [
          "Jangan kembali ke link tersebut atau memasukkan data tambahan.",
          "Jika Anda memasukkan data bank (username, password, PIN), hubungi bank segera.",
          "Petugas resmi tidak akan meminta OTP, PIN, password, atau CVV.",
        ],
      };
    }

    // Default fallback for "other" category
    return {
      urgencyLevel: "high",
      urgencyMessage: "TINGGI - Segera ambil langkah pengamanan dasar.",
      timeWindow: "Selesaikan tindakan utama hari ini",
      diagnosis:
        `Insiden keamanan digital terdeteksi${platformInfo}${bankInfo}. Mulai dari pengamanan akun utama, pengumpulan bukti, dan pelaporan resmi bila ada kerugian.`,
      actionPlan: [
        {
          step: 1,
          title: "Amankan email dan akun keuangan",
          detail:
            "Ganti password dari perangkat aman dan aktifkan 2FA pada email, bank, e-wallet, dan marketplace.",
          urgency: "critical",
          action: banks.length > 0
            ? { type: "phone", value: primaryBank.phone, label: primaryBank.phoneLabel }
            : null,
        },
        {
          step: 2,
          title: "Kumpulkan bukti",
          detail:
            `Screenshot chat, nomor, link, bukti transaksi${platform ? ` di ${platform}` : ""}, profil akun, dan waktu kejadian.`,
          urgency: "high",
          action: null,
        },
        {
          step: 3,
          title: "Laporkan kanal berbahaya",
          detail:
            "Laporkan nomor, akun, atau rekening pelaku melalui platform terkait dan kanal resmi.",
          urgency: "high",
          action: { type: "link", value: "https://patrolisiber.id", label: "Buka PatroliSiber.id" },
        },
        {
          step: 4,
          title: "Jangan lanjutkan komunikasi dengan pelaku",
          detail:
            "Blokir setelah bukti disimpan. Jangan transfer biaya tambahan atau memberi data pribadi.",
          urgency: "medium",
          action: null,
        },
      ],
      importantNotes: [
        "Tetap tenang dan kerjakan langkah dari yang paling mendesak.",
        "Petugas resmi tidak akan meminta OTP, PIN, password, atau CVV.",
      ],
    };
  }

  /**
   * Generates high-quality mock responses for development if API key is not present.
   */
  private static getMockAnalysis(text: string, hasImage = false): AnalysisResponse {
    const textLower = text.toLowerCase();

    if (hasImage && textLower.includes("[screenshot tanpa teks tambahan]")) {
      return {
        score: 55,
        riskLevel: "medium",
        category: "Screenshot Perlu Verifikasi",
        summary: "Screenshot berhasil diterima, tetapi mode mock tidak dapat membaca isi gambar. Di production, Gemini akan membaca teks pada screenshot dan menganalisis risikonya secara langsung.",
        redFlags: [
          {
            indicator: "Analisis gambar berjalan dalam mode mock",
            explanation: "Tidak ada API key Gemini aktif, sehingga sistem belum bisa melakukan pembacaan visual pada screenshot.",
            severity: "medium"
          }
        ],
        recommendations: [
          "Aktifkan GEMINI_API_KEY untuk analisis screenshot yang sebenarnya.",
          "Jika ingin menguji lokal tanpa API key, tempel teks dari screenshot ke kolom pesan."
        ]
      };
    }

    // Check for obvious triggers to make mock mode feel alive
    if (textLower.includes("paket") || textLower.includes("kurir") || textLower.includes("apk") || textLower.includes(".apk")) {
      return {
        score: 85,
        riskLevel: "high",
        category: "Modus Kurir APK",
        summary: "Pesan ini menyerupai modus penipuan kurir paket palsu yang mengirimkan berkas APK (aplikasi jahat) berkedok foto paket. Jika diinstal, aplikasi ini dapat mencuri data OTP bank dan SMS Anda.",
        redFlags: [
          {
            indicator: "Format file aplikasi (.APK) berkedok gambar",
            explanation: "Pengirim mengirim file dengan ekstensi .apk namun mengaku sebagai foto paket. Ini taktik mencuri akses handphone Anda.",
            severity: "high"
          },
          {
            indicator: "Desakan mendesak atau urgent",
            explanation: "Meminta Anda segera mengecek foto untuk konfirmasi paket dengan tujuan membuat Anda terburu-buru.",
            severity: "medium"
          }
        ],
        recommendations: [
          "JANGAN PERNAH mengunduh atau menginstal file berakhiran .APK yang dikirim oleh nomor tidak dikenal.",
          "Blokir nomor WhatsApp/SMS pengirim.",
          "Gunakan aplikasi resmi ekspedisi (seperti J&T, JNE, Pos Indonesia) untuk melacak resi asli."
        ]
      };
    }

    if (textLower.includes("menang") || textLower.includes("hadiah") || textLower.includes("undian") || textLower.includes("selamat")) {
      return {
        score: 95,
        riskLevel: "high",
        category: "Penipuan Undian Berhadiah",
        summary: "Pesan ini mengklaim Anda memenangkan undian berhadiah besar. Modus ini biasanya meminta uang tebusan (pajak undian) atau meminta Anda mengisi formulir palsu untuk mencuri identitas Anda.",
        redFlags: [
          {
            indicator: "Pengumuman tidak resmi melalui SMS/WhatsApp biasa",
            explanation: "Perusahaan besar tidak pernah mengumumkan pemenang undian menggunakan nomor handphone pribadi atau domain website gratisan.",
            severity: "high"
          },
          {
            indicator: "Permintaan biaya di awal",
            explanation: "Penipu meminta korban membayar biaya administrasi atau pajak transfer terlebih dahulu sebelum hadiah dikirim.",
            severity: "high"
          }
        ],
        recommendations: [
          "Abaikan dan hapus pesan tersebut.",
          "Jangan mentransfer uang sepeser pun untuk alasan 'pajak undian'. Pajak hadiah resmi selalu dipotong langsung dari hadiah atau diurus secara tatap muka.",
          "Laporkan nomor pengirim ke pihak berwajib atau aplikasi pelapor spam."
        ]
      };
    }

    if (textLower.includes("klik") || textLower.includes("link") || textLower.includes("http") || textLower.includes("https") || textLower.includes("t.me") || textLower.includes("bit.ly")) {
      return {
        score: 75,
        riskLevel: "high",
        category: "Tautan Mencurigakan (Phishing)",
        summary: "Pesan berisi tautan/link yang dipersingkat atau tidak resmi. Tautan ini berisiko mengarahkan Anda ke situs palsu yang meniru halaman login bank atau media sosial (phishing) untuk mencuri kata sandi.",
        redFlags: [
          {
            indicator: "Tautan tidak resmi atau mencurigakan",
            explanation: "Domain tautan menggunakan pemendek link (bit.ly, tinyurl) atau domain murah (blogspot, .xyz, .site) yang tidak mewakili lembaga resmi.",
            severity: "high"
          }
        ],
        recommendations: [
          "Jangan klik tautan tersebut.",
          "Salin tautan dan periksa melalui situs resmi verifikasi tautan jika ragu.",
          "Jangan memasukkan username, kata sandi, atau PIN bank pada halaman yang terbuka dari link tersebut."
        ]
      };
    }

    // Default response for other messages
    return {
      score: 15,
      riskLevel: "safe",
      category: "Aman / Normal",
      summary: "Pesan ini tampaknya aman dan tidak memiliki ciri-ciri umum penipuan digital (phishing atau scam). Namun, tetaplah waspada jika pengirim mulai meminta informasi sensitif atau uang.",
      redFlags: [],
      recommendations: [
        "Tetap berhati-hati dan jangan pernah memberikan data pribadi (KTP, OTP, PIN) kepada siapa pun.",
        "Pastikan Anda mengenal pengirim pesan sebelum berinteraksi lebih jauh."
      ]
    };
  }
}


