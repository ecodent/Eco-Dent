import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LANGS = ["ro", "ru"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a lang prefix
  const langMatch = pathname.match(/^\/(ro|ru)(\/.*)?$/);

  if (langMatch) {
    const lang = langMatch[1] as "ro" | "ru";
    const rest = langMatch[2] || "/";

    // Rewrite internally to the path without the lang prefix
    const url = request.nextUrl.clone();
    url.pathname = rest;

    const response = NextResponse.rewrite(url);
    response.cookies.set("ecodent.lang", lang, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
    return response;
  }

  // No lang prefix — redirect to preferred language
  const cookieLang = request.cookies.get("ecodent.lang")?.value;
  const lang = (cookieLang === "ru" ? "ru" : "ro") satisfies (typeof LANGS)[number];

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)" ],
};
