/**
 * Legacy alias: the shared host served this path, so a cached page or a
 * bookmarked form can still post here after the cutover. Delete once the old
 * host is retired (see specs/cf-migration.md).
 */

import type { CcEnv } from "../_lib/cc"
import { handleSignup } from "../_lib/signup"

export const onRequest: PagesFunction<CcEnv> = ({ request, env }) => handleSignup(request, env)
