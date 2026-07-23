# ============================================================
# AmanKlik AI Frontend — Production Dockerfile (Standalone)
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source code (includes .env.production for build-time NEXT_PUBLIC_* vars)
COPY . .

# Build Next.js (creates standalone output)
RUN npm run build

# ============================================================
# Production stage (Runner)
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone output and static files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]

