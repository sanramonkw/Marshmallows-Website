#!/usr/bin/env bash
# Builds the master (root) site + the two archived design variants
# (premium, editorial — bold was promoted to master and no longer exists as
# a variant) and assembles them into one combined dist/ folder for the
# GitHub Pages review deploy.
#
# NOTE: master + variants use the @astrojs/node SSR adapter, so `astro build`
# emits dist/client/ (static assets) + dist/server/ (the node entry that
# serves /api/salonist/*). GitHub Pages only serves static files, so this
# script publishes only the dist/client/ trees. On Pages, /api/salonist/*
# is unreachable and the booking widget gracefully degrades to its
# WhatsApp/phone fallback — that is the expected, correct behaviour for a
# static review deploy, not a bug. Production (marshmallows.co) instead runs
# the full node server (`node dist/server/entry.mjs`, DEPLOY_TARGET unset)
# so the API and booking widget work fully — see CLAUDE.md / DEPLOYMENT.md.
#
# Every build in this script sets DEPLOY_TARGET=pages so astro.config.mjs
# picks the GitHub Pages site/base instead of the production ones.
#
#   dist/                      -> master     (its dist/client)
#   dist/variants/premium/     -> premium    variant (its dist/client)
#   dist/variants/editorial/   -> editorial  variant (its dist/client)
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
STAGE="$ROOT/dist-combined"

export DEPLOY_TARGET=pages

echo "==> Building master (DEPLOY_TARGET=pages)"
npm install --no-audit --no-fund
rm -rf dist
npm run build

echo "==> Staging master dist/client as combined root"
rm -rf "$STAGE"
mkdir -p "$STAGE"
cp -r dist/client/. "$STAGE/"

echo "==> Building variants"
for v in premium editorial; do
  echo "  -> $v (DEPLOY_TARGET=pages)"
  (cd "variants/$v" && DEPLOY_TARGET=pages npm install --no-audit --no-fund && rm -rf dist && DEPLOY_TARGET=pages npm run build)
  rm -rf "$STAGE/variants/$v"
  mkdir -p "$STAGE/variants"
  cp -r "variants/$v/dist/client" "$STAGE/variants/$v"
done

echo "==> Finalising combined dist/"
rm -rf dist
mv "$STAGE" dist

echo "==> Done. Combined static (client-only) output is in dist/"
echo "    Deploy it with: npm run deploy:all"
