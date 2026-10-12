# syntax=docker/dockerfile:1

# ── Dependencies ────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
# --frozen-lockfile so a CI build can never silently resolve a
# different dependency tree than the one that was tested.
RUN pnpm install --frozen-lockfile

# ── Build ───────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Emits .next/standalone — a self-contained server with only the
# modules actually imported, which is what keeps the runner image small.
ENV BUILD_STANDALONE=true
# Public env vars are inlined at BUILD time, not read at runtime, so the
# contact form's Web3Forms key can only be overridden here. Left empty,
# the form uses the default in ContactUs.tsx. Pass with --build-arg.
ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=""
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
RUN pnpm run build

# ── Runner ──────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run as a non-root user. The base image ships `node` (uid 1000); using
# it means a container escape does not land on root.
USER node

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
# 0.0.0.0, NOT localhost. Binding to localhost inside a container means
# the process only accepts connections from within that container, so
# the published port answers nothing and the deploy looks dead.
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
