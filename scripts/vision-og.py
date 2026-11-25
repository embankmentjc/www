#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["click", "pillow"]
# ///
"""Render a 1200x630 OG card per `/vision` section (`pages/vision-sections.json`).

Each card is the section's image, cover-cropped, with a dark band carrying the
section title. `functions/worker.ts` points `og:image` at these for `?s=<id>`.
"""
import json
import sys
from functools import partial
from pathlib import Path

from click import argument, command, option
from PIL import Image, ImageDraw, ImageFont, ImageOps

err = partial(print, file=sys.stderr)

ROOT = Path(__file__).resolve().parent.parent
SECTIONS = ROOT / 'pages' / 'vision-sections.json'
OUT = ROOT / 'public' / 'images' / 'og' / 'vision'
FONT_BOLD = ROOT / 'public' / 'fonts' / 'lato-700.ttf'
W, H = 1200, 630
PAD = 56


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    for word in text.split():
        if lines and draw.textlength(f'{lines[-1]} {word}', font=font) <= width:
            lines[-1] = f'{lines[-1]} {word}'
        else:
            lines.append(word)
    return lines


def render(src: Path, title: str, dst: Path) -> None:
    img = ImageOps.fit(Image.open(src).convert('RGB'), (W, H), Image.Resampling.LANCZOS)
    # Darken the bottom ~60%, reaching full strength well above the eyebrow, so the title reads on any image.
    band = H * 3 // 5
    alpha = Image.linear_gradient('L').resize((W, band)).point(lambda v: int(min(1, v / 255 * 1.8) * 0.85 * 255))
    shade = Image.new('RGB', (W, band), 'black')
    img.paste(shade, (0, H - band), alpha)
    draw = ImageDraw.Draw(img)
    eyebrow = ImageFont.truetype(str(FONT_BOLD), 26)
    head = ImageFont.truetype(str(FONT_BOLD), 54)
    lines = wrap(draw, title, head, W - 2 * PAD)
    line_h = 64
    y = H - PAD + 8 - line_h * len(lines)
    draw.text((PAD, y - 44), 'THE EMBANKMENT · OUR VISION', font=eyebrow, fill='#84c450')
    for i, line in enumerate(lines):
        draw.text((PAD, y + i * line_h), line, font=head, fill='white')
    img.save(dst, quality=85, optimize=True)


@command
@option('-f', '--force', is_flag=True, help='Re-render cards that are newer than their source image')
@argument('ids', nargs=-1)
def main(force: bool, ids: tuple[str, ...]) -> None:
    """Render OG cards for IDS (default: every section)."""
    sections = json.loads(SECTIONS.read_text())
    known = {s['id'] for s in sections}
    unknown = set(ids) - known
    if unknown:
        raise SystemExit(f'Unknown section(s): {", ".join(sorted(unknown))}')
    OUT.mkdir(parents=True, exist_ok=True)
    for s in sections:
        if ids and s['id'] not in ids:
            continue
        src = ROOT / 'public' / s['img'].lstrip('/')
        dst = OUT / f"{s['id']}.jpg"
        newest_input = max(src.stat().st_mtime, SECTIONS.stat().st_mtime, Path(__file__).stat().st_mtime)
        if not force and dst.exists() and dst.stat().st_mtime >= newest_input:
            continue
        render(src, s['title'], dst)
        err(f'wrote {dst.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
