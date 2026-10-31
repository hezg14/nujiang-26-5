# syntax=docker/dockerfile:1
#
# One image, one public port, three processes: nginx in front, Next.js (SSR) and
# FastAPI (lead API) behind it. 
#
# Why a single container instead of "static host + API host"? The lead form posts
# from the browser, so two hostnames would mean CORS, a second TLS origin and a
# second thing to keep warm. One origin removes all of it: the client calls
# /api/lead on the same host, and Next.js keeps the root path.
#
# Build:  docker build -t nujiang-26-5 .
# Run:    docker run -p 3000:3000 -e DATABASE_URL=... nujiang-26-5
#
# Public env is compiled into the browser bundle at build time, so it arrives as
# build args rather than runtime env — pass them with --build-arg.

# ---------- stage 1: build the Next.js frontend ----------
FROM node:20-bookworm-slim AS web
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Dependencies first: this layer only rebuilds when the lockfile changes.
COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/ ./

# Empty API base = same origin (see web/lib/site.ts). The site URL is baked into
# canonical tags, Open Graph and JSON-LD, so it has to be right at build time.
ARG NEXT_PUBLIC_LEAD_MODE=live
ARG NEXT_PUBLIC_API_BASE=
ARG NEXT_PUBLIC_SITE_URL=https://nujiang-26-5.onrender.com
ENV NEXT_PUBLIC_LEAD_MODE=$NEXT_PUBLIC_LEAD_MODE \
    NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_OUTPUT=standalone

RUN npm run build

# ---------- stage 2: runtime ----------
FROM node:20-bookworm-slim AS runtime

# nginx is the only process bound to the public port; python3 runs the API.
# curl exists for the HEALTHCHECK below. Acquire::Retries because a single 502
# from the Debian mirror should not fail a build.
#
# APT_MIRROR exists for building behind a slow or filtered network — leave it at
# the default for a normal build (Render's network reaches deb.debian.org).
ARG APT_MIRROR=deb.debian.org
RUN if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i "s|deb.debian.org|${APT_MIRROR}|g" /etc/apt/sources.list.d/debian.sources; \
    else \
      sed -i "s|deb.debian.org|${APT_MIRROR}|g" /etc/apt/sources.list; \
    fi \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      -o Acquire::Retries=8 \
      nginx python3 python3-venv curl \
 && rm -rf /var/lib/apt/lists/* \
 && rm -f /etc/nginx/sites-enabled/default

# The API lives in its own venv: Debian's python3 is externally managed, and a
# venv keeps `pip install` from fighting the distro packages.
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
# Install the Postgres driver alongside the base requirements. Production points
# DATABASE_URL at Neon, and without psycopg SQLAlchemy raises ModuleNotFoundError
# the instant the engine is created — the container would never open a port, or
# worse, would serve pages while every submission failed.
COPY api/requirements.txt api/requirements-postgres.txt /tmp/
RUN pip install --no-cache-dir -r /tmp/requirements-postgres.txt

WORKDIR /app
COPY api/ /app/api/

# Standalone output carries server.js plus the traced node_modules; static assets
# and public/ are not part of it and have to be copied beside it.
COPY --from=web /app/.next/standalone/ /app/web/
COPY --from=web /app/.next/static/ /app/web/.next/static/
COPY --from=web /app/public/ /app/web/public/

COPY docker/nginx.conf.template /app/docker/nginx.conf.template
COPY docker/entrypoint.sh /app/docker/entrypoint.sh
RUN chmod +x /app/docker/entrypoint.sh

ENV NODE_ENV=production \
    PORT=10000 \
    PYTHONUNBUFFERED=1 \
    API_PORT=8000 \
    WEB_PORT=3000

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=4s --start-period=30s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/api/health" || exit 1

ENTRYPOINT ["/app/docker/entrypoint.sh"]
