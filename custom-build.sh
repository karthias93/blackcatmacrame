#!/bin/bash

NPM_CONFIG_PRODUCTION=false npm install --prefix frontend

npm run build --prefix frontend

# Run the build command
vercel-build