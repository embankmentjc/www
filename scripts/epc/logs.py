"""Log viewing commands."""

import subprocess
import sys

import click

SERVER = "epc"
LOG_PATHS = {
    "access": "~/access-logs/embankment.org-ssl_log",
    "access-dev": "~/access-logs/dev.embankment.org-ssl_log",
    "signups": "~/public_html/bat/signups.log",
}


def ssh(cmd):
    """Run command on server."""
    return subprocess.run(["ssh", SERVER, cmd], capture_output=False)


@click.group()
def logs():
    """View server logs."""
    pass


@logs.command("list")
def list_logs():
    """List available logs."""
    click.echo("Available logs:")
    for name, path in LOG_PATHS.items():
        click.echo(f"  {name:12} {path}")


@logs.command()
@click.argument("name", type=click.Choice(list(LOG_PATHS.keys())))
@click.option("-n", "--lines", default=50, help="Number of lines to show")
@click.option("-f", "--follow", is_flag=True, help="Follow log output")
def tail(name, lines, follow):
    """Tail a log file."""
    path = LOG_PATHS[name]
    if follow:
        ssh(f"tail -f {path}")
    else:
        ssh(f"tail -n {lines} {path}")


@logs.command()
@click.argument("name", type=click.Choice(list(LOG_PATHS.keys())))
@click.argument("pattern")
@click.option("-i", "--ignore-case", is_flag=True, help="Case insensitive")
@click.option("-n", "--lines", default=20, help="Max lines to show")
def grep(name, pattern, ignore_case, lines):
    """Search a log file."""
    path = LOG_PATHS[name]
    flags = "-i" if ignore_case else ""
    ssh(f"grep {flags} '{pattern}' {path} | tail -n {lines}")


@logs.command()
@click.option("-n", "--lines", default=20, help="Number of lines to show")
def signups(lines):
    """Show recent signups (shortcut for tail signups)."""
    ssh(f"tail -n {lines} {LOG_PATHS['signups']}")


@logs.command()
@click.option("-n", "--lines", default=50, help="Number of lines to show")
def errors(lines):
    """Show recent errors from access log."""
    path = LOG_PATHS["access"]
    ssh(f"grep -E '\" [45][0-9][0-9] ' {path} | tail -n {lines}")
