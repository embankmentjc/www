/**
 * Constant Contact: token storage in D1, refresh, and contact creation.
 *
 * Ported from public/bat/cc-signup-with-email.php. The one behavioural change is
 * where tokens live: a D1 row instead of a 0600 JSON file that a partial write
 * could (and did) truncate.
 */

const TOKEN_URL = "https://authz.constantcontact.com/oauth2/default/v1/token"
const CONTACT_URL = "https://api.cc.email/v3/contacts/sign_up_form"

/** Refresh when the access token is within this many seconds of expiring. */
const REFRESH_WINDOW_SECS = 300

/** "Signup Notes" — text_area, holds the full message. */
const FIELD_SIGNUP_NOTES = "4090fe26-d628-11f0-9e0c-02421f46342b"
/** "Notes" — string, 255 char cap, the one visible in the CC contact UI. */
const FIELD_NOTES = "30054708-f950-11e9-9290-d4ae52a2c97b"
const NOTES_MAX = 254

export type CcEnv = {
    DB: D1Database
    CC_CLIENT_ID: string
    CC_CLIENT_SECRET: string
    CC_LIST_ID: string
}

export type Tokens = {
    access_token: string
    refresh_token: string
    expires_at: number
}

export type Contact = {
    email: string
    firstName: string
    lastName: string
    phone: string
    message: string
}

export type CcResult =
    | { ok: true; action: string }
    | { ok: false; error: "AUTH_FAILED" | "API_FAILED"; detail: string }

const now = () => Math.floor(Date.now() / 1000)

export async function readTokens(db: D1Database): Promise<Tokens | null> {
    const row = await db
        .prepare("SELECT access_token, refresh_token, expires_at FROM cc_tokens WHERE id = 1")
        .first<Tokens>()
    return row ?? null
}

/**
 * Persist rotated tokens, but only if nobody else rotated them first.
 *
 * CC invalidates a refresh token as soon as it is used, so two concurrent
 * refreshes produce two valid-looking rows where only the later one works.
 * Gating the write on the refresh_token we started from means the loser of the
 * race leaves the winner's tokens intact; its own request fails and retries.
 * Returns whether this writer won.
 */
export async function writeTokens(db: D1Database, prevRefreshToken: string, next: Tokens): Promise<boolean> {
    const res = await db
        .prepare(
            `UPDATE cc_tokens
                SET access_token = ?, refresh_token = ?, expires_at = ?, updated_at = ?
              WHERE id = 1 AND refresh_token = ?`,
        )
        .bind(next.access_token, next.refresh_token, next.expires_at, now(), prevRefreshToken)
        .run()
    return (res.meta.changes ?? 0) > 0
}

export async function refreshTokens(env: CcEnv, refreshToken: string): Promise<Tokens | null> {
    const basic = btoa(`${env.CC_CLIENT_ID}:${env.CC_CLIENT_SECRET}`)
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
    })
    if (!res.ok) {
        console.error(`CC token refresh failed (${res.status}): ${await res.text()}`)
        return null
    }
    const data = await res.json<{ access_token: string; refresh_token: string; expires_in: number }>()
    return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_at: now() + data.expires_in,
    }
}

/** A usable access token, refreshing and persisting first if the stored one is near expiry. */
export async function getAccessToken(env: CcEnv): Promise<string | null> {
    const tokens = await readTokens(env.DB)
    if (!tokens) {
        console.error("CC: no tokens in D1; seed the cc_tokens row (see specs/cf-migration.md)")
        return null
    }
    if (tokens.expires_at >= now() + REFRESH_WINDOW_SECS) {
        return tokens.access_token
    }
    const next = await refreshTokens(env, tokens.refresh_token)
    if (!next) return null

    const won = await writeTokens(env.DB, tokens.refresh_token, next)
    if (!won) {
        // Someone else rotated while we were in flight; ours is already void.
        const fresh = await readTokens(env.DB)
        return fresh?.access_token ?? null
    }
    return next.access_token
}

export function buildContactPayload(listId: string, c: Contact): Record<string, unknown> {
    const payload: Record<string, unknown> = {
        email_address: c.email,
        list_memberships: [listId],
    }
    if (c.firstName) payload.first_name = c.firstName
    if (c.lastName) payload.last_name = c.lastName
    if (c.phone) payload.phone_number = c.phone
    if (c.message) {
        const truncated =
            c.message.length > NOTES_MAX ? `${c.message.slice(0, NOTES_MAX)}…` : c.message
        payload.custom_fields = [
            { custom_field_id: FIELD_SIGNUP_NOTES, value: c.message },
            { custom_field_id: FIELD_NOTES, value: truncated },
        ]
    }
    return payload
}

export async function addContact(env: CcEnv, c: Contact): Promise<CcResult> {
    const accessToken = await getAccessToken(env)
    if (!accessToken) return { ok: false, error: "AUTH_FAILED", detail: "no access token" }

    const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(buildContactPayload(env.CC_LIST_ID, c)),
    })

    if (res.ok) {
        const data = await res.json<{ action?: string }>().catch(() => ({}) as { action?: string })
        return { ok: true, action: data.action ?? "unknown" }
    }

    const body = await res.text()
    console.error(`CC add contact failed (${res.status}): ${body}`)
    return { ok: false, error: "API_FAILED", detail: `${res.status}` }
}
