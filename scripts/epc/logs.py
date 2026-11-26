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


SIGNUP_FIELDS = {"Name": "name", "Email": "email", "Phone": "phone", "Background/Message": "message"}
TEST_EMAIL_MARKERS = ["+test", "test@", ".test", "@example."]


def parse_signups_log(text):
    """Parse `bat/signups.log` (`=== Signup: <ts> ===` blocks, `Field: value` lines, message running to `====`)."""
    import re
    entries, cur, in_msg = [], None, False
    for line in text.splitlines():
        m = re.match(r"^=== Signup: (\d{4}-\d\d-\d\d \d\d:\d\d:\d\d) ===$", line)
        if m:
            cur = {"ts": m.group(1)}
            entries.append(cur)
            in_msg = False
            continue
        if cur is None:
            continue
        if re.match(r"^=+$", line):
            cur, in_msg = None, False
            continue
        label, sep, value = line.partition(":")
        if sep and label in SIGNUP_FIELDS and not in_msg:
            key = SIGNUP_FIELDS[label]
            cur[key] = value.strip()
            in_msg = key == "message"
        elif in_msg:
            cur["message"] = (cur["message"] + "\n" + line).strip()
    for e in entries:
        e["message"] = (e.get("message") or "").strip() or None
    return entries


@logs.command("backfill-d1")
@click.option("-d", "--database", default="epc", help="D1 database name")
@click.option("-n", "--dry-run", is_flag=True, help="Parse and summarize, don't write")
@click.option("-T", "--include-tests", is_flag=True, help="Keep test submissions (example.com, +test, …)")
@click.option("-z", "--tz", default="America/New_York", help="Timezone the log's timestamps were written in")
def backfill_d1(database, dry_run, include_tests, tz):
    """Copy the shared host's `signups.log` into D1 `signups` (idempotent: skips rows already present).

    The old host wrote timestamps in US Eastern time; rows land with `cc_status = 'backfilled'`, since the log doesn't
    record Constant Contact's response.
    """
    import time
    from datetime import datetime
    from pathlib import Path
    from zoneinfo import ZoneInfo
    text = subprocess.run(["ssh", SERVER, f"cat {LOG_PATHS['signups']}"], capture_output=True, text=True, check=True).stdout
    entries = parse_signups_log(text)
    keep = [e for e in entries if e.get("email") and (include_tests or not any(t in e["email"].lower() for t in TEST_EMAIL_MARKERS))]
    click.echo(f"{len(entries)} entries, {len(keep)} kept ({len(entries) - len(keep)} test/empty skipped)", err=True)
    if not keep:
        return
    zone = ZoneInfo(tz)
    q = lambda s: "NULL" if s is None else "'" + s.replace("'", "''") + "'"
    stmts = []
    for e in keep:
        ts = int(datetime.strptime(e["ts"], "%Y-%m-%d %H:%M:%S").replace(tzinfo=zone).timestamp())
        first, _, last = (e.get("name") or "").strip().partition(" ")
        stmts.append(
            "INSERT INTO signups (created_at, email, first_name, last_name, phone, message, source, cc_status, cc_detail) "
            f"SELECT {ts}, {q(e['email'])}, {q(first or None)}, {q(last.strip() or None)}, {q(e.get('phone') or None)}, "
            f"{q(e['message'])}, '/bat/cc-signup-with-email.php', 'backfilled', 'signups.log' "
            f"WHERE NOT EXISTS (SELECT 1 FROM signups WHERE created_at = {ts} AND email = {q(e['email'])});"
        )
    if dry_run:
        first_ts, last_ts = keep[0]["ts"], keep[-1]["ts"]
        click.echo(f"would insert up to {len(stmts)} rows, {first_ts} .. {last_ts} ({tz})", err=True)
        return
    sql_file = Path(__file__).parent.parent.parent / "tmp" / ".signups-backfill.sql"
    sql_file.parent.mkdir(parents=True, exist_ok=True)
    sql_file.write_text("\n".join(stmts) + "\n")
    sql_file.chmod(0o600)
    try:
        subprocess.run(["npx", "wrangler", "d1", "execute", database, "--remote", "--file", str(sql_file), "-y"], check=True, stdout=subprocess.DEVNULL)
    finally:
        sql_file.unlink()
    click.echo(f"backfilled into {database}.signups", err=True)
