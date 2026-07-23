import { rateLimit } from "express-rate-limit";
import logger from "../utils/logger.js";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: {
      message: "Terlalu banyak permintaan dari IP ini, silakan coba lagi setelah 15 menit.",
    },
  },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip} on URL: ${req.originalUrl}`);
    res.status(options.statusCode).send(options.message);
  },
});

export default rateLimiter;


