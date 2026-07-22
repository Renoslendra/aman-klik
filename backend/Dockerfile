# ============================================================
# AmanKlik AI Backend - Production Dockerfile
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
COPY prisma/ ./prisma/
COPY prisma.config.ts ./
RUN npm ci

# Generate Prisma client
RUN DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres" npx prisma generate

# Build TypeScript
COPY src/ ./src/
COPY tsconfig.json ./
RUN npm run build

# ============================================================
# Production stage
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma/ ./prisma/
COPY --from=builder /app/node_modules/.prisma/ ./node_modules/.prisma/
COPY --from=builder /app/node_modules/@prisma/ ./node_modules/@prisma/

# Copy compiled JS
COPY --from=builder /app/dist/ ./dist/

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-5000}/api/v1/health || exit 1

# Start server
CMD ["node", "dist/index.js"]
