// pages/api/cluster.ts
import { NextResponse, NextRequest } from "next/server";

// ฟังก์ชันตรวจสอบ token
// const validateToken = (token?: string) => {
//   if (!token) {
//     throw new Error("No token found. Please login.");
//   }
//   return token;
// };

export async function GET(request: NextRequest) {
  try {
    // ตรวจสอบว่ามี token cookie หรือไม่
    // const token = validateToken(request.cookies.get("token")?.value);
    // const cookieHeader = `token=${token}`;

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/public/cluster",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          // Cookie: cookieHeader, // ส่ง token ไปใน header
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`การดึงข้อมูลล้มเหลว: ${res.status} ${errorText}`);
    }
    const responseData = await res.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
