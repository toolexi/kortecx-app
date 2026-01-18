#!/bin/sh

if [ ! -x kx_start.sh ]; then
  echo "Making kx_start.sh executable."
  chmod +x kx_start.sh
fi


docker compose up -d
npm run dev