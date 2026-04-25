import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecodent_jwt_secret_key_2026_super_secure"
);

export async function verifyAuth(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;
    const token = authHeader.slice(7);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
}

/**
 * Sanitize a string value against:
 *  - XSS: strips HTML tags and common script patterns
 *  - NoSQL injection: removes MongoDB operator keys ($-prefixed) from objects
 *
 * Use on all user-supplied string inputs before storing or comparing.
 */
export function sanitizeString(value: unknown): string {
  if (typeof value !== "string") return "";
  return (
    value
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Remove script-injection patterns
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      // Trim
      .trim()
  );
}

/**
 * Recursively strip any object keys that start with "$" to prevent
 * MongoDB/NoSQL operator injection (e.g. { "$gt": "" } as a password).
 */
export function sanitizeObject<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject) as unknown as T;
  const clean: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
    if (key.startsWith("$")) continue; // drop MongoDB operators
    clean[key] = typeof val === "object" ? sanitizeObject(val) : val;
  }
  return clean as T;
}
