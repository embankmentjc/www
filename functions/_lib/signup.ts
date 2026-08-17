/**
 * The signup handler, shared by /api/signup and the legacy
 * /bat/cc-signup-with-email.php alias.
 *
 * Response codes are the template's MFxxx strings, preserved verbatim so
 * components/signup-form.tsx needs no special case per backend.
 */

import { addContact, type CcEnv, type Contact } from "./cc"

export const MF = {
    success: "MF000",
    notPost: "MF003",
    missingEmail: "MF004",
    invalidEmail: "MF005",
    ccFailed: "MF254",
    error: "MF255",
    misconfigured: "MF256",
} as const

export type Code = (typeof MF)[keyof typeof MF]

/** Deliberately permissive, matching PHP's FILTER_VALIDATE_EMAIL closely enough for a signup form. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** FormData entries are `string | File`; anything non-string is treated as absent. */
const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "")

export function parseContact(form: FormData): { contact: Contact } | { code: Code } {
    const email = str(form.get("email"))
    if (!email) return { code: MF.missingEmail }
    if (!EMAIL_RE.test(email)) return { code: MF.invalidEmail }

    return {
        contact: {
            email,
            // The two forms disagree on the first-name field: one posts `firstname`, the other `name`.
            firstName: str(form.get("firstname")) || str(form.get("name")),
            lastName: str(form.get("lastname")),
            phone: str(form.get("phone")),
            message: str(form.get("message")),
        },
    }
}

const text = (code: Code): Response =>
    new Response(code, { headers: { "Content-Type": "text/plain; charset=utf-8" } })

function configured(env: Partial<CcEnv>): env is CcEnv {
    return Boolean(env.DB && env.CC_CLIENT_ID && env.CC_CLIENT_SECRET && env.CC_LIST_ID)
}

export async function handleSignup(request: Request, env: Partial<CcEnv>): Promise<Response> {
    if (request.method !== "POST") return text(MF.notPost)
    if (!configured(env)) {
        console.error("signup: missing D1 binding or CC_* secrets")
        return text(MF.misconfigured)
    }

    let contact: Contact
    try {
        const parsed = parseContact(await request.formData())
        if ("code" in parsed) return text(parsed.code)
        contact = parsed.contact
    } catch (e) {
        console.error(`signup: unreadable body: ${e}`)
        return text(MF.error)
    }

    // Record first: a CC outage should not lose the submission.
    let signupId: number | null = null
    try {
        const res = await env.DB.prepare(
            `INSERT INTO signups (created_at, email, first_name, last_name, phone, message, source)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
        )
            .bind(
                Math.floor(Date.now() / 1000),
                contact.email,
                contact.firstName || null,
                contact.lastName || null,
                contact.phone || null,
                contact.message || null,
                new URL(request.url).pathname,
            )
            .run()
        signupId = (res.meta.last_row_id as number | undefined) ?? null
    } catch (e) {
        // Logging is best-effort; losing the row is worse than failing the signup,
        // but failing the signup because logging broke is worse still.
        console.error(`signup: D1 insert failed: ${e}`)
    }

    let result: Awaited<ReturnType<typeof addContact>>
    try {
        result = await addContact(env, contact)
    } catch (e) {
        console.error(`signup: CC call threw: ${e}`)
        result = { ok: false, error: "API_FAILED", detail: String(e) }
    }

    if (signupId !== null) {
        const status = result.ok ? (result.action === "unknown" ? "created" : result.action) : "failed"
        const detail = result.ok ? null : `${result.error}:${result.detail}`
        await env.DB.prepare("UPDATE signups SET cc_status = ?, cc_detail = ? WHERE id = ?")
            .bind(status, detail, signupId)
            .run()
            .catch((e: unknown) => console.error(`signup: D1 status update failed: ${e}`))
    }

    return text(result.ok ? MF.success : MF.ccFailed)
}
