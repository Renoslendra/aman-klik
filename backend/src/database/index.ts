/**
 * Database Module — Re-export semua database utilities dari satu entry point.
 *
 * Cara penggunaan di service/controller:
 *   import { prisma, ScanRepository, UserRepository } from "../database/index.js";
 */

export { default as prisma } from "./client.js";
export { ScanRepository } from "./repositories/scan.repository.js";
export { UserRepository } from "./repositories/user.repository.js";
export { ReportRepository } from "./repositories/report.repository.js";
export { ScamPatternRepository } from "./repositories/scamPattern.repository.js";

