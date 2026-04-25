import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { sanitizeString } from "@/lib/auth";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "ecodent_jwt_secret_key_2026_super_secure"
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Sanitize inputs to prevent NoSQL injection / XSS
    const email = sanitizeString(body?.email);
    const password = sanitizeString(body?.password);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Date lipsă" },
        { status: 400 }
      );
    }

    const validEmail = process.env.ADMIN_EMAIL || "ecodent.md@gmail.com";
    const validPassword = process.env.ADMIN_PASSWORD || "ecodent2026";

    if (email !== validEmail || password !== validPassword) {
      return NextResponse.json(
        { error: "Email sau parolă incorectă" },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

