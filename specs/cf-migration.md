# Cloudflare port

Move the site off shared hosting: static build to Cloudflare Pages, the PHP backend to a Pages Function backed by D1.

**Out of scope, deliberately:** the DNS cutover. This spec ends with the site fully working on a `*.pages.dev` URL while `embankment.org` still points at the shared host. Cutover is a separate, reversible step ([Cutover](#cutover), below) taken once the Pages deployment has been exercised.

Also out of scope: admin auth ([`@open-athena/auth`]) and agent-driven preview deploys. This port is the substrate those need — a D1 binding, Pages preview deployments, and a backend that isn't PHP 5.3 on a box we don't control — but neither is built here.

## What exists today

The public backend surface is **one endpoint**. `components/signup-form.tsx` posts `multipart/form-data` to `/bat/cc-signup-with-email.php` and reads a bare `MFxxx` string back. Two forms use it (newsletter signup, volunteer signup with a `message` field); nothing else on the site calls PHP.

`public/bat/` is ~900 LOC across five files, of which two are dead: `cc-signup.php` (superseded by `cc-signup-with-email.php`) and `rd-mailform.php` (the template's original mailer; the `rd-mailform` string that survives in `signup-form.tsx` is a CSS class, not a reference). `cc-auth.php` is the one-time OAuth authorization flow, run by hand.

The live handler does four things per submission:

| Step | Status today |
| --- | --- |
| Append to `bat/signups.log` | works |
| Append a row to a Google Sheet | **broken** — `.google-service-account.json` is absent on both `public_html` and `dev_html`, so `appendToSheet()` returns `false` every time |
| Email notification via PHPMailer | **broken by design** — the host blocks outbound SMTP at the network level |
| Create the contact in Constant Contact | works |

So of the four "redundant" sinks, two have been silently failing, and the file log is the only durable local record. Restoring the Sheets path is not a goal of this port; D1 replaces what it was for.

Constant Contact tokens live in `bat/.cc-tokens.json` (mode 0600) and are refreshed in-band on any request that finds them within 5 minutes of expiry. CC **rotates the refresh token on every use**, so that file is single-copy mutable state whose corruption breaks signups until someone re-runs the authorization flow by hand — the failure documented in `CLAUDE.md` as "0 bytes = corrupted". Config (`client_id`, `client_secret`, `list_id`) is in `bat/.cc-config.json`.

### Response contract

The client maps codes to user-facing strings; only `MF000` is treated as success.

| Code | Meaning |
| --- | --- |
| `MF000` | success |
| `MF002` | request came from a local IP |
| `MF003` | not a POST |
| `MF004` | no `email` field |
| `MF005` | `email` failed validation |
| `MF254` | Constant Contact rejected the contact |
| `MF255` | unhandled error |
| `MF256` | server misconfigured |

Preserve these exactly. The client is unchanged by this port apart from which URL it posts to.

## Target

### Hosting

A Pages project (`epc-www`), deployed by direct upload from the existing build output — `wrangler pages deploy out-prod`. Direct upload, not the Git integration, because it slots into the current build-then-deploy scripts without wiring Cloudflare to the GitHub repo yet. Per-branch preview deployments (which the agent-preview work will want) come with the Git integration; that swap is a follow-up, not a prerequisite.

The Pages build gets its own output directory, `out-cf/`, rather than reusing `out-prod/`. The two builds are not interchangeable — the client's form endpoint is baked in at build time (`VITE_SIGNUP_ENDPOINT`, defaulting to the PHP path) — so sharing a directory means a stray `npm run dm` can push a `/api/signup` build to the shared host and silently break both forms. Separate directories make that impossible rather than merely unlikely.

`out-dev/` keeps its role for the shared host's dev site until cutover.

### Routes

- `POST /api/signup` — the port of `cc-signup-with-email.php`.
- `POST /bat/cc-signup-with-email.php` — an alias to the same handler, so a stale HTML cache or a bookmarked form still works after cutover. Delete once the shared host is retired.

`GET` on either returns `MF003`, matching today.

### Storage

One D1 database (`epc`), two tables:

- `cc_tokens` — single-row token state (`access_token`, `refresh_token`, `expires_at`), replacing `.cc-tokens.json`. Refresh writes are conditional on the row's `refresh_token` still being the one we started from, so a concurrent double-refresh loses one write rather than clobbering a rotated token with a stale one. At this traffic level a lost race means one retried request, not an outage.
- `signups` — one row per submission, replacing `signups.log`. Written *before* the Constant Contact call, so a CC failure still leaves a record; `cc_status` is updated after.

### Secrets

Set with `wrangler pages secret put`, sourced from the shared host's `bat/.cc-config.json` and `bat/.cc-tokens.json`:

- `CC_CLIENT_ID`, `CC_CLIENT_SECRET`, `CC_LIST_ID` — also present in the local `.envrc`.
- The initial `cc_tokens` row is seeded from `.cc-tokens.json` via `wrangler d1 execute` rather than being a secret.

No Google service-account key: the Sheets path is dropped rather than fixed.

### What is not ported

- **PHPMailer / SMTP.** Dead on arrival on the old host. A Worker *can* send mail through an HTTP email API, but that's a new dependency and a new decision (which provider, which from-address, does it need DKIM on `embankment.org`), so it gets its own spec. D1 plus Constant Contact's own notifications cover the need in the meantime.
- **Google Sheets.** Broken for long enough that nobody noticed; D1 is the durable record now, and `./epc` can grow a query subcommand.
- **The local-IP block** (`MF002`). It existed to stop the template's demo form mailing from a dev box. Keep the code in the response table for compatibility, but a Function has no equivalent condition to check; it is never returned. Abuse control, if it turns out to be needed, is Turnstile — a follow-up.

## Testing

`vitest`, against the handler's pure parts with `fetch` stubbed: field parsing and validation, the exact `MFxxx` returned per input, the Constant Contact request body (custom-field IDs are easy to typo and impossible to notice), and token-refresh behaviour including the rotation race. The D1 layer is exercised through `wrangler pages dev`, not mocked.

Local-dev gotcha, since it cost time once: `wrangler pages dev --d1 DB=epc` binds a *different* local database than `wrangler d1 execute epc --local` writes to, so migrations appear to apply and then the handler reports `no such table`. Omit the flag and let `wrangler.jsonc` supply the binding.

## Cutover

Deferred; listed here so the sequence is written down before it's needed.

1. Exercise both forms against the `*.pages.dev` deployment; confirm the contact appears in Constant Contact and a row lands in `signups`.
2. Backfill `signups` from `bat/signups.log` so the D1 table is the complete record.
3. Re-seed `cc_tokens` immediately before the switch — the shared host keeps rotating the refresh token until it stops serving, so the row must be written from the *final* `.cc-tokens.json`.
4. Point `embankment.org` and `dev.embankment.org` at Pages.
5. Leave the shared host running, untouched, until the new deployment has taken real signups. Rollback is a DNS change back.
6. Retire `public/bat/` and the `.well-known` rsync exclusion that exists only for the old host's certbot.

## Follow-ups

- Pages Git integration, for per-branch preview URLs.
- [`@open-athena/auth`] on `/admin`, with EPC as its second Tier-2 consumer.
- Agent-driven edits: admin prompt → branch → preview deployment → human approves → merge.
- `./epc signups` reading D1 instead of `ssh epc tail`.
- Email notifications, if anyone actually wants them.
- Turnstile on the forms, if spam appears.

[`@open-athena/auth`]: https://github.com/Open-Athena/auth
