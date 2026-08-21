/**
 * Dispatch adapter: ask GitHub Actions to run the agent on a branch.
 *
 * Deliberately the *only* thing that talks to a code-hosting API, and
 * deliberately not a Cloudflare deploy token — Pages builds the PR with its
 * own credentials, so nothing reachable from an email endpoint can deploy.
 */

import type { Dispatch, Proposal } from "../types"

export type GithubConfig = {
    repo: string   // "owner/name"
    token: string  // repo-scoped; needs no more than contents + PR write
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
                    subject: proposal.subject,
                    sender: proposal.sender,
                },
            }),
        })
        if (!res.ok) {
            throw new Error(`github dispatch failed (${res.status}): ${await res.text()}`)
        }
    }
}
