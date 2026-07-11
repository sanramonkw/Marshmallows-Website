#!/usr/bin/env bash
# Builds the master site + all three design variants and assembles them
# into one combined dist/ folder for GitHub Pages.
#
# NOTE: master + variants use the @astrojs/node SSR adapter, so `astro build`
# emits dist/client/ (static assets) + dist/server/. GitHub Pages is static,
# so we publish only the dist/client/ trees. SSR/API routes (booking) won't
# run on Pages — the site degrades to static, which is accepted.
#
#   dist/                      -> master   (its dist/client)
#   dist/variants/bold/        -> bold      variant (its dist/client)
#   dist/variants/editorial/   -> editorial variant (its dist/client)
#   dist/variants/premium/     -> premium   variant (its dist/client)
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
STAGE="$ROOT/dist-combined"

echo "==> Building master"
npm install --no-audit --no-fund
rm -rf dist
npm run build

echo "==> Staging master dist/client as combined root"
rm -rf "$STAGE"
mkdir -p "$STAGE"
cp -r dist/client/. "$STAGE/"

echo "==> Building variants"
for v in bold editorial premium; do
  echo "  -> $v"
  (cd "variants/$v" && npm install --no-audit --no-fund && rm -rf dist && npm run build)
  rm -rf "$STAGE/variants/$v"
  mkdir -p "$STAGE/variants"
  cp -r "variants/$v/dist/client" "$STAGE/variants/$v"
done

echo "==> Finalising combined dist/"
rm -rf dist
mv "$STAGE" dist

echo "==> Done. Combined output is in dist/"
echo "    Deploy it with: npm run deploy:all"
