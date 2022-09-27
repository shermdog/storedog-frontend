#!/usr/bin/env bash
set -e

export ADS_PORT="${ADS_PORT:-7676}"
export DISCOUNTS_PORT="${DISCOUNTS_PORT:-2814}"

envsubst < /storedog-app/.env.template > /storedog-app/site/.env

yarn dev
