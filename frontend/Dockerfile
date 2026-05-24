# ============================================================
# AmanKlik AI Frontend — Production Dockerfile
# ============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code (includes .env.production for build-time NEXT_PUBLIC_* vars)
COPY . .

# Build Next.js (reads .env.production automatically)
RUN npm run build

# ============================================================
# Production stage
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder /app/public/ ./public/

EXPOSE 3000

CMD ["npm", "start"]
