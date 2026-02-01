#!/bin/sh

if [ ! -x scripts/kx_start.sh ]; then
  echo "Making kx_start.sh executable."
  chmod +x scripts/kx_start.sh
fi


docker compose up -d
npm install
npm run dev