# Dockerfile
FROM node:22-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /rankmatrix

# Copy only package files first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the app files
COPY . .

# API_URL is needed at build time for Next.js rewrites
ARG API_URL
ENV API_URL=$API_URL

# Build the app
RUN pnpm run build

# Start a new container for the runtime
FROM node:22-alpine
WORKDIR /rankmatrix

# Install pnpm globally in the runtime container
RUN npm install -g pnpm

# Copy built app from builder
COPY --from=builder /rankmatrix ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
