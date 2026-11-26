# Embankment Preservation Coalition Website

This is the website for the Embankment Preservation Coalition, a Jersey City organization working to preserve and restore the historic Harsimus Branch Embankment as a green corridor and part of the East Coast Greenway.

## Tech Stack

- **Framework**: Vite + React Router (SPA, statically exported per-route)
- **Language**: TypeScript + React
- **Styling**: SCSS modules + global styles in `public/css/`
- **Deployment**: Cloudflare Worker + static assets (`epc-www`), deployed by Workers Builds on every push to `main`

## Deployment

Worker `epc-www` in the EPC Cloudflare account serves `embankment.org`, `www.` and `dev.` (custom domains in `wrangler.jsonc` `routes`; `dev.` is just another name for prod) and https://epc-www.ryan-b49.workers.dev. Entry `functions/worker.ts`. Cutover history: `specs/cf-migration.md`.

**Important**: Always ask before building or deploying. Pushing to `main` deploys.

- **Workers Builds** (GitHub `embankmentjc/www`): pushes to `main` run `pnpm run build:cf` and deploy; other branches get preview URLs (use these for testing changes before merging)
- **Static assets** from `out-cf/`; the Worker runs first only for `/api/*` (signup, intake) and `/vision` (per-section OG stamping). Everything in `public/` is copied into `out-cf/` and publicly served, dotfiles included: never put credentials there
- **D1** `epc`: `signups` (every form submission) and `cc_tokens` (the Worker's Constant Contact token chain). Secrets `CC_CLIENT_ID`/`CC_CLIENT_SECRET`/`CC_LIST_ID` via `wrangler secret put`
- **DNS**: Cloudflare zone `embankment.org` (moved from Turbify 2026-11-25); mail is still Turbify/Yahoo MX

```bash
pnpm build               # = pnpm build:cf: Vite build to out-cf/, then per-route HTML shells + OG tags
pnpm cf:dev              # wrangler dev, port 8560 (Worker + local D1)
pnpm cf:deploy-preview   # build + upload a version under the `preview` alias
pnpm cf:deploy           # build + wrangler deploy (prod; normally Workers Builds does this)
```

### Build Configuration
- `build:cf` runs `scripts/generate-static-pages.sh` (per-route `index.html` shells) then `scripts/inject-og-tags.cjs` (reads each page's `ogMetadata` export and injects OG/Twitter/description tags into the static HTML)
- `VITE_SITE_URL` controls the domain in OG meta tags and other absolute URLs; it defaults to `https://embankment.org`

### Old shared host (Holistic)
The site used to be rsynced to a Holistic shared host (SSH alias `epc`, pinned to 192.195.68.148 since `embankment.org` now resolves to Cloudflare). It still serves its last deploy, including the PHP signup handler, to anything with stale DNS, until it's shut down. `./epc logs` reads its logs.

## Forms

Both forms (`components/signup-form.tsx`) POST to `/api/signup` (`functions/_lib/signup.ts`), which writes a `signups` row in D1 then adds the contact to Constant Contact (`functions/_lib/cc.ts`). Responses are `MFxxx` codes, inherited from the original PHP template.

- **CC custom field** "Signup Notes" (`text_area`, ID `4090fe26-d628-11f0-9e0c-02421f46342b`) holds the volunteer form's background/message
- **CC OAuth**: refresh tokens rotate on every use, so each holder needs its own chain: the Worker's lives in D1 `cc_tokens`, `./epc cc`'s in `tmp/.cc-tokens.json`. To re-authorize the Worker: `CC_TOKEN_FILE=tmp/.cc-worker-tokens.json node scripts/cc-authorize.js`, then `./epc cc seed-d1 tmp/.cc-worker-tokens.json`
- No email notifications (never worked on the old host either)

## Images & Optimization

### Directory Structure
- `public/images/` - all images
  - `og/` - optimized Open Graph images (1200x630px, 85% quality, 200-500KB)
  - `2025-renders/` - architectural renderings
    - `30p/` - 30% scaled versions
    - `50p/` - 50% scaled versions
  - `homepage-slides/50p/` - banner slider images
  - `now/` - Embankment NOW page images

### OG (Open Graph) Metadata
- Each page exports `ogMetadata` with `title`, `description`, `image`
- Images use relative paths (`/images/og/home.jpg`)
- `Page` component constructs absolute URLs using `VITE_SITE_URL`
- Test page at `/og-test` shows mock social media previews
- `/vision` sections: a `use-prms/sections` scroll spy names the in-view section in `?s=<id>` (`#<id>` and retired/long ids in `pages/vision-sections.json` `aliases` are adopted into it). On Cloudflare, the Worker (`functions/worker.ts`) rewrites the page's title / description / `og:image` per section; cards come from `pnpm og:vision` (`scripts/vision-og.py` → `public/images/og/vision/<id>.jpg`, re-renders only stale cards).

### Image Optimization Guidelines
- **Hero banners**: 1920px width max, 80-85% quality, 300-800KB target
- **OG images**: 1200x630px, 85% quality, 200-400KB target
- **Large photos**: Optimize with `magick ... -resize 1920x1920\> -quality 82 -interlace none`
- **Use ImageMagick** (`magick`/`convert` available on system)

## Code Conventions

### File Operations
- **Images**: Use relative paths in code (`/images/...`)
- **Trailing whitespace**: Remove from all files
- **Newlines**: End files with single newline
- **No tombstones**: Don't leave comments about removed code

### Git Workflow
- Use `git add -u` to stage modified files (avoid `git add -A` - user has untracked files to keep)
- Don't use `git clean -fd` - user has important untracked files
- Don't commit unless explicitly asked
- Use backticks around code symbols in commit messages (GitHub renders them)
- Don't build/deploy without asking first

### Component Patterns
- Export page metadata as `ogMetadata` from page files
- Use `@rdub/base/heading` for `H1`/`H2`/`H3`; `src/components/A.tsx` for links
- Fragment links: `H1`/`H2` auto-generate IDs from string titles and create clickable links
- Avoid nested `<a>` tags (invalid HTML; React will warn)

## Key Files & Directories

### Configuration
- `vite.config.ts` - Vite config; dev server port (8559) and `VITE_ALLOWED_HOSTS` for tailnet access
- `package.json` - npm scripts for build/deploy
- `wrangler.jsonc` - Worker, custom domains, assets, D1 binding
- `.envrc` - local env vars (CC credentials, Cloudflare API token; not committed)

### Pages
- `pages/*.tsx` - main pages, each exports `ogMetadata`
- `pages/og-test.tsx` - OG metadata test page (not linked in nav)

### Components
- `components/page.tsx` - main page wrapper, handles OG meta tags
- `components/theme.tsx` - reusable sections (ParallaxSection, ConceptSection, etc.)
- `components/nav.tsx` - navigation bar

### Backend
- `functions/worker.ts` - Worker entry (routing)
- `functions/_lib/` - signup handler, CC client, `/vision` OG stamping
- `migrations/` - D1 schema

### Scripts
- `scripts/cc-authorize.js` - OAuth authorization flow for Constant Contact (writes `tmp/.cc-tokens.json`, or `$CC_TOKEN_FILE`)
- `scripts/cc/` - Python scripts for CC backfill operations (see `scripts/cc/README.md`)
- `scripts/vision-og.py` - `/vision` per-section OG cards

### EPC CLI Tool
Python CLI at `scripts/epc/` with symlink `./epc` at repo root. Uses `uv` for dependency management.

```bash
./epc --help              # Show all commands

# Constant Contact
./epc cc list             # List all contacts
./epc cc list -t          # List test contacts only
./epc cc list -q ryan     # Filter by email substring
./epc cc list -c          # Count contacts
./epc cc lookup EMAIL     # Look up specific contact
./epc cc delete EMAIL...  # Delete contacts by email
./epc cc delete -t        # Delete all test contacts
./epc cc refresh          # Refresh OAuth tokens

./epc cc seed-d1 FILE     # Copy a token file's chain into D1 cc_tokens (for the Worker)

# Old shared host's logs (until it's shut down)
./epc logs list           # List available logs
./epc logs tail access    # Tail access log
./epc logs tail signups -f  # Follow signups log
./epc logs grep access "pattern"  # Search log
./epc logs errors         # Show recent 4xx/5xx errors
./epc logs signups        # Show recent signups
./epc logs backfill-d1    # Copy its signups.log into D1 signups (idempotent)
```

**Requirements**: `CC_CLIENT_ID` and `CC_CLIENT_SECRET` env vars for CC commands (set in `.envrc`).

## Known Issues & Gotchas

1. **Nested anchors** - avoid wrapping `<a>` tags in `H1`/`H2` components (they already render a link)
2. **CC token expiration** - an unused refresh token eventually expires; if signups start landing with `cc_status = 'failed'` in D1, re-authorize the Worker (see [Forms](#forms))
3. **Stale wrangler account cache** - if wrangler hits the wrong Cloudflare account (auth error 10000), delete `node_modules/.cache/wrangler/`

## Testing

### Local Development
```bash
npm run dev  # Start Vite dev server
# Visit http://localhost:8559
```

### OG Metadata Testing
Push a branch and open `/og-test` on its Workers Builds preview URL, or run `pnpm cf:dev` and visit http://localhost:8560/og-test.

### Form Testing
`pnpm cf:dev` (local D1) or a branch preview. Check:
- Constant Contact contact list (`./epc cc list -t` for test contacts; `./epc cc delete -t` to clean up)
- D1 `signups`: `npx wrangler d1 execute epc --remote --command "select * from signups order by id desc limit 5"`

## Resources

- **Main site**: https://embankment.org
- **Constant Contact**: https://app.constantcontact.com
- **East Coast Greenway**: https://www.greenway.org
