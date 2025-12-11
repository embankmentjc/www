#!/usr/bin/env python3
"""EPC CLI - Embankment Preservation Coalition management tool."""

import click

from .cc import cc
from .deploy import deploy
from .logs import logs


@click.group()
def cli():
    """EPC management CLI."""
    pass


cli.add_command(cc)
cli.add_command(deploy)
cli.add_command(logs)


if __name__ == "__main__":
    cli()
