// app/api/getinjuryrti/route.ts
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

// Zod Schema สำหรับข้อมูล Activity ตามตารางที่ออกแบบไว้
const InjurySchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
});

// Centralized API Error Handling
const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        message: "Validation Error",
        errors: error.errors.map((err) => err.message),
      },
      { status: 400 }
    );
  }
  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Unknown Error" }, { status: 500 });
};

export async function POST(request: NextRequest) {
  try {
    // รับข้อมูล body แล้ว validate ด้วย PM25Schema
    const body = await request.json();
    const validatedData = InjurySchema.parse(body);

    // ส่งข้อมูลไปยัง API ใหม่ (pm25)
    const res = await fetch(
      "https://epinorth-api.ddc.moph.go.th/api/pher/getinjurytotal",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Express API Error: ${res.status} ${errorText}`);
    }

    const responseData = await res.json();
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
