import {
  GoogleGenAI,
  createPartFromBase64,
  createPartFromText,
  createUserContent,
} from "@google/genai";
import config from "../config/env.js";
import logger from "../utils/logger.js";
import { AnalysisResponse } from "../types/index.js";

// Initialize Gemini AI Client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (config.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
    logger.info("Gemini AI Client initialized successfully.");
  } catch (error) {
    logger.error("Failed to initialize Gemini AI Client:", error);
  }
} else {
  logger.warn("GEMINI_API_KEY is not set. Gemini Service will run in mock mode.");
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

    if (!aiClient) {
      logger.info("GEMINI_API_KEY missing. Falling back to Mock Analysis Mode.");
      return this.getMockAnalysis(text || "[Screenshot tanpa teks tambahan]", hasImage);
    }

    try {
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

      const contents = input.image
        ? createUserContent([
            createPartFromText(prompt),
            createPartFromBase64(input.image.data, input.image.mimeType),
          ])
        : prompt;

      const response = await aiClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Menerima respon kosong dari Gemini API.");
      }

      const result: AnalysisResponse = JSON.parse(responseText);
      logger.info(`Message analyzed by Gemini. Risk score: ${result.score}`);
      return result;
    } catch (error) {
      logger.error("Error calling Gemini API, falling back to mock analysis:", error);
      return this.getMockAnalysis(text || "[Screenshot tanpa teks tambahan]", hasImage);
    }
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
