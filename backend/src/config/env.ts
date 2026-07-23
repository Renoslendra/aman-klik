import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  CORS_ORIGIN: string;
  DATABASE_URL: string;
  GEMINI_API_KEY: string;
  GEMINI_API_KEY_ANALYSIS: string;
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
}

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required but missing.`);
  }
  return value;
};

const nodeEnv = getEnv("NODE_ENV", "development");
const isProduction = nodeEnv === "production";

const getProductionRequiredEnv = (key: string, defaultValue = ""): string => {
  const value = process.env[key] || defaultValue;

  if (isProduction && !value && !defaultValue) {
    throw new Error(`Environment variable ${key} wajib diisi untuk production.`);
  }

  return value;
};

const corsOrigin = getEnv("CORS_ORIGIN", isProduction ? "https://amanklik-575126371408.asia-southeast1.run.app" : "*");

if (isProduction && corsOrigin === "*") {
  throw new Error("CORS_ORIGIN tidak boleh '*' saat NODE_ENV=production.");
}

export const config: EnvConfig = {
  PORT: parseInt(getEnv("PORT", "5000"), 10),
  NODE_ENV: nodeEnv,
  CORS_ORIGIN: corsOrigin,
  DATABASE_URL: getProductionRequiredEnv("DATABASE_URL"),
  GEMINI_API_KEY: getProductionRequiredEnv("GEMINI_API_KEY"),
  GEMINI_API_KEY_ANALYSIS: getProductionRequiredEnv("GEMINI_API_KEY_ANALYSIS", process.env.GEMINI_API_KEY || ""),
  JWT_SECRET: getProductionRequiredEnv("JWT_SECRET", "amanklik-default-secret-2026-key-vibe"),
  GOOGLE_CLIENT_ID: getProductionRequiredEnv("GOOGLE_CLIENT_ID", "575126371408-24cf56dvn0m8gih1ieip7shrk3s2so17.apps.googleusercontent.com"),
};

export default config;


