FROM node:24-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 HUSKY=0 STANDALONE_BUILD=true
RUN npm install --global pnpm@10.28.2
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
# These are public browser configuration, never database credentials or tokens.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ENABLE_ADSENSE=false
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_ENABLE_ADSENSE=$NEXT_PUBLIC_ENABLE_ADSENSE
RUN node --test scripts/*.test.mjs scripts/*.test.cjs && pnpm lint && pnpm build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
# Copy AFTER postbuild so generated sitemap/robots are shipped in the image.
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
