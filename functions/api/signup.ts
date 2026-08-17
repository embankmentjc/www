import type { CcEnv } from "../_lib/cc"
import { handleSignup } from "../_lib/signup"

export const onRequest: PagesFunction<CcEnv> = ({ request, env }) => handleSignup(request, env)
