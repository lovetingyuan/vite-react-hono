# Stage 1: Build stage
# Use node:22-slim as the base image for building
FROM node:22-slim AS builder

WORKDIR /app

# Copy package management files to install dependencies
COPY package*.json ./
COPY app/package*.json ./app/
COPY server/package*.json ./server/

# Install all dependencies including devDependencies for building
RUN npm install

# Copy all source files
COPY . .

# Execute the build script defined in the root package.json
# This will build both the frontend and the backend into the 'dist' directory
RUN npm run build

# Stage 2: Production stage
# Use a fresh node:22-slim image to keep the final image small
FROM node:22-slim

WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app/dist ./dist

# Change working directory to dist to ensure static assets are served correctly
# This matches the "npm run preview" behavior (cd dist && node server)
WORKDIR /app/dist

# Set environment variables
ENV NODE_ENV=production
# Default port for the application
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the server using node
CMD ["node", "server.js"]
