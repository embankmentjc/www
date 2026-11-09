import { describe, expect, it } from "vitest"
import { parseRawDiff, violations } from "../../../.github/scripts/check-paths.mjs"

const entry = (path: string, newMode = "100644", oldMode = "000000") => ({ oldMode, newMode, path })

describe("agent change boundary", () => {
    it.each([
        "pages/index.tsx",
        "pages/index.module.scss",
        "pages/embankment-on-my-mind.module.css",
        "components/theme.tsx",
        "components/ids.ts",
        "components/deep/nested.module.scss",
        "public/images/sponsors/logo.png",
        "public/images/2025-renders/30p/Bridge.JPEG",
        "public/images/flyer.pdf",
        "public/pdf/report.pdf",
        "public/css/style.css",
    ])("allows %s", path => {
        expect(violations([entry(path)])).toEqual([])
    })

    it.each([
        "functions/api/exfil.ts",
        "functions/_middleware.ts",
        "scripts/generate-static-pages.sh",
        "vite.config.ts",
        "package.json",
        "pnpm-lock.yaml",
        "wrangler.jsonc",
        "migrations/0003_x.sql",
        "specs/agent-intake.md",
        "CLAUDE.md",
        ".claude/settings.json",
        ".mcp.json",
        "index.html",
        "src/App.tsx",
        "public/_headers",
        "public/_redirects",
        "public/_routes.json",
        "public/_worker.js",
        "_routes.json",
        ".github/workflows/agent-intake.yml",
        ".github/scripts/check-paths.mjs",
        "public/bat/cc-signup-with-email.php",
        "public/images/evil.svg",
        "public/images/evil.html",
        "public/images/_worker.js",
        "public/css/evil.js",
        "pages/page.html",
        "pagesfoo/index.tsx",
    ])("rejects %s", path => {
        expect(violations([entry(path)])).toEqual([{ path, reason: "path not allowed" }])
    })

    it("rejects a symlink inside an allowed directory", () => {
        expect(violations([entry("public/images/link.png", "120000")]))
            .toEqual([{ path: "public/images/link.png", reason: "mode 120000 not allowed" }])
    })

    it("rejects an executable bit and a submodule", () => {
        expect(violations([entry("pages/a.tsx", "100755"), entry("components/b.ts", "160000")])).toEqual([
            { path: "pages/a.tsx", reason: "mode 100755 not allowed" },
            { path: "components/b.ts", reason: "mode 160000 not allowed" },
        ])
    })

    it("allows deleting a file in bounds, and refuses deleting one out of bounds", () => {
        expect(violations([
            entry("pages/old.tsx", "000000", "100644"),
            entry("functions/api/signup.ts", "000000", "100644"),
        ])).toEqual([{ path: "functions/api/signup.ts", reason: "path not allowed" }])
    })

    it("treats an empty change as nothing to reject", () => {
        expect(violations([])).toEqual([])
    })
})

describe("raw diff parsing", () => {
    it("parses NUL-delimited `git diff --raw --no-renames -z` output, including odd names", () => {
        const raw = [
            ":000000 100644 0000000 abc1234 A", "pages/new page.tsx",
            ":100644 000000 abc1234 0000000 D", "pages/old\nname.tsx",
            ":100644 100755 abc1234 def5678 M", "components/a.ts",
            "",
        ].join("\0")
        expect(parseRawDiff(raw)).toEqual([
            { oldMode: "000000", newMode: "100644", path: "pages/new page.tsx" },
            { oldMode: "100644", newMode: "000000", path: "pages/old\nname.tsx" },
            { oldMode: "100644", newMode: "100755", path: "components/a.ts" },
        ])
    })

    it("parses empty output as no entries", () => {
        expect(parseRawDiff("")).toEqual([])
    })

    it("raises on output it cannot read, rather than passing it", () => {
        expect(() => parseRawDiff("garbage\0path\0")).toThrow("unparseable raw diff header: garbage")
    })
})
