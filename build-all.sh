#!/usr/bin/env bash
export NODE_ENV=production
cd apiLibrary
npm i
npm run prodBuild
cd ..
cd frontend
npm i
npm run build:prod
cd ..
cd backend
npm i
npx knex migrate:latest
npm run build
cd ..