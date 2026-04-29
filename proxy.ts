import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const LANGS = ["ro", "ru"] as const;

// ─── JWT secret (same as lib/auth.ts) ────────────────────────────────────────
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecodent_jwt_secret_key_2026_super_secure"
);

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// NOTE: per-instance in serverless; good enough for a dental-clinic admin panel.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }
  if (entry.count >= RATE_LIMIT_MAX) return false; // blocked
  entry.count++;
  return true;
}

// ─── Security headers ─────────────────────────────────────────────────────────
const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    // unsafe-inline + unsafe-eval are required for Next.js runtime hydration
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.vercel-storage.com https://www.google.com https://maps.gstatic.com https://maps.googleapis.com",
    "frame-src https://www.google.com https://maps.google.com",
    "connect-src 'self' https://maps.googleapis.com",
    "frame-ancestors 'none'",
  ].join("; "),
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

// ─── Middleware ───────────────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // ── 1. Rate-limit the login endpoint ────────────────────────────────────────
  if (pathname === "/api/auth/login" && method === "POST") {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    if (!checkRateLimit(ip)) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Prea multe încercări. Încearcă din nou mai târziu." },
          { status: 429, headers: { "Retry-After": "900" } }
        )
      );
    }
  }

  // ── 2. Verify JWT for all API mutation routes (except login & contact) ───────
  const isMutation = ["POST", "PUT", "DELETE", "PATCH"].includes(method);
  const isProtectedApi =
    pathname.startsWith("/api/") &&
    pathname !== "/api/auth/login" &&
    pathname !== "/api/contact";

  if (isProtectedApi && isMutation) {
    try {
      const authHeader = request.headers.get("authorization");
      if (!authHeader?.startsWith("Bearer ")) throw new Error("No token");
      await jwtVerify(authHeader.slice(7), secret);
    } catch {
      return applySecurityHeaders(
        NextResponse.json({ error: "Neautorizat" }, { status: 401 })
      );
    }
  }

  // ── 3. Lang routing (frontend pages only) ───────────────────────────────────
  const isFrontend =
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/_next");

  if (isFrontend) {
    const langMatch = pathname.match(/^\/(ro|ru)(\/.*)?$/);

    if (langMatch) {
      const lang = langMatch[1] as "ro" | "ru";
      const rest = langMatch[2] || "/";
      const url = request.nextUrl.clone();
      url.pathname = rest;
      const response = NextResponse.rewrite(url);
      response.cookies.set("ecodent.lang", lang, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return applySecurityHeaders(response);
    }

    // No lang prefix → redirect to preferred language
    const cookieLang = request.cookies.get("ecodent.lang")?.value;
    const lang = (
      cookieLang === "ru" ? "ru" : "ro"
    ) satisfies (typeof LANGS)[number];
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}${pathname}`;
    return applySecurityHeaders(NextResponse.redirect(url));
  }

  // ── 4. All other requests — pass through with security headers ───────────────
  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  // Cover everything except static assets (_next/static, _next/image, files with extensions)
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
