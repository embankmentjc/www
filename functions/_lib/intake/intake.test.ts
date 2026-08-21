import { describe, expect, it, vi } from "vitest"
import { branchFor, intake, proposalId } from "./core"
import { parseAddress, screen, stripQuoted, verifySignature, type InboundEmail } from "./adapters/email"
import type { Store } from "./store"
import type { Proposal, Scope } from "./types"

/** In-memory Store, so core logic is testable without D1. */
function memStore(senders: Record<string, { scopes: Scope[]; revoked?: boolean }> = {}): Store & {
    proposals: Map<string, Proposal>
    events: { proposalId: string; kind: string; detail?: string }[]
} {
    const proposals = new Map<string, Proposal>()
    const events: { proposalId: string; kind: string; detail?: string }[] = []
    const seen = new Set<string>()
    let recentCount = 0
    return {
        proposals,
        events,
        setRecent: (n: number) => (recentCount = n),
        async getSender(email) {
            const s = senders[email.toLowerCase()]
            return s ? { email, scopes: s.scopes, revoked: Boolean(s.revoked) } : null
        },
        async seenMessage(id) { return seen.has(id) },
        async markMessageSeen(id) { seen.add(id) },
        async countRecentProposals() { return recentCount },
        async findProposalByThread(key) {
            return [...proposals.values()].find(p => p.threadKey === key) ?? null
        },
        async getProposal(id) { return proposals.get(id) ?? null },
        async createProposal(p) { proposals.set(p.id, p) },
        async updateProposal(id, patch) {
            const cur = proposals.get(id)
            if (cur) proposals.set(id, { ...cur, ...patch })
        },
        async appendEvent(proposalId, kind, detail) { events.push({ proposalId, kind, detail }) },
    } as never
}

const katy = { "katy@example.org": { scopes: ["propose"] as Scope[] } }

const request = (over: Partial<Parameters<typeof intake>[0]> = {}) => ({
    transport: "email" as const,
    sender: "katy@example.org",
    prompt: "Add the poem to the list of mediums",
    messageId: "<m1@mail>",
    ...over,
})

const deps = (store: Store, dispatch = vi.fn(async () => {})) => ({
    store,
    dispatch,
    newId: () => "abc1234567",
})

describe("intake authorization", () => {
    it("drops a sender who is not on the allowlist", async () => {
        expect(await intake(request({ sender: "stranger@example.com" }), deps(memStore(katy))))
            .toEqual({ ok: false, reason: "not_allowed" })
    })

    it("drops a revoked sender", async () => {
        const store = memStore({ "katy@example.org": { scopes: ["propose"], revoked: true } })
        expect(await intake(request(), deps(store))).toEqual({ ok: false, reason: "not_allowed" })
    })

    it("drops an allowlisted sender who may only approve", async () => {
        const store = memStore({ "katy@example.org": { scopes: ["approve"] } })
        expect(await intake(request(), deps(store))).toEqual({ ok: false, reason: "no_scope" })
    })

    it("matches the allowlist case-insensitively", async () => {
        const dispatch = vi.fn(async () => {})
        const result = await intake(request({ sender: "Katy@Example.ORG" }), deps(memStore(katy), dispatch))
        expect(result.ok && result.proposal.sender).toBe("katy@example.org")
    })
})

