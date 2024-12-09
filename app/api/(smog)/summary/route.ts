// app/api/(smog)/summary/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/frontend/summary",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    console.error("Error fetching summary:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
