import express from "express";
import helmet from "helmet";
import config from "./config/env.js";
import logger from "./utils/logger.js";
import corsMiddleware from "./middlewares/cors.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRoutes from "./routes/index.js";

const app = express();

// Basic security middleware
app.use(helmet());

// CORS configuration
app.use(corsMiddleware);

// Parse JSON request bodies, including base64 screenshots for AI analysis
app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: true }));

// Structured logging for HTTP requests
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.originalUrl} - IP: ${req.ip}`);
  next();
});

// API Routing
app.use("/api/v1", apiRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Endpoint ${req.originalUrl} tidak ditemukan pada server ini.`,
    },
  });
});

// Global Error Handler (must be registered last)
app.use(errorHandler);

// Start Server
app.listen(config.PORT, () => {
  logger.info(`🚀 Server successfully started in [${config.NODE_ENV}] mode on port [${config.PORT}]`);
});
