-- Constant Contact OAuth state. Single row, id = 1.
-- Replaces bat/.cc-tokens.json; CC rotates the refresh token on every use, so
-- writes are conditional on the refresh_token we read (see functions/_lib/cc.ts).
CREATE TABLE IF NOT EXISTS cc_tokens (
  id            INTEGER PRIMARY KEY CHECK (id = 1),
  access_token  TEXT    NOT NULL,
  refresh_token TEXT    NOT NULL,
  expires_at    INTEGER NOT NULL,  -- unix seconds
  updated_at    INTEGER NOT NULL
);

-- One row per form submission. Replaces bat/signups.log.
-- Written before the Constant Contact call so a CC failure still leaves a record.
CREATE TABLE IF NOT EXISTS signups (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at INTEGER NOT NULL,     -- unix seconds
  email      TEXT    NOT NULL,
  first_name TEXT,
  last_name  TEXT,
  phone      TEXT,
  message    TEXT,
  source     TEXT,                 -- request path the submission arrived on
  cc_status  TEXT    NOT NULL DEFAULT 'pending',  -- pending | created | updated | failed
  cc_detail  TEXT                  -- error code or CC's reported action
);

CREATE INDEX IF NOT EXISTS signups_created_at ON signups (created_at);
CREATE INDEX IF NOT EXISTS signups_email ON signups (email);
