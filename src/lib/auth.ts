import type { Role } from "./types";

/**
 * TEMPORARY MOCK AUTHENTICATION — development/testing only.
 *
 * Any non-empty identifier + password signs in as an Employee. No account
 * lookup, no password check, no session. Replace `signIn` with a real call
 * (API route / auth provider) when authentication is implemented; the login
 * form only depends on this function's signature.
 */
export interface SignInResult {
  ok: true;
  role: Role;
}

export async function signIn(identifier: string, password: string): Promise<SignInResult> {
  // Empty inputs are rejected by the form before reaching here.
  void identifier;
  void password;
  return { ok: true, role: "employee" };
}
