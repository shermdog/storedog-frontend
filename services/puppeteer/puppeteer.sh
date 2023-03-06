#!/bin/bash

STOREDOG_PROTOCOL="${STOREDOG_PROTOCOL:-"http"}"
STOREDOG_HOST="${STOREDOG_HOST:-"localhost"}"
STOREDOG_PORT="${STOREDOG_PORT:-80}"

STOREDOG_URL="${STOREDOG_PROTOCOL}://${STOREDOG_HOST}:${STOREDOG_PORT}"
  
checkStoredog() {
  wget --quiet -O - $STOREDOG_URL |grep -qi storedog
}

printf "\nWaiting for Storedog"

until checkStoredog; do
  printf .
  sleep 2
done

printf "\nBrowser replay starting.\n\n"

while :
do
  node puppeteer.js $STOREDOG_URL
done