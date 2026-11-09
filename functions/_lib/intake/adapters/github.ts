/**
 * Dispatch adapter: ask GitHub Actions to run the agent on a branch.
 *
 * Deliberately the *only* thing that talks to a code-hosting API, and
 * deliberately not a Cloudflare deploy token — Pages builds the PR with its
 * own credentials, so nothing reachable from an intake endpoint can deploy.
 *
 * The payload carries no requester identity, and no subject: workflow logs on
 * a public repo are public. Who asked stays in D1.
 */

import type { Dispatch, Proposal } from "../types"

export type GithubConfig = {
    repo: string   // "owner/name"
    token: string  // repo-scoped; `repository_dispatch` needs only contents write
}

export function githubDispatch(cfg: GithubConfig): Dispatch {
    return async (proposal: Proposal) => {
        const res = await fetch(`https://api.github.com/repos/${cfg.repo}/dispatches`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${cfg.token}`,
                Accept: "application/vnd.github+json",
                "Content-Type": "application/json",
                "User-Agent": "epc-agent-intake",
            },
            body: JSON.stringify({
                event_type: "agent-intake",
                client_payload: {
                    proposal_id: proposal.id,
                    branch: proposal.branch,
                    prompt: proposal.prompt,
                },
            }),
        })
        if (!res.ok) {
            throw new Error(`github dispatch failed (${res.status}): ${await res.text()}`)
        }
    }
}
