#!/bin/bash

# Exit on error
set -e

echo "Building for production..."

# Install dependencies
npm ci

# Build TypeScript
npm run build

# Copy necessary files
cp package.json dist/
cp package-lock.json dist/
cp .env.production dist/.env
cp ecosystem.config.js dist/

# Install PM2 globally if not already installed
npm install -g pm2

echo "Build complete! The contents of ./dist can now be deployed to Hostinger."
