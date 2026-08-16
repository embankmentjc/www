# Embankment Preservation Coalition Website

This is the website for the Embankment Preservation Coalition, a Jersey City organization working to preserve and restore the historic Harsimus Branch Embankment as a green corridor and part of the East Coast Greenway.

## Tech Stack

- **Framework**: Vite + React Router (SPA, statically exported per-route)
- **Language**: TypeScript + React
- **Styling**: SCSS modules + global styles in `public/css/`
- **Deployment**: rsync to shared hosting server

## Server & Deployment

### SSH Access
- **Server alias**: `epc` (configured in `~/.ssh/config`)
- **Dev directory**: `~/dev_html/` → https://dev.embankment.org
- **Production directory**: `~/public_html/` → https://embankment.org

### Build & Deploy Scripts

```bash
# Production
npm run nb          # Build for production
npm run dm          # Deploy to production (rsync to public_html/)
npm run dmn         # Dry-run deploy to production

# Dev
npm run nbd         # Build for dev (with VITE_SITE_URL=https://dev.embankment.org)
npm run dd          # Deploy to dev (rsync to dev_html/)
npm run dbd         # Build for dev + deploy
npm run ddn         # Dry-run deploy to dev
```

**Important**: Always ask before building or deploying.

### Build Configuration
- Separate output directories prevent conflicts:
  - Dev builds go to `out-dev/` (via `npm run bd`, aliased `nbd`)
  - Prod builds go to `out-prod/` (via `npm run b`, aliased `nb`)
- Each build runs `scripts/generate-static-pages.sh` (per-route `index.html` shells) then `scripts/inject-og-tags.cjs` (reads each page's `ogMetadata` export and injects OG/Twitter/description tags into the static HTML)
- `VITE_SITE_URL` env var controls the domain in OG meta tags and other absolute URLs; it defaults to `https://embankment.org`, and `npm run bd` sets it to the dev domain
- Deploy rsyncs exclude server-managed paths (`.well-known/`, `bat/` logs and credentials) so `--delete` doesn't remove them

## Email & Form Submission Issues

### The Problem
The hosting provider **blocks outbound SMTP connections** at the network level:
- Ports 465 and 587 are blocked
- This is network-level blocking (TCP connection fails with "Network is unreachable")
- No amount of authentication, DKIM, or DMARC configuration will fix this
- Tested with: `timeout 3 bash -c '</dev/tcp/smtp.gmail.com/465'`

### Solutions Implemented

#### 1. Constant Contact API Integration
- **Scripts**: `scripts/cc-authorize.js`, `public/bat/cc-*.php`
- **Purpose**: Newsletter signups and volunteer form submissions
- **Auth**: OAuth2 flow with refresh tokens stored in `public/bat/.cc-tokens.json`
- **Credentials**: `CC_CLIENT_ID` and `CC_CLIENT_SECRET` in `.env` (not committed)
- **Handler**: `public/bat/cc-signup-with-email.php` - tries CC API, falls back gracefully
- **Custom Field**: "Signup Notes" (`text_area` type, ID: `4090fe26-d628-11f0-9e0c-02421f46342b`) stores volunteer background/messages
- **Backfill Scripts**: `scripts/cc/` contains Python scripts for backfilling notes from logs/CSVs

#### 2. Google Sheets Logging
- **Script**: `public/bat/google-sheets-append.php`
- **Purpose**: Backup logging of all form submissions
- **Auth**: Service account with JWT (RS256)
- **Setup**: See `GOOGLE-SHEETS-SETUP.md` for configuration
- **Credentials**: `public/bat/.google-service-account.json` (not committed)
- **PHP Compatibility**: Written for PHP 5.3+ (old-style array syntax, no null coalescing)

#### 3. File Logging
- **Location**: `/home/embankme/public_html/bat/signups.log`
- **Format**: Timestamped plain text entries
- **Purpose**: Always-available fallback when APIs fail

### Form Handlers
- `/involved` page has two forms:
  - **Volunteer form** (`#involved-section-volunteer`): has "Background" textarea, currently doesn't send to CC
  - **Signup form** (`#involved-section-signup`): basic name/email, sends to CC
- Both forms should use `cc-signup-with-email.php` which handles CC API + Google Sheets + file logging

### Email Sending (Currently Disabled)
The `cc-signup-with-email.php` attempts to send email notifications but gracefully fails due to SMTP blocking. The notifications would go to `embankment@embankment.org`. This is fine - the primary mechanisms (CC API, Google Sheets, file log) all work.

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
- `.env` - local env vars (CC credentials, not committed)

### Pages
- `pages/*.tsx` - main pages, each exports `ogMetadata`
- `pages/og-test.tsx` - OG metadata test page (not linked in nav)

### Components
- `components/page.tsx` - main page wrapper, handles OG meta tags
- `components/theme.tsx` - reusable sections (ParallaxSection, ConceptSection, etc.)
- `components/nav.tsx` - navigation bar

### Backend/Forms
- `public/bat/` - PHP scripts for form handling
  - `cc-*.php` - Constant Contact integration
  - `google-sheets-append.php` - Google Sheets logging
  - `.cc-tokens.json` - OAuth tokens (not committed)
  - `.google-service-account.json` - Service account credentials (not committed)

### Scripts
- `scripts/cc-authorize.js` - OAuth authorization flow for Constant Contact
- `scripts/restore-timestamps.sh` - Preserves file mtimes for rsync
- `scripts/cc/` - Python scripts for CC backfill operations (see `scripts/cc/README.md`)

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

# Deployment
./epc deploy dev          # Build and deploy to dev
./epc deploy prod         # Build and deploy to prod
./epc deploy dev -n       # Dry-run deploy to dev
./epc deploy build dev    # Build only (no deploy)

# Server Logs
./epc logs list           # List available logs
./epc logs tail access    # Tail access log
./epc logs tail signups -f  # Follow signups log
./epc logs grep access "pattern"  # Search log
./epc logs errors         # Show recent 4xx/5xx errors
./epc logs signups        # Show recent signups
```

**Requirements**: `CC_CLIENT_ID` and `CC_CLIENT_SECRET` env vars for CC commands (set in `.envrc`).

## Known Issues & Gotchas

1. **SMTP is completely blocked** - don't try to fix email sending, it won't work
2. **Nested anchors** - avoid wrapping `<a>` tags in `H1`/`H2` components (they already render a link)
3. **PHP version** - server runs old PHP, use compatible syntax (no `??`, use `array()` not `[]`)
4. **Function name collisions** - both CC and Google Sheets code define `getAccessToken()` - keep them named differently (`getGoogleAccessToken()`)
5. **CC token expiration** - tokens expire after ~60 days; if signups stop working, check `public/bat/.cc-tokens.json` (0 bytes = corrupted). Re-run `scripts/cc-authorize.js` to refresh.

## Testing

### Local Development
```bash
npm run dev  # Start Vite dev server
# Visit http://localhost:8559
```

### OG Metadata Testing
```bash
npm run dbd  # Build for dev and deploy
# Visit https://dev.embankment.org/og-test
```

### Form Testing
Test forms on dev site before deploying to production. Check:
- Constant Contact contact list
- Google Sheet (if configured)
- Log file at `/home/embankme/public_html/bat/signups.log`

## Resources

- **Main site**: https://embankment.org
- **Dev site**: https://dev.embankment.org
- **Constant Contact**: https://app.constantcontact.com
- **East Coast Greenway**: https://www.greenway.org
