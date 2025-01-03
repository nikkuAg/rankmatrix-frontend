FROM node:22-alpine3.21 AS builder
WORKDIR /rankmatrix
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build


FROM node:22-alpine3.21
WORKDIR /rankmatrix
COPY --from=builder /rankmatrix ./
EXPOSE 3000
CMD ["pnpm", "start"]
