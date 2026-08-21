/**
 * D1-backed persistence for the intake core.
 *
 * The `Store` interface is what core logic depends on; `d1Store` is the only
 * thing that knows D1 exists, so tests use an in-memory implementation and
 * a second site could swap in any SQL-shaped backend.
 */

import type { Proposal, ProposalStatus, Scope, Sender } from "./types"

export type Store = {
    getSender(email: string): Promise<Sender | null>
    seenMessage(messageId: string): Promise<boolean>
    markMessageSeen(messageId: string): Promise<void>
    countRecentProposals(sender: string, sinceEpochSecs: number): Promise<number>
    findProposalByThread(threadKey: string): Promise<Proposal | null>
    getProposal(id: string): Promise<Proposal | null>
    createProposal(p: Proposal): Promise<void>
    updateProposal(id: string, patch: Partial<Proposal>): Promise<void>
    appendEvent(proposalId: string, kind: string, detail?: string): Promise<void>
}

const now = () => Math.floor(Date.now() / 1000)

const parseScopes = (raw: string): Scope[] =>
    raw
        .split(",")
        .map(s => s.trim())
        .filter((s): s is Scope => s === "propose" || s === "approve")

type ProposalRow = {
    id: string
    transport: string
    sender: string
    thread_key: string | null
    subject: string | null
    prompt: string
    status: string
    branch: string | null
    pr_number: number | null
    preview_url: string | null
}

const toProposal = (row: ProposalRow): Proposal => ({
    id: row.id,
    transport: row.transport as Proposal["transport"],
    sender: row.sender,
    threadKey: row.thread_key,
    subject: row.subject,
    prompt: row.prompt,
    status: row.status as ProposalStatus,
    branch: row.branch,
    prNumber: row.pr_number,
    previewUrl: row.preview_url,
})

/** Maps camelCase Proposal fields to their snake_case columns. */
const COLUMNS: Record<string, string> = {
    status: "status",
    branch: "branch",
    prNumber: "pr_number",
    previewUrl: "preview_url",
    detail: "detail",
    subject: "subject",
    prompt: "prompt",
}

export function d1Store(db: D1Database): Store {
    return {
        async getSender(email) {
            const row = await db
                .prepare("SELECT email, scopes, revoked_at FROM senders WHERE email = ?")
                .bind(email.toLowerCase())
                .first<{ email: string; scopes: string; revoked_at: number | null }>()
            if (!row) return null
            return {
                email: row.email,
                scopes: parseScopes(row.scopes),
                revoked: row.revoked_at !== null,
            }
        },

        async seenMessage(messageId) {
            const row = await db
                .prepare("SELECT 1 AS hit FROM seen_messages WHERE message_id = ?")
                .bind(messageId)
                .first<{ hit: number }>()
            return row !== null
        },

        async markMessageSeen(messageId) {
            await db
                .prepare("INSERT OR IGNORE INTO seen_messages (message_id, seen_at) VALUES (?, ?)")
                .bind(messageId, now())
                .run()
        },

        async countRecentProposals(sender, sinceEpochSecs) {
            const row = await db
                .prepare("SELECT count(*) AS n FROM proposals WHERE sender = ? AND created_at >= ?")
                .bind(sender, sinceEpochSecs)
                .first<{ n: number }>()
            return row?.n ?? 0
        },

        async findProposalByThread(threadKey) {
            const row = await db
                .prepare(
                    `SELECT id, transport, sender, thread_key, subject, prompt, status, branch, pr_number, preview_url
                       FROM proposals WHERE thread_key = ? ORDER BY created_at DESC LIMIT 1`,
                )
                .bind(threadKey)
                .first<ProposalRow>()
            return row ? toProposal(row) : null
        },

        async getProposal(id) {
            const row = await db
                .prepare(
                    `SELECT id, transport, sender, thread_key, subject, prompt, status, branch, pr_number, preview_url
                       FROM proposals WHERE id = ?`,
                )
                .bind(id)
                .first<ProposalRow>()
            return row ? toProposal(row) : null
        },

        async createProposal(p) {
            const ts = now()
            await db
                .prepare(
                    `INSERT INTO proposals
                       (id, created_at, updated_at, transport, sender, thread_key, subject, prompt, status, branch, pr_number, preview_url)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                )
                .bind(
                    p.id, ts, ts, p.transport, p.sender, p.threadKey, p.subject,
                    p.prompt, p.status, p.branch, p.prNumber, p.previewUrl,
                )
                .run()
        },

        async updateProposal(id, patch) {
            const sets: string[] = []
            const args: unknown[] = []
            for (const [key, value] of Object.entries(patch)) {
                const column = COLUMNS[key]
                if (!column) continue
                sets.push(`${column} = ?`)
                args.push(value ?? null)
            }
            if (!sets.length) return
            sets.push("updated_at = ?")
            args.push(now(), id)
            await db.prepare(`UPDATE proposals SET ${sets.join(", ")} WHERE id = ?`).bind(...args).run()
        },

        async appendEvent(proposalId, kind, detail) {
            await db
                .prepare(
                    "INSERT INTO proposal_events (proposal_id, created_at, kind, detail) VALUES (?, ?, ?, ?)",
                )
                .bind(proposalId, now(), kind, detail ?? null)
                .run()
        },
    }
}
