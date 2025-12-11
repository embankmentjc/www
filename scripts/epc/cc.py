"""Constant Contact management commands."""

import json
import os
import sys
import time
from pathlib import Path

import click
import requests

# Token file location (relative to repo root)
TOKEN_FILE = Path(__file__).parent.parent.parent / "tmp" / ".cc-tokens.json"
BASE_URL = "https://api.cc.email"
AUTH_URL = "https://authz.constantcontact.com/oauth2/default/v1/token"


def err(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def get_credentials():
    """Get CC credentials from environment."""
    client_id = os.environ.get("CC_CLIENT_ID")
    client_secret = os.environ.get("CC_CLIENT_SECRET")
    if not client_id or not client_secret:
        err("Error: CC_CLIENT_ID and CC_CLIENT_SECRET must be set")
        sys.exit(1)
    return client_id, client_secret


def load_tokens():
    """Load tokens from file."""
    if not TOKEN_FILE.exists():
        err(f"Error: Token file not found: {TOKEN_FILE}")
        sys.exit(1)
    return json.loads(TOKEN_FILE.read_text())


def save_tokens(tokens):
    """Save tokens to file."""
    TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
    TOKEN_FILE.write_text(json.dumps(tokens))


def get_headers(tokens):
    """Get authorization headers."""
    return {"Authorization": f"Bearer {tokens['access_token']}"}


def refresh_tokens_if_needed(tokens, force=False):
    """Refresh tokens if expired or forced."""
    if not force and time.time() < tokens.get("expires_at", 0):
        return tokens

    client_id, client_secret = get_credentials()
    resp = requests.post(
        AUTH_URL,
        data={"grant_type": "refresh_token", "refresh_token": tokens["refresh_token"]},
        auth=(client_id, client_secret),
    )
    if resp.status_code != 200:
        err(f"Token refresh failed: {resp.status_code} {resp.text}")
        sys.exit(1)

    new_tokens = resp.json()
    new_tokens["expires_at"] = int(time.time()) + new_tokens.get("expires_in", 86400)
    save_tokens(new_tokens)
    return new_tokens


def fetch_all_contacts(headers, include_custom_fields=False):
    """Fetch all contacts with pagination."""
    contacts = []
    include = "&include=custom_fields" if include_custom_fields else ""
    url = f"{BASE_URL}/v3/contacts?limit=500{include}"

    while url:
        resp = requests.get(url, headers=headers)
        if resp.status_code != 200:
            err(f"API error: {resp.status_code} {resp.text}")
            sys.exit(1)
        data = resp.json()
        contacts.extend(data.get("contacts", []))
        next_link = data.get("_links", {}).get("next", {}).get("href")
        url = f"{BASE_URL}{next_link}" if next_link else None

    return contacts


@click.group()
def cc():
    """Constant Contact management."""
    pass


@cc.command()
@click.option("-f", "--force", is_flag=True, help="Force refresh even if not expired")
def refresh(force):
    """Refresh OAuth tokens."""
    tokens = load_tokens()
    expired = time.time() >= tokens.get("expires_at", 0)

    if not force and not expired:
        click.echo(f"Tokens still valid (expires at {tokens['expires_at']})")
        return

    tokens = refresh_tokens_if_needed(tokens, force=True)
    click.echo("Tokens refreshed successfully")


@cc.command("list")
@click.option("-t", "--test", is_flag=True, help="Only show test contacts (+test, test@, etc)")
@click.option("-q", "--query", help="Filter by email substring")
@click.option("-c", "--count", is_flag=True, help="Only show count")
def list_contacts(test, query, count):
    """List contacts."""
    tokens = refresh_tokens_if_needed(load_tokens())
    headers = get_headers(tokens)
    contacts = fetch_all_contacts(headers)

    # Filter
    if test:
        contacts = [
            c for c in contacts
            if any(x in c.get("email_address", {}).get("address", "").lower()
                   for x in ["+test", "test@", ".test"])
        ]
    if query:
        contacts = [
            c for c in contacts
            if query.lower() in c.get("email_address", {}).get("address", "").lower()
        ]

    if count:
        click.echo(len(contacts))
        return

    for c in contacts:
        email = c.get("email_address", {}).get("address", "")
        name = f"{c.get('first_name', '')} {c.get('last_name', '')}".strip()
        click.echo(f"{email}\t{name or '(none)'}\t{c.get('contact_id')}")


@cc.command()
@click.argument("email")
def lookup(email):
    """Look up a contact by email."""
    tokens = refresh_tokens_if_needed(load_tokens())
    headers = get_headers(tokens)

    resp = requests.get(
        f"{BASE_URL}/v3/contacts",
        params={"email": email},
        headers=headers,
    )
    if resp.status_code != 200:
        err(f"API error: {resp.status_code} {resp.text}")
        sys.exit(1)

    data = resp.json()
    contacts = data.get("contacts", [])

    if not contacts:
        click.echo(f"No contact found for: {email}")
        sys.exit(1)

    c = contacts[0]
    click.echo(f"Email: {c.get('email_address', {}).get('address')}")
    click.echo(f"Name: {c.get('first_name', '')} {c.get('last_name', '')}")
    click.echo(f"ID: {c.get('contact_id')}")
    click.echo(f"Created: {c.get('created_at')}")
    click.echo(f"Updated: {c.get('updated_at')}")

    if c.get("custom_fields"):
        click.echo("Custom fields:")
        for cf in c["custom_fields"]:
            click.echo(f"  {cf['custom_field_id']}: {cf['value']}")


@cc.command()
@click.argument("emails", nargs=-1)
@click.option("-t", "--test", is_flag=True, help="Delete all test contacts")
@click.option("-n", "--dry-run", is_flag=True, help="Show what would be deleted")
@click.option("-y", "--yes", is_flag=True, help="Skip confirmation")
def delete(emails, test, dry_run, yes):
    """Delete contacts by email or --test flag."""
    tokens = refresh_tokens_if_needed(load_tokens())
    headers = get_headers(tokens)

    to_delete = []

    if test:
        contacts = fetch_all_contacts(headers)
        for c in contacts:
            email = c.get("email_address", {}).get("address", "")
            if any(x in email.lower() for x in ["+test", "test@", ".test"]):
                to_delete.append((email, c.get("contact_id")))
    else:
        for email in emails:
            resp = requests.get(
                f"{BASE_URL}/v3/contacts",
                params={"email": email},
                headers=headers,
            )
            if resp.status_code == 200:
                contacts = resp.json().get("contacts", [])
                if contacts:
                    to_delete.append((email, contacts[0].get("contact_id")))
                else:
                    err(f"Not found: {email}")

    if not to_delete:
        click.echo("No contacts to delete")
        return

    click.echo(f"Contacts to delete ({len(to_delete)}):")
    for email, cid in to_delete:
        click.echo(f"  {email} ({cid})")

    if dry_run:
        click.echo("(dry run, nothing deleted)")
        return

    if not yes:
        if not click.confirm("Proceed with deletion?"):
            return

    for email, cid in to_delete:
        resp = requests.delete(f"{BASE_URL}/v3/contacts/{cid}", headers=headers)
        if resp.status_code == 204:
            click.echo(f"Deleted: {email}")
        else:
            err(f"Failed to delete {email}: {resp.status_code}")
