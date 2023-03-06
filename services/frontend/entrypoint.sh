#!/usr/bin/env bash
set -e

# Set default values for .env template
export API_PROTOCOL="${API_PROTOCOL:-"http"}"
export API_HOST="${API_HOST:-"web"}"
export API_PORT="${API_PORT:-4000}"
export CLIENT_PROTOCOL="${CLIENT_PROTOCOL:-"http"}"
export CLIENT_HOST="${CLIENT_HOST:-"localhost"}"
export CLIENT_PORT="${CLIENT_PORT:-4000}"
export ADS_PROTOCOL="${ADS_PROTOCOL:-"http"}"
export ADS_HOST="${ADS_HOST:-"localhost"}"
export ADS_PORT="${ADS_PORT:-7676}"
export DISCOUNTS_PROTOCOL="${DISCOUNTS_PROTOCOL:-"http"}"
export DISCOUNTS_HOST="${DISCOUNTS_HOST:-"localhost"}"
export DISCOUNTS_PORT="${DISCOUNTS_PORT:-2814}"

export DD_SITE="${DD_SITE:-"datadoghq.com"}"
export DD_SERVICE="${DD_SERVICE:-"frontend"}"
export DD_VERSION="${DD_VERSION:-"1.0.2"}"
export DD_ENV="${DD_ENV:-"development"}"

# Render env template
envsubst < /storedog-app/.env.template > /storedog-app/site/.env

yarn dev