describe("intake abuse control", () => {
    it("drops a duplicate delivery without dispatching", async () => {
        const store = memStore(katy)
        const dispatch = vi.fn(async () => {})
        await intake(request(), deps(store, dispatch))
        const second = await intake(request(), deps(store, dispatch))

        expect(second).toEqual({ ok: false, reason: "duplicate" })
        expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it("drops a sender over the daily cap", async () => {
        const store = memStore(katy) as never as Store & { setRecent(n: number): void }
        store.setRecent(10)
        expect(await intake(request(), deps(store))).toEqual({ ok: false, reason: "rate_limited" })
    })

    it("drops an empty prompt", async () => {
        expect(await intake(request({ prompt: "   \n  " }), deps(memStore(katy))))
            .toEqual({ ok: false, reason: "empty" })
    })
})

describe("intake proposal lifecycle", () => {
    it("creates a queued proposal on its own branch and dispatches once", async () => {
        const store = memStore(katy)
        const dispatch = vi.fn(async () => {})
        const result = await intake(request(), deps(store, dispatch))

        expect(result).toEqual({
            ok: true,
            followUp: false,
            proposal: {
                id: "abc1234567",
                transport: "email",
                sender: "katy@example.org",
                threadKey: null,
                subject: null,
                prompt: "Add the poem to the list of mediums",
                status: "queued",
                branch: "intake/abc1234567",
                prNumber: null,
                previewUrl: null,
            },
        })
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(store.events).toEqual([
            { proposalId: "abc1234567", kind: "received", detail: "email" },
            { proposalId: "abc1234567", kind: "dispatched", detail: undefined },
        ])
    })

    it("reuses the branch when a follow-up arrives on the same thread", async () => {
        const store = memStore(katy)
        const dispatch = vi.fn(async () => {})
        await intake(request({ threadKey: "<root@mail>" }), deps(store, dispatch))
        const followUp = await intake(
            request({ threadKey: "<root@mail>", messageId: "<m2@mail>", prompt: "actually, more space above it" }),
            deps(store, dispatch),
        )

        expect(followUp.ok && followUp.followUp).toBe(true)
        expect(followUp.ok && followUp.proposal.branch).toBe("intake/abc1234567")
        expect(followUp.ok && followUp.proposal.prompt).toBe("actually, more space above it")
        expect(store.proposals.size).toBe(1)
        expect(dispatch).toHaveBeenCalledTimes(2)
    })

    it("opens a new proposal when the thread's proposal already merged", async () => {
        const store = memStore(katy)
        await intake(request({ threadKey: "<root@mail>" }), deps(store))
        await store.updateProposal("abc1234567", { status: "merged" })

        const next = await intake(
            request({ threadKey: "<root@mail>", messageId: "<m2@mail>" }),
            { ...deps(store), newId: () => "def7654321" },
        )
        expect(next.ok && next.proposal.id).toBe("def7654321")
        expect(next.ok && next.followUp).toBe(false)
    })
})

describe("email screening", () => {
    const email = (over: Partial<InboundEmail> = {}): InboundEmail => ({
        messageId: "<m1@mail>",
        from: '"Katy Lyness" <katy@example.org>',
        subject: "Eco-Art website page",
        body: "Could you add a poem to the list of mediums?",
        auth: { spf: true, dkim: true, dmarc: true },
        autoSubmitted: false,
        ...over,
    })

    it("accepts a verified human message", () => {
        expect(screen(email())).toEqual({
            ok: true,
            request: {
                transport: "email",
                sender: "katy@example.org",
                prompt: "Could you add a poem to the list of mediums?",
                subject: "Eco-Art website page",
                threadKey: "<m1@mail>",
                messageId: "<m1@mail>",
            },
        })
    })

    it.each([
        ["spf", { spf: false, dkim: true, dmarc: true }],
        ["dkim", { spf: true, dkim: false, dmarc: true }],
        ["dmarc", { spf: true, dkim: true, dmarc: false }],
    ])("drops a message failing %s", (_name, auth) => {
        expect(screen(email({ auth }))).toEqual({ ok: false, reason: "unverified" })
    })

    it("drops auto-replies and mailing lists", () => {
        expect(screen(email({ autoSubmitted: true }))).toEqual({ ok: false, reason: "automated" })
        expect(screen(email({ listId: "<hccs.googlegroups.com>" }))).toEqual({ ok: false, reason: "automated" })
    })

    it("drops no-reply senders even when fully authenticated", () => {
        expect(screen(email({ from: "no-reply@squarespace.com" }))).toEqual({ ok: false, reason: "automated" })
        expect(screen(email({ from: "mailer-daemon@googlemail.com" }))).toEqual({ ok: false, reason: "automated" })
    })

    it("threads a reply onto the root, not onto its immediate parent", () => {
        const result = screen(email({
            messageId: "<m3@mail>",
            inReplyTo: "<m2@mail>",
            references: ["<root@mail>", "<m2@mail>"],
        }))
        expect(result.ok && result.request.threadKey).toBe("<root@mail>")
    })

    it("drops a reply that is nothing but quoted history", () => {
        expect(screen(email({ body: "> Could you add a poem?\n> Katy" }))).toEqual({ ok: false, reason: "empty" })
    })
})

describe("email parsing", () => {
    it("extracts the address from a display-name form", () => {
        expect(parseAddress('"Katy Lyness" <Katy@Example.ORG>')).toBe("katy@example.org")
        expect(parseAddress("katy@example.org")).toBe("katy@example.org")
    })

    it.each([
        ["quote header", "More space please.\n\nOn Sun, Aug 16, 2026 at 8:17 PM Ryan Williams wrote:\n> how's this?"],
        ["quote marker", "More space please.\n> how's this?"],
        ["signature", "More space please.\n-- \nKaty"],
        ["iphone footer", "More space please.\nSent from my iPhone"],
    ])("strips %s", (_name, body) => {
        expect(stripQuoted(body)).toBe("More space please.")
    })

    it("keeps a multi-line request intact", () => {
        const body = "Two changes:\n\n1. Add a poem\n2. More space\n\nOn Sun someone wrote:\n> old"
        expect(stripQuoted(body)).toBe("Two changes:\n\n1. Add a poem\n2. More space")
    })
})

describe("webhook signature", () => {
    const secret = "shhh"
    const body = '{"messageId":"<m1@mail>"}'

    it("accepts a signature computed over the raw body", async () => {
        const key = await crypto.subtle.importKey(
            "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
        )
        const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body))
        const hex = [...new Uint8Array(mac)].map(b => b.toString(16).padStart(2, "0")).join("")
        expect(await verifySignature(body, hex, secret)).toBe(true)
    })

    it("rejects a wrong, empty, or truncated signature", async () => {
        expect(await verifySignature(body, "deadbeef", secret)).toBe(false)
        expect(await verifySignature(body, "", secret)).toBe(false)
        expect(await verifySignature(body, "abc", secret)).toBe(false)
    })

    it("rejects when no secret is configured", async () => {
        expect(await verifySignature(body, "deadbeef", "")).toBe(false)
    })
})

describe("ids", () => {
    it("builds a branch name from a proposal id", () => {
        expect(branchFor("abc1234567")).toBe("intake/abc1234567")
    })

    it("generates lowercase alphanumeric ids of fixed length", () => {
        let seed = 0
        const id = proposalId(() => ((seed = (seed * 9301 + 49297) % 233280) / 233280))
        expect(id).toMatch(/^[a-z0-9]{10}$/)
    })
})

describe("dispatch failure", () => {
    const failing = vi.fn(async () => { throw new Error("github dispatch failed (401)") })

    it("records the proposal as failed instead of throwing at the transport", async () => {
        const store = memStore(katy)
        const result = await intake(request(), { ...deps(store), dispatch: failing })

        expect(result).toEqual({ ok: false, reason: "dispatch_failed" })
        expect(store.proposals.get("abc1234567")?.status).toBe("failed")
        expect(store.events.map(e => e.kind)).toEqual(["received", "dropped"])
    })

    it("leaves a stranded proposal visible rather than silently queued", async () => {
        const store = memStore(katy)
        await intake(request(), { ...deps(store), dispatch: failing })

        const stranded = store.proposals.get("abc1234567")!
        expect(stranded.status).toBe("failed")
        expect(stranded.detail).toContain("401")
    })
})
