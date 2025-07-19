// lib/auth.ts
import { auth } from "@clerk/nextjs/server";

export async function getUserRole(): Promise<string | null> {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role ?? null;
  return role;
}
