// app/api/(smog)/summary/route.ts
import { NextResponse, NextRequest } from "next/server";
// Utility function to validate token
const validateToken = (token?: string) => {
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return token;
};
export async function GET(request: NextRequest) {
  const token = validateToken(request.cookies.get("token")?.value);

  // สร้างค่า Cookie ที่จะส่งไปยัง API ภายนอก
  const cookieHeader = `token=${token}`;
  // Utility function to validate token

  try {
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/frontend/summary",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Cookie: cookieHeader, // ส่งคุกกี้ไปยัง API ภายนอก
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`การดึงข้อมูลล้มเหลว: ${res.status} ${errorText}`);
    }
    const data2 = await res.json();
    return NextResponse.json(data2, { status: 201 });
  } catch (error: any) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
