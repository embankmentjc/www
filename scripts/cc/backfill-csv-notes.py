#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.11"
# dependencies = ["click", "requests"]
# ///
"""Backfill signup notes from historical CSV export to Constant Contact."""

from click import command, option
from pathlib import Path
import csv
import json
import requests


def refresh_token(config: dict, tokens: dict) -> dict | None:
    """Refresh the access token."""
    resp = requests.post(
        'https://authz.constantcontact.com/oauth2/default/v1/token',
        auth=(config['client_id'], config['client_secret']),
        data={
            'grant_type': 'refresh_token',
            'refresh_token': tokens['refresh_token'],
        },
    )
    if resp.status_code == 200:
        return resp.json()
    print(f"Token refresh failed: {resp.status_code} {resp.text}")
    return None


def get_contact_by_email(access_token: str, email: str) -> dict | None:
    """Look up a contact by email."""
    resp = requests.get(
        'https://api.cc.email/v3/contacts',
        headers={'Authorization': f'Bearer {access_token}'},
        params={'email': email, 'include': 'custom_fields'},
    )
    if resp.status_code == 200:
        data = resp.json()
        if data.get('contacts'):
            return data['contacts'][0]
    return None


def update_contact_custom_field(
    access_token: str,
    contact_id: str,
    email: str,
    custom_field_id: str,
    value: str,
) -> bool:
    """Update a contact's custom field."""
    resp = requests.put(
        f'https://api.cc.email/v3/contacts/{contact_id}',
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
        },
        json={
            'update_source': 'Account',
            'email_address': {'address': email},
            'custom_fields': [{
                'custom_field_id': custom_field_id,
                'value': value,
            }],
        },
    )
    if resp.status_code == 200:
        return True
    print(f"  Update failed: {resp.status_code} {resp.text}")
    return False


def parse_csv(csv_path: str) -> list[dict]:
    """Parse CSV and return entries with non-empty messages."""
    signups = []
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = row.get('Email', '').strip().lower()
            message = row.get('Message', '').strip()

            # Skip empty emails or messages
            if not email or not message:
                continue

            # Skip test entries
            if 'test' in email or 'disregard' in message.lower():
                continue

            # Skip spam
            if '@testform.xyz' in email:
                continue
            if 'app design glory' in message.lower():
                continue
            if 'data field includes' in message.lower():
                continue

            signups.append({
                'email': email,
                'message': message,
                'name': f"{row.get('First', '')} {row.get('Last', '')}".strip(),
            })

    return signups


@command
@option('-c', '--config', 'config_path', default='tmp/.cc-config.json', help='Path to CC config')
@option('-C', '--csv', 'csv_path', required=True, help='Path to CSV file')
@option('-d', '--dry-run', is_flag=True, help='Show what would be done without making changes')
@option('-t', '--tokens', 'tokens_path', default='tmp/.cc-tokens.json', help='Path to CC tokens')
def main(config_path: str, csv_path: str, dry_run: bool, tokens_path: str):
    # Load config and tokens
    config = json.loads(Path(config_path).read_text())
    tokens = json.loads(Path(tokens_path).read_text())

    # Refresh token
    print("Refreshing access token...")
    new_tokens = refresh_token(config, tokens)
    if not new_tokens:
        print("Failed to refresh token")
        return
    access_token = new_tokens['access_token']
    print("Token refreshed successfully")

    # Parse CSV
    signups = parse_csv(csv_path)
    print(f"\nFound {len(signups)} signups with messages in CSV")

    # Dedupe by email, keeping latest (last in file) message
    by_email = {}
    for s in signups:
        by_email[s['email']] = s
    signups = list(by_email.values())
    print(f"After deduplication: {len(signups)} unique emails")

    # Custom field ID for "Signup Notes" (text_area type)
    custom_field_id = '4090fe26-d628-11f0-9e0c-02421f46342b'

    # Process each signup
    updated = 0
    skipped = 0
    not_found = 0
    already_has = 0

    for signup in signups:
        email = signup['email']
        message = signup['message']
        print(f"\n{email}:")
        print(f"  Message: {message[:80]}{'...' if len(message) > 80 else ''}")

        if dry_run:
            print("  [DRY RUN] Would look up and potentially update")
            continue

        # Look up contact
        contact = get_contact_by_email(access_token, email)
        if not contact:
            print("  Not found in CC")
            not_found += 1
            continue

        contact_id = contact['contact_id']

        # Check if already has a message in this field
        existing = None
        for cf in contact.get('custom_fields', []):
            if cf['custom_field_id'] == custom_field_id:
                existing = cf.get('value')
                break

        if existing:
            print(f"  Already has message: {existing[:50]}...")
            already_has += 1
            continue

        # Update
        if update_contact_custom_field(access_token, contact_id, email, custom_field_id, message):
            print("  Updated!")
            updated += 1
        else:
            skipped += 1

    print(f"\n\nSummary:")
    print(f"  Updated: {updated}")
    print(f"  Already had message: {already_has}")
    print(f"  Not found in CC: {not_found}")
    print(f"  Failed to update: {skipped}")


if __name__ == '__main__':
    main()
