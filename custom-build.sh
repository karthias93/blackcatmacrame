#!/bin/bash

echo "Installing dependencies for frontend..."
NPM_CONFIG_PRODUCTION=false npm install --prefix frontend

echo "Running build script for frontend..."
npm run build --prefix frontend
# Run the build command
vercel-build