# Agent intake: turn a change request into a reviewable preview

Let the people who ask for site changes get a preview of those changes themselves, without going through Ryan, while Ryan stays the only person who can publish.

The loop this replaces already exists. Board members email requests; each one is read, implemented by an agent, deployed, and answered with a link. It works because people can describe a change in their own words and see the result. It is expensive because every step in between runs through one person's inbox and terminal.

Requests are not always one line of text, and they come from the wider board, not one or two people. Recent examples: a home-page banner for an event that should disappear once the event has passed, and a whole sponsor page that a board member made with an AI tool and sent as a zip plus screenshots. Often the request is "use this", so attachments are part of the problem.

## The design

**A web page and email are two transports over one core.**

```
transport → (identity, prompt, attachments, thread)
              ↓
          policy: what scopes does this identity have?
              ↓
          proposal record (D1)
              ↓
          dispatch: GitHub Actions runs the agent, read-only
              ↓
          publish: a patch is checked against an allowlist, pushed, and opened as a PR
              ↓
          Cloudflare Pages builds a preview URL for that branch
              ↓
          notify: email the requester a link to the proposal page
              ↓
          a human with `approve` merges → production
```

Everything between `policy` and `notify` is transport-agnostic.

**Sequence: web page plus outbound email first; inbound email second, and only if it's missed.** [`@open-athena/auth`] now provides sign-in, sessions, an allowlist and email sending, tested and on this stack, which removes the original reason to start with email. Inbound email remains the hardest part to secure: a provider account, webhook verification, trusting someone else's anti-spoofing verdict, and guards against forgery, loops and floods.

The real risk of a web page is that a volunteer board never opens it. So every interaction starts from an email: the requester gets a link to the page, and a board member's first visit is a request for a code. If adoption fails anyway, the inbound transport below is what to add, and `intake()` already accepts either.

## Sign-in

Use [`@open-athena/auth`], pinned to a commit of its `dist` branch (`be3cdf2` or later). Its Pages references are the closest fit: [`demo/`][auth demo] and [`examples/pages-functions/`][auth examples]. `$oa/jobs` and `$oa/transcripts` are the most recent adopters (both Workers), and show `<GrantsPanel>` and `<UserMenu>` in use.

- **Email codes are the first-class path** (`emailCodeAuth`, `<EmailCodeForm>` or `<SignInPanel emailAuth>`). Board members use a mix of Gmail, other consumer ISPs, and employer and Yahoo-hosted domains, so Google-only sign-in would lock some of them out.
- **A plain Google button is optional** (`@open-athena/auth/oidc`), and needs one OAuth client made by hand.
- **Out of scope:** One Tap, zero-click sign-in, SSO, and the `login.oa.dev` broker. EPC can pick those up once it is fully on Google Workspace.

**Allowlist.** Use auth's `allowed_emails` with `allowlistPolicy` and `d1Allowlist`, and its `<AllowlistPanel>`, rather than our own `senders` table. Scopes are free-form, so `propose` and `approve` fit, and `core.ts` takes the same `(email) => scopes | null` contract. `migrations/0002_intake.sql` has not reached remote D1, so `senders` can simply be dropped from it. The trade-off is that auth deletes a removed row, so we lose the `revoked_at` trail.

**Sending mail.** Email codes and notifications both need a verified sending domain, and `@open-athena/auth/resend` is the sender. Use a subdomain so the board's live mail is untouched. `embankment.org`'s DNS is at Turbify, so `scripts/provision-resend.mjs` (which writes to a Cloudflare zone) doesn't apply and the records go in by hand. The planned move to Google Workspace changes the apex MX, not a sending subdomain's records, but re-check them when it happens.

**Approving.** Merging on GitHub is enough for now. An emailed approve link should copy auth's decision-link design: sign the verb and id with `signSession`, show a confirm page on GET so mail scanners can't act, and commit on POST. `/decide` itself is tied to access requests and isn't reusable.

## Trust

**The blast radius is bounded by structure.** A proposal can only ever produce a branch, a PR and a preview URL, and publishing requires a human with `approve`. That property is what makes this acceptable, so these all have to hold:

- **`main` requires a PR**, through a repository ruleset. Without it, any write token could publish.
- **Nothing holding a write token runs code the agent wrote.** The workflow has three jobs:
  - `agent` is read-only. It holds the API key in one step, and captures the agent's change as a patch before any repo code runs.
  - `publish` holds the write token. It applies the patch to the index only, never to disk, and judges it with a script from a separate checkout of `main`.
  - `report` holds the callback secrets and has no checkout.
