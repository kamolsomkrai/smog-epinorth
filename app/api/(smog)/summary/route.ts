"use server";
import { NextResponse, NextRequest } from "next/server";

// Utility function to validate token
const validateToken = (token?: string) => {
  if (!token) {
    throw new Error("No token found. Please login.");
  }
  return token;
};

export async function GET(request: NextRequest) {
  try {
    // const token = validateToken(request.cookies.get("token")?.value);
    // สร้างค่า Cookie ที่จะส่งไปยัง API ภายนอก
    // const cookieHeader = `token=${token}`;

    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/frontend/summary",
      {
        method: "GET",
        // credentials: "include",
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
    const responseData = await res.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
