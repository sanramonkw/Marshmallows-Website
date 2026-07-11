#!/usr/bin/env bash
# Publishes the already-built combined dist/ (master + variants) to the repo's
# gh-pages branch. Windows-safe: unlike the `gh-pages` npm package (which passes
# the whole file list to `git rm` and dies with ENAMETOOLONG on Windows), this
# runs `git add -A` from *inside* dist/, so there is no giant argument list.
#
# Run after building: `npm run build:all` (or just use `npm run deploy:all`).
set -euo pipefail
cd "$(dirname "$0")/.."

# Auto-detect the build output dir: SSR/hybrid adapters emit dist/client,
# a plain static build emits dist/ directly.
if [ -d dist/client ]; then
  OUT="dist/client"
else
  OUT="dist"
fi

[ -f "$OUT/index.html" ] || { echo "$OUT/ not built — run 'npm run build:all' first"; exit 1; }

URL="$(git remote get-url origin)"
touch "$OUT/.nojekyll"   # site-wide: lets GitHub Pages serve _astro/ (underscore) dirs

cd "$OUT"
rm -rf .git
git init -q -b gh-pages
git -c user.email="m.fashid@sanramonkw.com" -c user.name="m.fashid" add -A
git -c user.email="m.fashid@sanramonkw.com" -c user.name="m.fashid" commit -qm "Deploy combined site to GitHub Pages"
echo "Publishing $OUT/ ($(git rev-parse --short HEAD)) to $URL (gh-pages)..."
git push -f "$URL" gh-pages:gh-pages
rm -rf .git
echo "Published $OUT/ to gh-pages."
