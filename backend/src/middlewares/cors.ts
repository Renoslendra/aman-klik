import cors from "cors";
import config from "../config/env.js";

const allowedOrigins = config.CORS_ORIGIN === "*"
  ? "*"
  : config.CORS_ORIGIN.split(",").map((origin) => origin.trim());

const corsMiddleware = cors({
  origin: allowedOrigins === "*"
    ? true
    : (origin, callback) => {
        // Izinkan request tanpa origin (server-to-server, Postman, mobile app)
        if (!origin) return callback(null, true);

        if ((allowedOrigins as string[]).includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} tidak diizinkan oleh CORS policy.`));
        }
      },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

export default corsMiddleware;

