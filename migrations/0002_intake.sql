-- Allowlist of people who may drive the agent, and what they may do.
-- DB-backed rather than hardcoded: the board changes, and adding someone
-- should not require a deploy.
CREATE TABLE IF NOT EXISTS senders (
  email      TEXT PRIMARY KEY,       -- lowercased
  scopes     TEXT NOT NULL,          -- comma-separated: propose, approve
  note       TEXT,
  added_at   INTEGER NOT NULL,
  revoked_at INTEGER                 -- non-null = revoked; kept for the audit trail
);

-- One row per change request, whatever transport it arrived on.
CREATE TABLE IF NOT EXISTS proposals (
  id          TEXT PRIMARY KEY,      -- also the branch suffix: intake/<id>
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  transport   TEXT NOT NULL,         -- email | web
  sender      TEXT NOT NULL,
  thread_key  TEXT,                  -- email Message-ID of the thread root
  subject     TEXT,
  prompt      TEXT NOT NULL,
  status      TEXT NOT NULL,         -- queued|running|preview|merged|failed|rejected
  branch      TEXT,
  pr_number   INTEGER,
  preview_url TEXT,
  detail      TEXT                   -- failure reason, or the agent's summary
);

CREATE INDEX IF NOT EXISTS proposals_thread ON proposals (thread_key);
CREATE INDEX IF NOT EXISTS proposals_sender_created ON proposals (sender, created_at);

-- Append-only history per proposal: the run log the web admin will render,
-- and the answer to "who asked for this?" a year from now.
CREATE TABLE IF NOT EXISTS proposal_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  proposal_id TEXT NOT NULL REFERENCES proposals (id),
  created_at  INTEGER NOT NULL,
  kind        TEXT NOT NULL,         -- received|dispatched|started|finished|notified|merged|dropped
  detail      TEXT
);

CREATE INDEX IF NOT EXISTS proposal_events_proposal ON proposal_events (proposal_id, created_at);

-- Dedupe inbound messages so a provider retry doesn't run the agent twice.
CREATE TABLE IF NOT EXISTS seen_messages (
  message_id TEXT PRIMARY KEY,
  seen_at    INTEGER NOT NULL
);
