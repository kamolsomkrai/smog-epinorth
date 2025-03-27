// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// กำหนดเส้นทางที่ต้องการยกเว้น
const excludedPaths = [
  "/",
  "/login",
  "/summary",
  "/summaryreportsmog",
  "/pm25",
  "/cluster",
  "/form",
  "/location",
  "/api/*",
  "/public/*",
  "/uploads/*",
  "/_next/*",
  "/favicon.ico",
  "/public/symbol.png",
  "/robots.txt",
  // เพิ่มเส้นทางอื่น ๆ ที่คุณต้องการยกเว้น
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isExcluded = excludedPaths.some((path) => {
    if (path.endsWith("/*")) {
      const basePath = path.replace("/*", "");
      return pathname.startsWith(basePath);
    }
    return pathname === path;
  });

  if (isExcluded) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
    console.log("ไม่ได้ login");
  }

  try {
    // แค่ decode token โดยไม่ verify ลายเซ็น
    const decoded = jwt.decode(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
      console.log("ไม่ได้ login");
    }

    // ตรวจสอบเวลา expired หากโทเค็นมี field exp
    if (typeof decoded === "object" && "exp" in decoded) {
      const exp = (decoded as any).exp;
      if (Date.now() >= exp * 1000) {
        return NextResponse.redirect(new URL("/login", request.url));
        console.log("ไม่ได้ login");
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware token verification error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
    console.log("ไม่ได้ login");
  }
}

export const config = {
  matcher: "/:path*",
};
