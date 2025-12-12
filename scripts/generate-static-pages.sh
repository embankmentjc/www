#!/bin/bash
# Generate static HTML pages for each route by copying index.html
# This allows direct URL access to work on static hosting

set -e

OUT_DIR="${1:-.}"

ROUTES=(
  about
  vision
  news
  now
  involved
  newsletter
  2024-events
  2025-events
  mayoral-2025
  embankment-on-my-mind
  bot-drawing
  og-test
)

for route in "${ROUTES[@]}"; do
  mkdir -p "$OUT_DIR/$route"
  cp "$OUT_DIR/index.html" "$OUT_DIR/$route/index.html"
  echo "Created $OUT_DIR/$route/index.html"
done

echo "Done - generated ${#ROUTES[@]} static pages"
