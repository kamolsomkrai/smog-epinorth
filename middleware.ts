// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // รายการเส้นทางที่ไม่ต้องตรวจสอบการเข้าสู่ระบบ
  const excludedPaths = [
    "/", // หน้า Main
    "/summary", // หน้า Summary
    "/login", // หน้า Login
    "/api", // API routes
    "/_next", // Next.js internal routes
    "/favicon.ico", // ไอคอน favicon
    "/symbol.png", // ไอคอน favicon
  ];

  // ฟังก์ชันตรวจสอบว่าเส้นทางนั้นถูกยกเว้นหรือไม่
  const isExcluded = excludedPaths.some((path) => {
    if (path === "/") {
      return url.pathname === "/";
    }
    return url.pathname.startsWith(path);
  });

  // หากเส้นทางถูกยกเว้น ให้ผ่านไปยัง Next.js ได้ทันที
  if (isExcluded) {
    return NextResponse.next();
  }

  // หากไม่มี Token ให้ Redirect ไปยังหน้า Login
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // หากมี Token ให้ผ่านไปยัง Next.js ได้ทันที
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
