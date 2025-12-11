"""Deploy commands."""

import subprocess
import sys
from pathlib import Path

import click

REPO_ROOT = Path(__file__).parent.parent.parent


def run(cmd, **kwargs):
    """Run a command and stream output."""
    return subprocess.run(cmd, shell=True, cwd=REPO_ROOT, **kwargs)


@click.group()
def deploy():
    """Build and deploy the site."""
    pass


@deploy.command()
@click.option("-n", "--dry-run", is_flag=True, help="Dry run (show what would be deployed)")
def dev(dry_run):
    """Build and deploy to dev.embankment.org."""
    if dry_run:
        click.echo("Building for dev...")
        result = run("npm run build-dev")
        if result.returncode != 0:
            sys.exit(result.returncode)
        click.echo("\nDry run deploy:")
        run("npm run deploy-dev -- --dry-run")
    else:
        run("npm run build-dev && npm run deploy-dev")


@deploy.command()
@click.option("-n", "--dry-run", is_flag=True, help="Dry run (show what would be deployed)")
def prod(dry_run):
    """Build and deploy to embankment.org."""
    if dry_run:
        click.echo("Building for prod...")
        result = run("npm run build")
        if result.returncode != 0:
            sys.exit(result.returncode)
        click.echo("\nDry run deploy:")
        run("npm run deploy-main -- --dry-run")
    else:
        run("npm run build && npm run deploy-main")


@deploy.command()
@click.argument("target", type=click.Choice(["dev", "prod"]))
def build(target):
    """Build without deploying."""
    if target == "dev":
        run("npm run build-dev")
    else:
        run("npm run build")
