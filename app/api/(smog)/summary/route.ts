// app/api/(smog)/summary/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // เพิ่มตัวเลือก cache: 'no-store' เพื่อบังคับให้ fetch ใหม่ทุกครั้ง
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/frontend/summary",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch data: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
