#!/usr/bin/env bash
# Restore timestamps on build output files to match their source files in public/
# This prevents rsync from re-copying unchanged static files

set -e

# Accept directory as first argument, default to "out"
outdir="${1:-out}"

if [ ! -d "$outdir" ]; then
    echo "Error: $outdir/ directory not found" >&2
    exit 1
fi

if [ ! -d "public" ]; then
    echo "Error: public/ directory not found" >&2
    exit 1
fi

# Use a temporary file to count since subshells can't modify parent variables
tmpfile=$(mktemp)
echo 0 > "$tmpfile"

# Handle files directly copied from public/ to output dir
while IFS= read -r -d '' outfile; do
    # Convert .next-prod/foo/bar to public/foo/bar
    pubfile="public/${outfile#$outdir/}"
    if [ -f "$pubfile" ]; then
        touch -r "$pubfile" "$outfile"
        echo $(($(cat "$tmpfile") + 1)) > "$tmpfile"
    fi
done < <(find "$outdir" -type f -not -path "$outdir/_next/*" -print0)

# Handle files bundled into _next/static/media/
# These are named like: originalname.hash.ext
if [ -d "$outdir/_next/static/media" ]; then
    while IFS= read -r -d '' outfile; do
        basename=$(basename "$outfile")
        # Extract original filename by removing hash: "633328.2968b834.png" -> "633328.png"
        # Pattern: name.hash.ext -> name.ext
        if [[ $basename =~ ^(.+)\.[a-f0-9]{8}\.([^.]+)$ ]]; then
            origname="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
            # Look for this file in public/
            pubfile=$(find public -type f -name "$origname" 2>/dev/null | head -1)
            if [ -f "$pubfile" ]; then
                touch -r "$pubfile" "$outfile"
                echo $(($(cat "$tmpfile") + 1)) > "$tmpfile"
            fi
        fi
    done < <(find "$outdir/_next/static/media" -type f -print0)
fi

count=$(cat "$tmpfile")
rm "$tmpfile"

echo "Restored timestamps for $count files from public/ to $outdir/"
