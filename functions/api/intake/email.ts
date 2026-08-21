/**
 * Inbound-email webhook: provider POSTs a message here, it becomes a proposal.
 *
 * Every rejection returns 200. A provider that sees an error retries, and a
 * retry of a message we deliberately dropped is noise; the body says what
 * happened for the provider's log, and `proposal_events` records it for ours.
 */

import { intake } from "../../_lib/intake/core"
import { d1Store } from "../../_lib/intake/store"
import { githubDispatch } from "../../_lib/intake/adapters/github"
import { screen, verifySignature, type InboundEmail } from "../../_lib/intake/adapters/email"

type Env = {
    DB: D1Database
    INTAKE_WEBHOOK_SECRET: string
    GITHUB_REPO: string
    GITHUB_TOKEN: string
}

const ok = (body: Record<string, unknown>) =>
    new Response(JSON.stringify(body), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    })

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
    if (request.method !== "POST") return ok({ dropped: "method" })
    if (!env.DB || !env.INTAKE_WEBHOOK_SECRET || !env.GITHUB_REPO || !env.GITHUB_TOKEN) {
        console.error("intake: missing D1 binding or INTAKE_* / GITHUB_* secrets")
        return ok({ dropped: "misconfigured" })
    }

    const raw = await request.text()
    const signature = request.headers.get("x-webhook-signature") ?? ""
    if (!(await verifySignature(raw, signature, env.INTAKE_WEBHOOK_SECRET))) {
        console.warn("intake: bad webhook signature")
        return ok({ dropped: "unverified" })
    }

    let email: InboundEmail
    try {
        email = JSON.parse(raw) as InboundEmail
    } catch {
        return ok({ dropped: "unparseable" })
    }

    const screened = screen(email)
    if (!screened.ok) return ok({ dropped: screened.reason })

    const result = await intake(screened.request, {
        store: d1Store(env.DB),
        dispatch: githubDispatch({ repo: env.GITHUB_REPO, token: env.GITHUB_TOKEN }),
    })
    if (!result.ok) return ok({ dropped: result.reason })

    return ok({
        accepted: result.proposal.id,
        followUp: result.followUp,
        branch: result.proposal.branch,
    })
}
