/**
 * Transport-agnostic core types.
 *
 * Nothing in this directory may import Cloudflare types or EPC-specific code
 * outside `adapters/` — that constraint is what keeps extraction to a second
 * site a file move rather than an untangling (see specs/agent-intake.md).
 */

/** What an identity is allowed to do. */
export type Scope = "propose" | "approve"

export type Sender = {
    email: string
    scopes: Scope[]
    revoked: boolean
}

/** Resolves an email address to its scopes, or null if it has none. */
export type Policy = (email: string) => Promise<Scope[] | null>

export type Transport = "email" | "web"

export type ProposalStatus =
    | "queued"
    | "running"
    | "preview"
    | "merged"
    | "failed"
    | "rejected"

export type Proposal = {
    id: string
    transport: Transport
    sender: string
    threadKey: string | null
    subject: string | null
    prompt: string
    status: ProposalStatus
    branch: string | null
    prNumber: number | null
    previewUrl: string | null
    detail?: string | null
}

/** A change request, normalized from whatever transport carried it. */
export type Request = {
    transport: Transport
    sender: string
    prompt: string
    subject?: string
    /** Groups follow-ups onto an existing proposal (an email thread root). */
    threadKey?: string
    /** Transport-level id used to drop duplicate deliveries. */
    messageId?: string
}

/** Why an inbound message was dropped without becoming a proposal. */
export type DropReason =
    | "unverified"       // signature or SPF/DKIM/DMARC failed
    | "not_allowed"      // sender absent from the allowlist, or revoked
    | "no_scope"         // on the allowlist, but without `propose`
    | "automated"        // auto-reply, mailing list, or no-reply sender
    | "duplicate"        // already seen this message id
    | "rate_limited"     // over the per-sender daily cap
    | "empty"            // nothing left after stripping quoted history
    | "dispatch_failed"  // recorded, but the runner could not be started

export type Intake =
    | { ok: true; proposal: Proposal; followUp: boolean }
    | { ok: false; reason: DropReason }

/** Starts an agent run for a proposal. Implemented by adapters/github.ts. */
export type Dispatch = (proposal: Proposal) => Promise<void>

/** Tells the requester where their preview is. Implemented per transport. */
export type Notify = (proposal: Proposal, message: string) => Promise<void>