- **The agent can only edit files.** No shell, so no `git`, package scripts or network. It can't run tests itself; `agent` runs them afterwards and a failure stops `publish`.
- **The change boundary is an allowlist**, in [`.github/scripts/check-paths.mjs`][check-paths], with exact tests. Allowed: `pages/` and `components/` (TS, TSX, CSS, SCSS), `public/images/` (images, PDFs), `public/pdf/`, `public/css/`. Everything else fails the run, including `functions/`, `scripts/`, `src/App.tsx`, `package.json`, and `public/_headers`, `_redirects`, `_routes.json`. So do symlinks and executables anywhere, and SVG or HTML under `public/`, since both can run script on the site's origin. A request for a new route needs a human, because it touches `src/App.tsx` and `scripts/generate-static-pages.sh`.
- **No Cloudflare token in the backend or the workflow.** A token that can create Pages deployments can deploy anything to the account. Pages builds from the PR with its own credentials.
- **Request text is data, not instructions.** It reaches the agent between markers, and it reaches shell only through `env:`, quoted.

**Preview secrets are unverified.** Keeping `functions/` out of bounds is what stops an agent adding a Function that reads the preview's bindings. Check what the preview environment actually holds, and keep production secrets out of it where possible. This couldn't be checked from here (no Cloudflare token available).

**Attachments are untrusted data too.** See below.

## Privacy

The repo is public, and so are its PRs, commits, branch names and Actions logs.

- **Who asked stays in D1.** The dispatch payload carries no requester identity or subject. PR titles, PR bodies and commit messages carry only the proposal id, and the agent's own commit messages are flattened away.
- **The request text is omitted from PRs**, because it can quote emails, names and phone numbers. The reviewer reads it on the proposal page.
- **Known gap: the request text still reaches public Actions logs.** The prompt is an action input, and both the runner and `claude-code-action` print it. Fix this when building attachments, which need the same mechanism: dispatch only the proposal id, have `agent` fetch the request from an authenticated endpoint into a file, and point the agent at the file. Until then, treat requests as public, and say so on the page.
- **The diff itself is public**, and so is an ungated preview. Gating previews comes free with auth (below).

## Attachments

Not built yet. Upload to R2 from the proposal page, keyed by proposal, with size and type caps. `agent` fetches them with a token into a workspace directory excluded from the patch. It unpacks zips itself, guarding against path traversal and never executing anything. The agent reads them as reference material and copies in only what it uses; the allowlist still judges the result. Anything an AI tool generated is a suggestion: the requester's zip may include logos for sponsors who haven't signed, so a human still confirms facts in review.

## Transport: web page (first)

Three route files (`/auth/*`, `/api/auth/[[path]]`, `/api/intake/proposals`) and one page: an `AuthGate`-wrapped textarea with attachments, then a status page that shows the preview link and event history, and takes follow-ups. Auth's components are unstyled, so the SCSS is ours.

## Transport: inbound email (second, optional)

`functions/_lib/intake/adapters/email.ts` and `functions/api/intake/email.ts` exist and are tested, but aren't wired to a provider.

- **Cloudflare Email Routing isn't available.** It needs the zone on Cloudflare DNS, delegating one subdomain is Enterprise-only, and `embankment.org`'s MX is the board's live Yahoo mail.
- **Default: Resend inbound on `intake.embankment.org`**, with records at Turbify. Its free tier covers both directions, it reports structured SPF/DKIM/DMARC verdicts, and it signs its webhooks. It can be tried before any DNS change on its `*.resend.app` address. The adapter's `verifySignature` and payload shape must be rewritten for it: Resend signs with Svix, and its webhook carries metadata only, so verdicts need a follow-up API call.
- **Fallback with no DNS changes:** poll a Gmail account from a Cron Worker, which can't be a Pages Function. The cost is token upkeep: an unverified Google app, restricted scopes, and tokens that die on a password change.

**`From:` is not identity.** Two things are required before an email becomes a proposal: a valid webhook signature, and DMARC pass plus a sender on the allowlist. DMARC is the check that ties authentication to the `From:` domain, and SPF is deliberately not required because it breaks on forwarding. Don't rely on a receiver enforcing policy: `gmail.com` publishes `p=none`, so forged Gmail addresses get delivered. A failure is a silent drop, not a bounce, since replying to a spoofed address makes this a spam amplifier.

**Loops and floods.** Drop anything with `Auto-Submitted:` other than `no`, anything carrying `List-Id`, and robot senders. Dedupe on `Message-ID`. Cap proposals per sender per day.

