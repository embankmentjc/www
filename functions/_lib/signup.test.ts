import { afterEach, describe, expect, it, vi } from "vitest"
import { buildContactPayload, writeTokens, getAccessToken, type Tokens } from "./cc"
import { MF, handleSignup, parseContact } from "./signup"

const env = () => ({
    DB: fakeDb(),
    CC_CLIENT_ID: "id",
    CC_CLIENT_SECRET: "secret",
    CC_LIST_ID: "list-1",
})

/** Minimal D1 stand-in: records statements, replays queued results. */
function fakeDb(rows: Record<string, unknown>[] = []) {
    const calls: { sql: string; args: unknown[] }[] = []
    let firstResults = [...rows]
    let changes = 1
    const db = {
        calls,
        setFirst: (r: Record<string, unknown>[]) => (firstResults = [...r]),
        setChanges: (n: number) => (changes = n),
        prepare(sql: string) {
            let args: unknown[] = []
            const stmt = {
                bind(...a: unknown[]) {
                    args = a
                    return stmt
                },
                async run() {
                    calls.push({ sql, args })
                    return { meta: { changes, last_row_id: 42 } }
                },
                async first() {
                    calls.push({ sql, args })
                    return firstResults.shift() ?? null
                },
            }
            return stmt
        },
    }
    return db as unknown as D1Database & typeof db
}

const form = (fields: Record<string, string>) => {
    const fd = new FormData()
    for (const [k, v] of Object.entries(fields)) fd.append(k, v)
    return fd
}

const post = (fields: Record<string, string>, url = "https://embankment.org/api/signup") =>
    new Request(url, { method: "POST", body: form(fields) })

afterEach(() => vi.unstubAllGlobals())

describe("parseContact", () => {
    it("rejects a missing email", () => {
        expect(parseContact(form({ name: "Katy" }))).toEqual({ code: MF.missingEmail })
    })

    it("rejects a malformed email", () => {
        expect(parseContact(form({ email: "katy at example.com" }))).toEqual({ code: MF.invalidEmail })
    })

    it("reads the newsletter form's `name` field as the first name", () => {
        expect(parseContact(form({ email: "a@b.co", name: "Katy" }))).toEqual({
            contact: { email: "a@b.co", firstName: "Katy", lastName: "", phone: "", message: "" },
        })
    })

    it("prefers `firstname` when the volunteer form posts both", () => {
        const fields = { email: "a@b.co", firstname: "Katy", name: "ignored", lastname: "Lyness", phone: "201", message: "hi" }
        expect(parseContact(form(fields))).toEqual({
            contact: { email: "a@b.co", firstName: "Katy", lastName: "Lyness", phone: "201", message: "hi" },
        })
    })

    it("trims surrounding whitespace", () => {
        expect(parseContact(form({ email: "  a@b.co  ", name: " Katy " }))).toEqual({
            contact: { email: "a@b.co", firstName: "Katy", lastName: "", phone: "", message: "" },
        })
    })
})

describe("buildContactPayload", () => {
    it("sends only the fields that were filled in", () => {
        const c = { email: "a@b.co", firstName: "", lastName: "", phone: "", message: "" }
        expect(buildContactPayload("list-1", c)).toEqual({
            email_address: "a@b.co",
            list_memberships: ["list-1"],
        })
    })

    it("writes the message to both custom fields, truncating the string one", () => {
        const message = "x".repeat(300)
        const c = { email: "a@b.co", firstName: "Katy", lastName: "Lyness", phone: "201", message }
        expect(buildContactPayload("list-1", c)).toEqual({
            email_address: "a@b.co",
            list_memberships: ["list-1"],
            first_name: "Katy",
            last_name: "Lyness",
            phone_number: "201",
            custom_fields: [
                { custom_field_id: "4090fe26-d628-11f0-9e0c-02421f46342b", value: message },
                { custom_field_id: "30054708-f950-11e9-9290-d4ae52a2c97b", value: `${"x".repeat(254)}…` },
            ],
        })
    })

    it("leaves a 254-char message unabridged", () => {
        const message = "x".repeat(254)
        const payload = buildContactPayload("list-1", {
            email: "a@b.co", firstName: "", lastName: "", phone: "", message,
        }) as { custom_fields: { value: string }[] }
        expect(payload.custom_fields.map(f => f.value)).toEqual([message, message])
    })
})

