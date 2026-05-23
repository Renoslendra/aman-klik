import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Singleton pattern — memastikan hanya satu instance PrismaClient
// yang dibuat di seluruh aplikasi, termasuk saat hot-reload development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

// Buat connection pool dan adapter untuk Prisma v7
const pool = new pg.Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);

const clientOptions: ConstructorParameters<typeof PrismaClient>[0] = {
  adapter,
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient(clientOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