**Threads are conversation state.** A reply on an existing thread reruns the agent on the same branch, with the whole request history.

## Storage

Alongside `signups`, `cc_tokens` and auth's tables:

- **`proposals`**: prompt (the request plus its follow-ups), sender, transport, thread key, branch, PR number, preview URL, status (`queued` → `running` → `preview` → `merged` | `failed` | `rejected`).
- **`proposal_events`**: append-only per proposal. It's the run history on the status page, and the answer to "who asked for this and when" a year from now.
- **`seen_messages`**: inbound dedupe, for the email transport.

## Dispatch

GitHub Actions via `repository_dispatch`, on a branch named `intake/<proposal-id>`. The token needs only Contents write on this repo. The agent is `anthropics/claude-code-action`, because it follows this repo's `CLAUDE.md`. It's passed the job's read-only `github_token` explicitly; otherwise it exchanges OIDC for the Claude GitHub App's token, which can write. Public-repo minutes are free, so the per-run cost is model tokens. Rerunning on the same branch keeps the alias URL stable.

`report` calls back to `/api/intake/callback` with `proposal_id`, `status` (`success`, `failure`, `no_changes`, `cancelled`) and `pr_url`. That endpoint and the notify path aren't built.

## Deployment and preview

The `epc-www` Pages project is on the Git integration, building `pnpm run build:cf` to `out-cf`, so every PR gets a preview URL. Until the DNS cutover in [`specs/cf-migration.md`][cf-migration], merging updates `epc-www.pages.dev` only, and `embankment.org` still needs the rsync deploy.

**Gating previews** comes with auth: a `functions/_middleware.ts` gates a preview deployment on a session cookie, and a named share link can stand in for sign-in, with an access log of who opened it.

## Why not buy

Nothing on the market fits people without GitHub accounts editing an existing custom codebase on Cloudflare Pages, as of 2026-10.

- **Claude Tag** (Claude in Slack) comes closest: tag `@Claude` in a channel, get a draft PR, no per-person seat. It could replace most of this if the board would use Slack.
- **Netlify Agent Runners** is built for exactly this, but needs a hosting move and Netlify logins for the board.
- **Everything else** needs an account per requester (Copilot coding agent, `@claude` on issues, Codex, Cursor, Devin), or is built around its own projects and priced per seat (Lovable, Bolt, v0, Builder.io).
- **Git-based CMSes** (Pages CMS, Tina, Decap) are worth revisiting if most requests turn out to be structured content, which would mean moving that content out of the TSX first.
- **Claude Code Routines** could later replace the dispatch step, once out of research preview, but runs as one person's account.

## Reuse

The goal is a second site getting this for the cost of configuration. **It stays in this repo until a second consumer exists.** To keep extraction a file move: site-specific values are configuration, the core imports no Cloudflare types outside `adapters/`, and each adapter is one file with one export.

## Status

**Built and tested:** the core, the email adapter and its guards, the GitHub dispatch adapter, the schema, the workflow, and the path allowlist. The workflow has never run end-to-end.

**Next:** adopt auth and drop `senders`; the proposal page and API; the callback and notifications; attachments and fetching the request by id; a first real run.

**Needed from Ryan:** the `main` ruleset; `ANTHROPIC_API_KEY`, `INTAKE_CALLBACK_URL` and `INTAKE_CALLBACK_TOKEN` as Actions secrets; "Allow GitHub Actions to create and approve pull requests" enabled for the repo; `GITHUB_TOKEN` and `SESSION_SECRET` as Pages secrets; a Resend account and the DNS records at Turbify; a check of the preview environment's secrets.

## Open questions

- **Who gets `approve`?** Ryan is the only one today, and a board member has asked whether designees should too. The scope supports it, so this is a policy decision.
- **What does the agent do when a request is ambiguous?** Today it guesses and the requester corrects it. Follow-ups make asking cheap, but it needs somewhere to ask.
- **How are follow-ups capped?** The daily cap counts proposals, so follow-ups on one proposal aren't limited, and each one costs a run.
- **Should the agent be able to run a build?** Off for now, to keep it file-only, so it finds out about failures only after the run.

[`@open-athena/auth`]: https://github.com/Open-Athena/auth
[auth demo]: https://github.com/Open-Athena/auth/tree/main/demo
[auth examples]: https://github.com/Open-Athena/auth/tree/main/examples/pages-functions
[check-paths]: ../.github/scripts/check-paths.mjs
[cf-migration]: cf-migration.md
