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

## Notes

- **Rate limiting**: CC API may return 429 errors if you hit it too fast. The scripts include delays, but large batches may still hit limits. Re-run for any failures.
- **String vs text_area**: The original "Signup Message" field was `string` type (255 char limit). We switched to "Signup Notes" with `text_area` type which has no practical limit. CC doesn't allow changing field types after creation.
