// app/api/summary/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // ดึง token จากคุกกี้
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ส่งคำขอไปยัง API ภายนอกพร้อมกับ JWT token
    const res = await fetch("https://epinorth-api.ddc.moph.go.th/api/summary", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch summary");
    }

    const data = await res.json();
    return NextResponse.json({ summary: data });
  } catch (error) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { message: "Error fetching summary" },
      { status: 500 }
    );
  }
}