describe("handleSignup", () => {
    const okCc = () =>
        vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ action: "created" }), { status: 201 })))

    it("rejects GET", async () => {
        const res = await handleSignup(new Request("https://embankment.org/api/signup"), env())
        expect(await res.text()).toBe(MF.notPost)
    })

    it("reports misconfiguration when secrets are absent", async () => {
        const res = await handleSignup(post({ email: "a@b.co" }), { DB: fakeDb() })
        expect(await res.text()).toBe(MF.misconfigured)
    })

    it("returns MF000 and records the submission on success", async () => {
        okCc()
        const e = env()
        e.DB.setFirst([{ access_token: "tok", refresh_token: "r", expires_at: 4_000_000_000 }])
        const res = await handleSignup(post({ email: "a@b.co", name: "Katy" }), e)

        expect(await res.text()).toBe(MF.success)
        const writes = e.DB.calls.filter(c => c.sql.startsWith("INSERT INTO signups"))
        expect(writes.map(w => w.args.slice(1))).toEqual([["a@b.co", "Katy", null, null, null, "/api/signup"]])
        const updates = e.DB.calls.filter(c => c.sql.startsWith("UPDATE signups"))
        expect(updates.map(u => u.args)).toEqual([["created", null, 42]])
    })

    it("records the path a legacy submission arrived on", async () => {
        okCc()
        const e = env()
        e.DB.setFirst([{ access_token: "tok", refresh_token: "r", expires_at: 4_000_000_000 }])
        await handleSignup(post({ email: "a@b.co" }, "https://embankment.org/bat/cc-signup-with-email.php"), e)

        const insert = e.DB.calls.find(c => c.sql.startsWith("INSERT INTO signups"))!
        expect(insert.args[6]).toBe("/bat/cc-signup-with-email.php")
    })

    it("returns MF254 and marks the row failed when CC rejects the contact", async () => {
        vi.stubGlobal("fetch", vi.fn(async () => new Response("nope", { status: 400 })))
        const e = env()
        e.DB.setFirst([{ access_token: "tok", refresh_token: "r", expires_at: 4_000_000_000 }])
        const res = await handleSignup(post({ email: "a@b.co" }), e)

        expect(await res.text()).toBe(MF.ccFailed)
        const updates = e.DB.calls.filter(c => c.sql.startsWith("UPDATE signups"))
        expect(updates.map(u => u.args)).toEqual([["failed", "API_FAILED:400", 42]])
    })

    it("returns MF254 without calling CC when no tokens are seeded", async () => {
        const fetchSpy = vi.fn()
        vi.stubGlobal("fetch", fetchSpy)
        const e = env()
        e.DB.setFirst([])
        const res = await handleSignup(post({ email: "a@b.co" }), e)

        expect(await res.text()).toBe(MF.ccFailed)
        expect(fetchSpy).not.toHaveBeenCalled()
    })
})

describe("token rotation", () => {
    const stale: Tokens = { access_token: "old", refresh_token: "r1", expires_at: 0 }

    it("gates the write on the refresh token it read", async () => {
        const db = fakeDb()
        await writeTokens(db, "r1", { access_token: "new", refresh_token: "r2", expires_at: 99 })
        const update = db.calls.find(c => c.sql.includes("UPDATE cc_tokens"))!
        expect(update.args).toEqual(["new", "r2", 99, expect.any(Number), "r1"])
    })

    it("refreshes and returns the new access token", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn(async () =>
                new Response(JSON.stringify({ access_token: "fresh", refresh_token: "r2", expires_in: 7200 })),
            ),
        )
        const e = env()
        e.DB.setFirst([stale])
        expect(await getAccessToken(e)).toBe("fresh")
    })

    it("defers to the winner's token when a concurrent refresh got there first", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn(async () =>
                new Response(JSON.stringify({ access_token: "mine", refresh_token: "r2", expires_in: 7200 })),
            ),
        )
        const e = env()
        // read stale -> conditional update matches 0 rows -> re-read what the winner wrote
        e.DB.setFirst([stale, { access_token: "theirs", refresh_token: "r3", expires_at: 4_000_000_000 }])
        e.DB.setChanges(0)
        expect(await getAccessToken(e)).toBe("theirs")
    })
})
