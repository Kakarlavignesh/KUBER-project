# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package info and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Production stage
FROM node:20-alpine

WORKDIR /app

# Run as non-root user for security best practices
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy built artifacts from the builder stage
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

ENV PORT=3000
# Default version to v1 if not specified
ENV APP_VERSION=v1

# Command to run the application
CMD ["node", "server.js"]
