# Constant Contact Scripts

Scripts for managing Constant Contact integration.

## Prerequisites

Copy credentials from server to `tmp/`:
```bash
scp epc:public_html/bat/.cc-tokens.json epc:public_html/bat/.cc-config.json tmp/
```

## Scripts

### `update-past-notes.py`

Backfill signup notes from `signups.log` (server log file) to CC "Signup Notes" field.

```bash
# First, copy log from server
scp epc:public_html/bat/signups.log tmp/

# Dry run
./update-past-notes.py --dry-run

# Run for real
./update-past-notes.py
```

### `backfill-csv-notes.py`

Backfill signup notes from historical CSV export to CC.

```bash
# Dry run
./backfill-csv-notes.py --csv "path/to/export.csv" --dry-run

# Run for real
./backfill-csv-notes.py --csv "path/to/export.csv"
```

## Custom Field

- **Field name**: "Signup Notes"
- **Field ID**: `4090fe26-d628-11f0-9e0c-02421f46342b`
- **Type**: `text_area` (no practical length limit)
