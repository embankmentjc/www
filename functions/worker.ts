/**
 * Worker entry: static assets (`out-cf`) plus the few dynamic routes. `run_worker_first` in `wrangler.jsonc` sends
 * only these paths here; everything else is served straight from assets.
 */

import type { CcEnv } from "./_lib/cc"
import { handleSignup } from "./_lib/signup"
import { sectionMeta, stampMeta } from "./_lib/visionOg"
import { handleIntakeEmail, type IntakeEnv } from "./api/intake/email"

type Env = CcEnv & IntakeEnv & { ASSETS: Fetcher }

export default {
    async fetch(request, env): Promise<Response> {
        const url = new URL(request.url)
        switch (url.pathname) {
            case "/api/signup":
            // Legacy alias: the shared host served this path, so a cached page or a bookmarked form can still post
            // here after the cutover. Delete once the old host is retired (see specs/cf-migration.md).
            case "/bat/cc-signup-with-email.php":
                return handleSignup(request, env)
            case "/api/intake/email":
                return handleIntakeEmail(request, env)
            case "/vision":
            case "/vision/":
                return vision(request, env)
        }
        return env.ASSETS.fetch(request)
    },
} satisfies ExportedHandler<Env>

/** `/vision?s=<id>`: stamp the linked section's title / description / og:image into the static page. */
async function vision(request: Request, env: Env): Promise<Response> {
    const res = await env.ASSETS.fetch(request)
    const meta = request.method === "GET" ? sectionMeta(new URL(request.url)) : null
    if (!meta || !(res.headers.get("content-type") ?? "").startsWith("text/html")) return res
    return stampMeta(res, meta)
}
