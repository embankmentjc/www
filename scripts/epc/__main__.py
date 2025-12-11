#!/usr/bin/env -S uv run --with click --with requests
"""Entry point for `python -m epc` or direct execution."""

from .cli import cli

if __name__ == "__main__":
    cli()
