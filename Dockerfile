# ============================================
# Build stage - isolated build environment
# ============================================
FROM node:22-alpine AS builder

# Security: Don't run npm as root in build
WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install prod + dev dependencies for build, clean cache
RUN npm ci --ignore-scripts && \
    npm cache clean --force

# Copy source code
COPY . .

# Receive API key at build time (Vite embeds VITE_* vars during build)
ARG VITE_WEATHER_API_KEY
ENV VITE_WEATHER_API_KEY=$VITE_WEATHER_API_KEY

# Build the application
RUN npm run build

# ============================================
# Production stage - minimal attack surface
# ============================================
FROM nginx:alpine

LABEL maintainer="VAL FACADE" \
      description="VAL FACADE website - production image" \
      version="1.0.0"

# Security: Update all packages and install only wget for healthcheck
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache ca-certificates && \
    rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Security: Create dedicated non-root user with no shell
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup -s /sbin/nologin -h /nonexistent

# Copy nginx configuration
COPY --chown=appuser:appgroup nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder stage
COPY --from=builder --chown=appuser:appgroup /app/dist /usr/share/nginx/html

# Security: Set strict permissions on static files (read-only)
RUN chmod -R 555 /usr/share/nginx/html && \
    find /usr/share/nginx/html -type f -exec chmod 444 {} \; && \
    mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R appuser:appgroup /tmp && \
    ln -sf /dev/stdout /tmp/access.log && \
    ln -sf /dev/stderr /tmp/error.log && \
    # Remove unnecessary files from nginx
    rm -rf /etc/nginx/conf.d/default.conf \
           /usr/share/nginx/html/50x.html 2>/dev/null || true

# Security: Switch to non-root user
USER appuser

# Expose port (unprivileged)
EXPOSE 3000

# Health check with timeout
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
