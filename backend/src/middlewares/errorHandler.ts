import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";
import config from "../config/env.js";

export interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (config.NODE_ENV === "development" && err.stack) {
    logger.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(config.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

export default errorHandler;


