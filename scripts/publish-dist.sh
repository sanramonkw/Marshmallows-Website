#!/usr/bin/env bash
# Publishes the already-built, static, client-only dist output (master +
# the premium/editorial variants, combined by build-all.sh) to the repo's
# gh-pages branch for the GitHub Pages review deploy. This is ALWAYS a
# dist/client tree (or a combined dist/ made only from dist/client copies) —
# master/variants use the @astrojs/node adapter, so a plain `astro build`
# splits into dist/client/ (static pages+assets) and dist/server/ (the node
# entry + /api/salonist/* routes). dist/server/ can never be published here:
# GitHub Pages can only serve static files, so it CANNOT run the node
# server or the Salonist API — the booking widget degrades to its
# WhatsApp/phone fallback on Pages, which is expected. Production deploys
# (marshmallows.co) instead run `node dist/server/entry.mjs` directly and
# never use this script. See CLAUDE.md / DEPLOYMENT.md.
#
# Windows-safe: unlike the `gh-pages` npm package (which passes the whole
# file list to `git rm` and dies with ENAMETOOLONG on Windows), this runs
# `git add -A` from *inside* the output dir, so there is no giant argument
# list.
#
# Run after building: `npm run build:all` (or just use `npm run deploy:all`).
set -euo pipefail
cd "$(dirname "$0")/.."

# Auto-detect the build output dir: a node-adapter build (single `astro
# build`, not via build-all.sh) emits dist/client/ alongside dist/server/ —
# publish dist/client only. build-all.sh's combined dist/ already contains
# only dist/client copies at its top level (no dist/server/ ever entered
# it), so it is published as-is in that case.
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
