// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const url = req.nextUrl.clone();

  if (
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
