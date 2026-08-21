/**
 * Inbound-email adapter.
 *
 * Provider-agnostic on purpose: Cloudflare Email Routing needs the zone on
 * Cloudflare, and embankment.org's MX is the board's live Yahoo mail (see
 * specs/agent-intake.md). Swapping providers means rewriting `normalize` and
 * `verifySignature` — nothing downstream changes.
 */

import type { DropReason, Request } from "../types"

export type InboundEmail = {
    messageId: string
    from: string
    subject: string
    body: string
    inReplyTo?: string
    references?: string[]
    auth: { spf: boolean; dkim: boolean; dmarc: boolean }
    autoSubmitted: boolean
    listId?: string
}

/** Addresses that never represent a person asking for a change. */
const ROBOT_LOCALPARTS = /^(no-?reply|donotreply|mailer-daemon|postmaster|bounces?)(\+|@|$)/i

/** `"Katy Lyness" <katylyness@gmail.com>` → `katylyness@gmail.com` */
export function parseAddress(raw: string): string {
    const angled = raw.match(/<([^>]+)>/)
    return (angled ? angled[1] : raw).trim().toLowerCase()
}

/**
 * Strip quoted history and signatures, so a one-line reply doesn't arrive as
 * the entire thread. Cuts at the first line that looks like a quote header,
 * a `>` block, or a signature delimiter.
 */
export function stripQuoted(body: string): string {
    const lines = body.replace(/\r\n/g, "\n").split("\n")
    const cut = lines.findIndex(line =>
        /^>/.test(line) ||
        /^-- ?$/.test(line.trimEnd()) ||
        /^On .+ wrote:$/.test(line.trim()) ||
        /^_{10,}$/.test(line.trim()) ||
        /^From: .+/.test(line.trim()) ||
        /^Sent from my /.test(line.trim()),
    )
    const kept = cut === -1 ? lines : lines.slice(0, cut)
    return kept.join("\n").trim()
}

/**
 * Decide whether an inbound message may become a change request.
 *
 * `From:` is not identity — a message is only considered authenticated when
 * the provider reports SPF, DKIM, *and* DMARC passing. Authorization (is this
 * address on the allowlist?) is the core's job, not this function's.
 */
export function screen(email: InboundEmail): { ok: true; request: Request } | { ok: false; reason: DropReason } {
    if (email.autoSubmitted || email.listId) return { ok: false, reason: "automated" }

    const from = parseAddress(email.from)
    if (ROBOT_LOCALPARTS.test(from)) return { ok: false, reason: "automated" }

    const { spf, dkim, dmarc } = email.auth
    if (!spf || !dkim || !dmarc) return { ok: false, reason: "unverified" }

    const prompt = stripQuoted(email.body)
    if (!prompt) return { ok: false, reason: "empty" }

    // The thread root groups follow-ups; References[0] is it when present,
    // otherwise this message starts its own thread.
    const threadKey = email.references?.[0] ?? email.inReplyTo ?? email.messageId

    return {
        ok: true,
        request: {
            transport: "email",
            sender: from,
            prompt,
            subject: email.subject,
            threadKey,
            messageId: email.messageId,
        },
    }
}

/**
 * Constant-time comparison of a provider webhook signature.
 *
 * Providers differ in how the signature is computed; this verifies the common
 * shape (HMAC-SHA256 over the raw body, hex-encoded). Swap alongside `normalize`.
 */
export async function verifySignature(rawBody: string, signature: string, secret: string): Promise<boolean> {
    if (!signature || !secret) return false
    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    )
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody))
    const expected = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("")
    if (expected.length !== signature.length) return false
    let diff = 0
    for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
    return diff === 0
}
