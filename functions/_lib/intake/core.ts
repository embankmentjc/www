/**
 * Transport-agnostic intake: turn a normalized Request into a Proposal, or
 * drop it with a reason.
 *
 * Every check here is a *drop*, never a bounce. Replying to a message that
 * failed verification means replying to a forged address, which turns this
 * endpoint into a spam amplifier.
 */

import type { Dispatch, Intake, Proposal, Request, Scope } from "./types"
import type { Store } from "./store"

export type Limits = {
    /** Proposals one sender may create per rolling day. */
    perSenderPerDay: number
}

export const DEFAULT_LIMITS: Limits = { perSenderPerDay: 10 }

const DAY_SECS = 86_400

const ID_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"
const ID_LENGTH = 10
/** Largest multiple of the alphabet size in a byte; bytes at or above it would bias the id. */
const ID_BYTE_LIMIT = 256 - (256 % ID_ALPHABET.length)

/** Short, URL-safe, and unguessable: branch names are public on a public repo. */
export function proposalId(fill: (bytes: Uint8Array) => void = bytes => crypto.getRandomValues(bytes)): string {
    const bytes = new Uint8Array(ID_LENGTH)
    let out = ""
    while (out.length < ID_LENGTH) {
        fill(bytes)
        for (const byte of bytes) {
            if (byte < ID_BYTE_LIMIT && out.length < ID_LENGTH) out += ID_ALPHABET[byte % ID_ALPHABET.length]
        }
    }
    return out
}

export const branchFor = (id: string) => `intake/${id}`

/**
 * The request so far: a rerun has to see what was originally asked, not just
 * "actually, make it blue".
 */
export const appendFollowUp = (history: string, followUp: string) =>
    `${history}\n\n--- Follow-up ---\n\n${followUp}`

/**
 * Start the run, or record why it could not start.
 *
 * A throw here must not reach the transport: the provider would see an error,
 * retry, and hit the dedupe guard — stranding a proposal in `queued` with no
 * runner and no trace. Recording `failed` leaves something a human can retry.
 */
async function tryDispatch(proposal: Proposal, deps: IntakeDeps): Promise<boolean> {
    try {
        await deps.dispatch(proposal)
        await deps.store.appendEvent(proposal.id, "dispatched")
        return true
    } catch (e) {
        const detail = String(e)
        console.error(`intake: dispatch failed for ${proposal.id}: ${detail}`)
        await deps.store.updateProposal(proposal.id, { status: "failed", detail })
        await deps.store.appendEvent(proposal.id, "dropped", detail)
        return false
    }
}

/** DB-backed policy, matching `@open-athena/auth`'s `EmailPolicy` contract. */
export function storePolicy(store: Store) {
    return async (email: string): Promise<Scope[] | null> => {
        const sender = await store.getSender(email)
        if (!sender || sender.revoked) return null
        return sender.scopes.length ? sender.scopes : null
    }
}

export type IntakeDeps = {
    store: Store
    dispatch: Dispatch
    limits?: Limits
    newId?: () => string
}

/**
 * Admit a request, or drop it.
 *
 * Verification of the transport itself (webhook signature, DMARC)
 * happens in the adapter, before this is called — by the time a Request
 * exists, the sender address is considered authenticated. What remains here
 * is authorization and abuse control.
 */
export async function intake(req: Request, deps: IntakeDeps): Promise<Intake> {
    const { store } = deps
    const limits = deps.limits ?? DEFAULT_LIMITS
    const newId = deps.newId ?? (() => proposalId())

    const prompt = req.prompt.trim()
    if (!prompt) return { ok: false, reason: "empty" }

    if (req.messageId && (await store.seenMessage(req.messageId))) {
        return { ok: false, reason: "duplicate" }
    }

    const sender = req.sender.toLowerCase()
    const scopes = await storePolicy(store)(sender)
    if (!scopes) return { ok: false, reason: "not_allowed" }
    if (!scopes.includes("propose")) return { ok: false, reason: "no_scope" }

    const since = Math.floor(Date.now() / 1000) - DAY_SECS
    if ((await store.countRecentProposals(sender, since)) >= limits.perSenderPerDay) {
        return { ok: false, reason: "rate_limited" }
    }

    if (req.messageId) await store.markMessageSeen(req.messageId)

    // A reply on an existing thread refines that proposal rather than opening
    // a second one — which is how these requests actually arrive.
    const existing = req.threadKey ? await store.findProposalByThread(req.threadKey) : null
    if (existing && existing.status !== "merged") {
        const history = appendFollowUp(existing.prompt, prompt)
        const updated: Proposal = { ...existing, prompt: history, status: "queued" }
        await store.updateProposal(existing.id, { prompt: history, status: "queued" })
        await store.appendEvent(existing.id, "received", "follow-up")
        if (!(await tryDispatch(updated, deps))) return { ok: false, reason: "dispatch_failed" }
        return { ok: true, proposal: updated, followUp: true }
    }

    const id = newId()
    const proposal: Proposal = {
        id,
        transport: req.transport,
        sender,
        threadKey: req.threadKey ?? null,
        subject: req.subject ?? null,
        prompt,
        status: "queued",
        branch: branchFor(id),
        prNumber: null,
        previewUrl: null,
    }
    await store.createProposal(proposal)
    await store.appendEvent(id, "received", req.transport)
    if (!(await tryDispatch(proposal, deps))) return { ok: false, reason: "dispatch_failed" }
    return { ok: true, proposal, followUp: false }
}
